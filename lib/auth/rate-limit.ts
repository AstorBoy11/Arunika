type AttemptRecord = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type RateLimitOptions = {
  maxAttempts?: number;
  windowMs?: number;
};

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const maxAttempts = options.maxAttempts ?? MAX_ATTEMPTS;
  const windowMs = options.windowMs ?? WINDOW_MS;

  const now = Date.now();
  const record = attempts.get(identifier);

  if (!record || now > record.resetAt) {
    attempts.set(identifier, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, maxAttempts - 1),
      resetAt: now + windowMs,
    };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, maxAttempts - record.count),
    resetAt: record.resetAt,
  };
}

export function resetRateLimit(identifier: string): void {
  attempts.delete(identifier);
}

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, record] of attempts.entries()) {
    if (now > record.resetAt) attempts.delete(key);
  }
}, 30 * 60 * 1000);

if (typeof cleanupTimer.unref === "function") {
  cleanupTimer.unref();
}
