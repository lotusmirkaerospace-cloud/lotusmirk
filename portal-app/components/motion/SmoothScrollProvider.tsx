"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let registered = false;

/**
 * Wraps the marketing site in Lenis smooth-scroll, bridged to GSAP's
 * ScrollTrigger so scroll-driven reveals stay in sync with the smoothed
 * scroll position rather than the raw, jumpy native one. This is the
 * current (2026) standard pairing for cinematic, scroll-tied motion sites
 * (the SpaceX/Northrop-Grumman-style reveals this site is modeled on).
 *
 * Mount once, at the top of the (marketing) route group's layout.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
