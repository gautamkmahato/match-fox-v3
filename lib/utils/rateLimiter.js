// lib/utils/rateLimiter.js
const ipRequestMap = new Map();
const TIME_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip) || { count: 0, lastRequestTime: now };

  if (now - entry.lastRequestTime > TIME_WINDOW) {
    entry.count = 0;
    entry.lastRequestTime = now;
  }

  entry.count += 1;
  ipRequestMap.set(ip, entry);

  return entry.count > MAX_REQUESTS;
}
