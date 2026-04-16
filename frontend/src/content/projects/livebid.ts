import type { Project } from './types';

export const livebid: Project = {
  slug: 'livebid',
  title: 'LiveBid',
  tagline: 'Real-Time Live Auction Platform',
  category: 'Real-time Platform',
  status: 'shipped',
  year: '2023',
  highlights: [
    'Sub-100ms bid broadcast to all connected bidders',
    'Event-driven architecture prevents race conditions',
    '45% reduction in application instability',
    'Optimistic UI with server-side conflict resolution',
  ],
  problem:
    'Running live auctions online where hundreds of bidders place bids simultaneously. The core challenge is consistency: two bidders submitting bids at the same millisecond should not both "win" at the same price. Beyond correctness, the UI must feel instant — bidders expect to see their bid reflected immediately, not after a server round-trip.',
  architecture:
    'WebSocket server manages all connected auction rooms. Bids are processed through a serialization queue per auction — only one bid is evaluated at a time, preventing concurrent write conflicts at the application layer. The winning bid is determined server-side and broadcast to all room participants. Optimistic UI: the bidder\'s own bid is rendered immediately client-side, then either confirmed or rolled back based on the server response. Auction state (current price, time remaining, bidder count) is snapshotted to Redis for fast reads and durability across server restarts.',
  tradeoffs:
    'Per-auction serialization eliminates race conditions but means bid throughput is limited to how fast one server can process them sequentially. For most auctions (hundreds of concurrent bidders, not millions) this is fine. An alternative would be database-level optimistic locking (CAS on current_price), but this pushes retry logic to clients and adds round-trips. We chose server-side serialization for simplicity and moved to database CAS only for the highest-traffic flash-sale auctions.',
  metrics: [
    { label: 'Bid Broadcast Latency', value: '< 100ms' },
    { label: 'Concurrent Bidders', value: '500+' },
    { label: 'Race Conditions', value: '0' },
    { label: 'Stability', value: '+45%' },
  ],
  stack: [
    'React',
    'Node.js',
    'WebSocket',
    'Redis',
    'MySQL',
    'Optimistic UI',
    'Event-Driven Arch',
  ],
  explainMode: {
    interviewPitch:
      "LiveBid is a real-time auction platform where the hard problem is bid consistency: two bidders at the same millisecond must not both win. I solved it with a per-auction serialization queue at the application layer. The interesting UX challenge was making the UI feel instant while the server is the source of truth.",
    talkingPoints: [
      'Per-auction serialization queue: only one bid evaluated at a time, eliminating concurrent write conflicts',
      'Optimistic UI: render bid immediately client-side, confirm or rollback based on server response',
      'Auction state snapshotted to Redis for fast reads and recovery after server restart',
      'WebSocket rooms scoped per auction — bidders only receive events for their active auction',
      'Moved to DB-level CAS (compare-and-swap) for flash-sale auctions with >1000 concurrent bids',
    ],
    tradeoffsExplained:
      "Server-side serialization is simple and correct for typical auctions. The cost is that throughput is bounded by single-server processing speed. For flash sales with thousands of simultaneous bids, we switched to database-level optimistic locking: the UPDATE only succeeds if current_price matches the expected value, otherwise the client retries. This distributes the conflict resolution to the DB but adds retry complexity and latency variance.",
  },
};
