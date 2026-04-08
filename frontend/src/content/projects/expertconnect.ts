import type { Project } from './types';

export const expertconnect: Project = {
  slug: 'expertconnect',
  title: 'ExpertConnect',
  tagline: 'Real-time WebSocket Consultation Platform',
  category: 'Real-time Platform',
  problem:
    'Building a live consultation platform where 5000+ concurrent users need sub-200ms message delivery, presence tracking ("Dr. Smith is typing..."), and guaranteed message ordering. The business model requires experts and clients to communicate in real time with session recording for compliance, while mobile connections drop and reconnect unpredictably.',
  architecture:
    'WebSocket gateway backed by a pub/sub message bus. Each connection authenticates via JWT on upgrade, joins a session-scoped channel, and receives messages through a fan-out from the bus. Presence is tracked via heartbeats with a 5-second TTL in Redis — missed heartbeats trigger "offline" events. Message ordering uses a per-session monotonic sequence number assigned by the gateway, not the client. Reconnection replays missed messages from a short-lived buffer (last 100 per session) to handle mobile drops without re-fetching history.',
  tradeoffs:
    'Single-process WebSocket gateways hit a ~10K connection ceiling from file descriptor limits. Horizontal scaling requires sticky sessions (so reconnections hit the same node) OR a shared message bus that all nodes subscribe to. We chose Redis pub/sub for fan-out, accepting the added latency (~2ms per hop) in exchange for stateless nodes that can scale independently. Presence TTL of 5s means a brief network hiccup shows the user as offline — we tuned this from 3s (too noisy) to 5s (acceptable UX) based on production metrics.',
  metrics: [
    { label: 'Concurrent Users', value: '5,000+' },
    { label: 'P99 Delivery', value: '120ms' },
    { label: 'Reconnect Buffer', value: '100 msgs' },
    { label: 'Presence TTL', value: '5s' },
  ],
  stack: [
    'Node.js',
    'WebSocket (ws)',
    'Redis Pub/Sub',
    'JWT Auth on Upgrade',
    'Monotonic Sequencing',
    'Session Recording',
  ],
  explainMode: {
    interviewPitch:
      "ExpertConnect is a real-time consultation platform where I had to solve the classic WebSocket scaling problem: 5000+ concurrent users need sub-200ms delivery, but a single Node process maxes out at ~10K connections. The interesting decisions were around presence tracking, message ordering, and reconnection handling for flaky mobile connections.",
    talkingPoints: [
      'Redis pub/sub for horizontal fan-out — stateless gateway nodes that scale independently',
      'Per-session monotonic sequence number assigned server-side, not by client, to guarantee ordering',
      'Presence via heartbeat + 5s Redis TTL — tuned from 3s (too noisy) based on production drop patterns',
      'Reconnection replays last 100 messages from a per-session buffer, avoiding full history re-fetch',
      'JWT verified on WebSocket upgrade, not on every message — authenticates the connection, not the frame',
    ],
    tradeoffsExplained:
      "Redis pub/sub adds ~2ms per message hop compared to in-process fan-out, but lets us scale horizontally without sticky sessions. The 5s presence TTL is a UX compromise — shorter means more false 'offline' flickers on mobile, longer means stale presence. We instrumented reconnection frequency in production and found 5s to be the sweet spot where <3% of sessions see a false offline.",
  },
};
