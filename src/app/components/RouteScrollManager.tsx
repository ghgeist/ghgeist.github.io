import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion } from "./prefersReducedMotion";

const MAX_HASH_TARGET_RETRIES = 8;

export function RouteScrollManager() {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    let rafId: number | null = null;

    if (location.pathname !== "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      previousPathnameRef.current = location.pathname;
      return;
    }

    if (location.hash) {
      let targetId = location.hash.slice(1);
      try {
        targetId = decodeURIComponent(targetId);
      } catch {
        // Fall back to raw hash value when decoding fails.
      }

      if (targetId.length === 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        previousPathnameRef.current = location.pathname;
        return;
      }

      const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

      const scrollToTarget = (attempt: number) => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ block: "start", behavior });
          return;
        }

        if (attempt >= MAX_HASH_TARGET_RETRIES) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          return;
        }

        rafId = window.requestAnimationFrame(() => {
          scrollToTarget(attempt + 1);
        });
      };

      scrollToTarget(0);
      previousPathnameRef.current = location.pathname;

      return () => {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }

    if (previousPathnameRef.current !== "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    previousPathnameRef.current = location.pathname;

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [location.hash, location.pathname]);

  return null;
}
