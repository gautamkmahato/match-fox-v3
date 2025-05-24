// lib/queue/geminiQueue.js

import PQueue from 'p-queue';

// Create a shared queue instance with concurrency and interval settings
const geminiQueue = new PQueue({
  concurrency: 2,         // Only 1 task at a time
  interval: 1000,         // Per second interval
  intervalCap: 2          // Max 2 tasks per second (adjust based on Gemini rate limits)
});

export default geminiQueue;
