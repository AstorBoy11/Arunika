"use client";

import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

export function useIdleLogout(timeoutMs = 30 * 60 * 1000) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        void signOut({ callbackUrl: "/auth" });
      }, timeoutMs);
    };

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    for (const eventName of events) {
      window.addEventListener(eventName, reset);
    }

    reset();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      for (const eventName of events) {
        window.removeEventListener(eventName, reset);
      }
    };
  }, [timeoutMs]);
}
