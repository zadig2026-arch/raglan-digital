"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const firstRender = useRef(true);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (timeout.current) clearTimeout(timeout.current);
    setActive(true);
    timeout.current = setTimeout(() => setActive(false), 700);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="route-progress"
          initial={{ scaleX: 0, opacity: 0.8 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0, scaleX: 1 }}
          transition={{
            scaleX: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3 },
          }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

export function useRouteNavigating() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setNavigating(true);
    const t = setTimeout(() => setNavigating(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  return navigating;
}
