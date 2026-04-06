import { describe, it, expect } from 'vitest';
import { encodeCursor, decodeCursor } from '../src/services/pagination';

describe('cursor encoding', () => {
  it('roundtrips an integer id', () => {
    const encoded = encodeCursor({ id: 12345 });
    expect(decodeCursor(encoded)).toEqual({ id: 12345 });
  });

  it('returns null for malformed base64', () => {
    expect(decodeCursor('not-a-cursor!!!')).toBeNull();
  });

  it('returns null when id is missing', () => {
    const bogus = Buffer.from(JSON.stringify({ foo: 1 })).toString('base64url');
    expect(decodeCursor(bogus)).toBeNull();
  });

  it('returns null for non-integer ids', () => {
    const bogus = Buffer.from(JSON.stringify({ id: 'abc' })).toString('base64url');
    expect(decodeCursor(bogus)).toBeNull();
  });

  it('returns null for negative ids', () => {
    const bogus = Buffer.from(JSON.stringify({ id: -1 })).toString('base64url');
    expect(decodeCursor(bogus)).toBeNull();
  });
});
