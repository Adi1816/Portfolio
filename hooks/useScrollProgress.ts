"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);
  const latestProgress = useRef(0);

  useLayoutEffect(() => {
    const commitProgress = () => {
      frame.current = null;
      setProgress(latestProgress.current);
      document.documentElement.style.setProperty("--scroll-progress", String(latestProgress.current));
    };

    const trigger = ScrollTrigger.create({
      trigger: ".portfolio-shell",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.18,
      onUpdate: (self) => {
        latestProgress.current = self.progress;
        if (frame.current === null) {
          frame.current = window.requestAnimationFrame(commitProgress);
        }
      }
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refresh);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
      trigger.kill();
    };
  }, []);

  return progress;
}
