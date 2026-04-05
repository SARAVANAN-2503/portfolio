// Opaque cursor: base64url of JSON { id }. Opaque so clients treat it as a
// token, not a sortable value. Decoding validates shape so a tampered cursor
// can't slip an injection into a SQL parameter.

export interface CursorPayload {
  id: number;
}

export function encodeCursor(payload: CursorPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeCursor(cursor: string): CursorPayload | null {
  try {
    const json = Buffer.from(cursor, 'base64url').toString('utf8');
    const parsed = JSON.parse(json) as { id?: unknown };
    if (
      typeof parsed.id !== 'number' ||
      !Number.isInteger(parsed.id) ||
      parsed.id < 0
    ) {
      return null;
    }
    return { id: parsed.id };
  } catch {
    return null;
  }
}
