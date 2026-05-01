"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "rd_exit_intent_shown";
const DISMISS_KEY = "rd_exit_intent_dismissed";
const MIN_DWELL_MS = 8000;

export function useExitIntent({ enabled = true }: { enabled?: boolean } = {}) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (
      window.sessionStorage.getItem(SESSION_KEY) === "1" ||
      window.localStorage.getItem(DISMISS_KEY) === "1"
    )
      return;

    const startedAt = Date.now();

    const onMouseOut = (e: MouseEvent) => {
      if (Date.now() - startedAt < MIN_DWELL_MS) return;
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setTriggered(true);
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
    };

    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, [enabled]);

  const dismiss = ({ persist = false }: { persist?: boolean } = {}) => {
    if (persist && typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "1");
    }
    setTriggered(false);
  };

  return { triggered, dismiss };
}
