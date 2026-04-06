import crypto from 'crypto';

// HMAC-SHA256 over the raw request body, compared in constant time. The
// "raw" part matters: Express's JSON parser mutates shape, so signing
// JSON.stringify(req.body) on the server would not match the bytes the
// caller hashed. We stash req.rawBody in the json parser's verify hook.

export function signPayload(payload: string | Buffer, secret: string): string {
  const buf = typeof payload === 'string' ? Buffer.from(payload, 'utf8') : payload;
  return crypto.createHmac('sha256', secret).update(buf).digest('hex');
}

export function verifySignature(
  rawBody: Buffer | string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) return false;
  const expected = signPayload(rawBody, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
