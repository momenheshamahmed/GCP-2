"use client";

import { useEffect } from "react";

/**
 * Dev-only: persist Cursor/preview DOM order change by moving Next's
 * react-dev-overlay <nextjs-portal> before the dev build watcher.
 *
 * In production these elements don't exist.
 */
export function NextJsPortalOrderFix() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let cancelled = false;

    const tryFix = () => {
      if (cancelled) return true;

      const portal = document.querySelector("nextjs-portal");
      const watcher = document.querySelector("#__next-build-watcher");

      if (!portal || !watcher) return false;

      const parent = watcher.parentNode;
      if (!parent) return false;

      // Desired: portal is immediately before the watcher.
      if (portal.nextSibling === watcher) return true;

      parent.insertBefore(portal, watcher);
      return true;
    };

    if (tryFix()) return;

    const observer = new MutationObserver(() => {
      if (tryFix()) observer.disconnect();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timeout = window.setTimeout(() => {
      observer.disconnect();
    }, 5000);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
}
