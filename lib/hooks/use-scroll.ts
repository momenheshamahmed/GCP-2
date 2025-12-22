"use client";

import { useEffect, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScroll(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up");
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return scrollDirection;
}

export function useIsScrolled(threshold = 10): boolean {
  const { y } = useScroll();
  return y > threshold;
}

