"use client";

import { useEffect, useRef } from "react";

export function useMouseVector() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return mouse;
}
