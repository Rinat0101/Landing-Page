const memoryStore = new Map();

export default function rateLimit({ limit, timeframe }: { limit: number; timeframe: number }) {
  return {
    async check(ip: string) {
      const now = Date.now();
      const record = memoryStore.get(ip) || { count: 0, start: now };

      if (now - record.start > timeframe) {
        memoryStore.set(ip, { count: 1, start: now });
        return { success: true };
      }

      if (record.count >= limit) {
        return { success: false };
      }

      record.count += 1;
      memoryStore.set(ip, record);
      return { success: true };
    },
  };
}