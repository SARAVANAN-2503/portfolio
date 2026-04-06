import crypto from 'crypto';
import type { Db } from '../db';

export interface Job {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  attempts: number;
  createdAt: string;
  updatedAt: string;
  payload: unknown;
  result?: unknown;
}

interface JobRow {
  id: string;
  type: string;
  payload: string;
  status: string;
  attempts: number;
  created_at: number;
  updated_at: number;
  result: string | null;
}

export interface Queue {
  enqueue(type: string, payload: unknown): string;
  tick(): Promise<Job | null>;
  get(id: string): Job | null;
  start(intervalMs?: number): () => void;
}

type Logger = { error: (obj: unknown, msg?: string) => void };

// SQLite-backed single-process queue. Workers claim the oldest pending job
// with an atomic UPDATE...RETURNING so two ticks never pick the same row.
// This deliberately mirrors the shape of an SQS→worker pipeline so the
// architecture diagram maps 1:1 to real code.
export function createQueue(db: Db, logger: Logger, processingMs = 300): Queue {
  const insert = db.prepare(
    'INSERT INTO jobs (id, type, payload, status, attempts, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  // Order by rowid (insertion order). created_at alone ties at millisecond
  // granularity and uuid ids aren't monotonic, so FIFO needs rowid as the
  // real tiebreaker.
  const claimNext = db.prepare(
    `UPDATE jobs
        SET status = 'processing', attempts = attempts + 1, updated_at = ?
      WHERE id = (
        SELECT id FROM jobs
         WHERE status = 'pending'
         ORDER BY rowid ASC
         LIMIT 1
      )
      RETURNING id, type, payload, status, attempts, created_at, updated_at, result`
  );
  const complete = db.prepare(
    'UPDATE jobs SET status = ?, result = ?, updated_at = ? WHERE id = ?'
  );
  const fetch = db.prepare(
    'SELECT id, type, payload, status, attempts, created_at, updated_at, result FROM jobs WHERE id = ?'
  );

  function toJob(r: JobRow): Job {
    return {
      id: r.id,
      type: r.type,
      status: r.status as Job['status'],
      attempts: r.attempts,
      createdAt: new Date(r.created_at).toISOString(),
      updatedAt: new Date(r.updated_at).toISOString(),
      payload: safeParse(r.payload),
      result: r.result ? safeParse(r.result) : undefined,
    };
  }

  function enqueue(type: string, payload: unknown): string {
    const id = `job_${crypto.randomUUID()}`;
    const now = Date.now();
    insert.run(id, type, JSON.stringify(payload ?? null), 'pending', 0, now, now);
    return id;
  }

  async function tick(): Promise<Job | null> {
    const row = claimNext.get(Date.now()) as JobRow | undefined;
    if (!row) return null;
    try {
      await new Promise(r => setTimeout(r, processingMs));
      const result = { processedAt: Date.now(), type: row.type };
      const now = Date.now();
      complete.run('done', JSON.stringify(result), now, row.id);
      return toJob({ ...row, status: 'done', result: JSON.stringify(result), updated_at: now });
    } catch (err) {
      const now = Date.now();
      complete.run('failed', JSON.stringify({ error: String(err) }), now, row.id);
      logger.error({ err, jobId: row.id }, 'job failed');
      return null;
    }
  }

  function get(id: string): Job | null {
    const row = fetch.get(id) as JobRow | undefined;
    return row ? toJob(row) : null;
  }

  function start(intervalMs = 250): () => void {
    const handle = setInterval(() => {
      tick().catch(err => logger.error({ err }, 'queue tick failed'));
    }, intervalMs);
    handle.unref?.();
    return () => clearInterval(handle);
  }

  return { enqueue, tick, get, start };
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
