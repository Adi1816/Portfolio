"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".portfolio-shell",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.72,
      onUpdate: (self) => {
        setProgress(self.progress);
        document.documentElement.style.setProperty("--scroll-progress", String(self.progress));
      }
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refresh);
      trigger.kill();
    };
  }, []);

  return progress;
}

