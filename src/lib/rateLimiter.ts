interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number; // seconds until next attempt allowed
}

class RateLimiter {
  private attempts: Map<string, AttemptRecord> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;

  constructor(
    maxAttempts = 5, // Max failed attempts
    windowMs = 15 * 60 * 1000, // 15 minutes window
    blockDurationMs = 15 * 60 * 1000 // 15 minutes block
  ) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.blockDurationMs = blockDurationMs;

    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  checkLimit(clientIP: string): RateLimitResult {
    const now = Date.now();
    const record = this.attempts.get(clientIP);

    if (!record) {
      return { allowed: true };
    }

    // If the last attempt was outside the block duration, allow
    if (now - record.lastAttempt > this.blockDurationMs) {
      this.attempts.delete(clientIP);
      return { allowed: true };
    }

    // If we're still within the window and have exceeded max attempts
    if (record.count >= this.maxAttempts) {
      const retryAfter = Math.ceil((record.lastAttempt + this.blockDurationMs - now) / 1000);
      return { 
        allowed: false, 
        retryAfter: Math.max(0, retryAfter)
      };
    }

    return { allowed: true };
  }

  recordFailedAttempt(clientIP: string): void {
    const now = Date.now();
    const record = this.attempts.get(clientIP);

    if (!record || now - record.firstAttempt > this.windowMs) {
      // Start new window
      this.attempts.set(clientIP, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now
      });
    } else {
      // Increment existing record
      record.count += 1;
      record.lastAttempt = now;
      this.attempts.set(clientIP, record);
    }
  }

  resetAttempts(clientIP: string): void {
    this.attempts.delete(clientIP);
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [ip, record] of this.attempts.entries()) {
      // Remove records older than the block duration
      if (now - record.lastAttempt > this.blockDurationMs) {
        keysToDelete.push(ip);
      }
    }

    keysToDelete.forEach(key => this.attempts.delete(key));
  }

  // Get current status for debugging
  getStatus(clientIP: string): AttemptRecord | null {
    return this.attempts.get(clientIP) || null;
  }

  // Get all active blocks (for admin monitoring)
  getAllBlocked(): Array<{ ip: string; record: AttemptRecord }> {
    const now = Date.now();
    const blocked: Array<{ ip: string; record: AttemptRecord }> = [];

    for (const [ip, record] of this.attempts.entries()) {
      if (record.count >= this.maxAttempts && 
          now - record.lastAttempt <= this.blockDurationMs) {
        blocked.push({ ip, record });
      }
    }

    return blocked;
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter(); 