"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function RevealText({
  children,
  className = "",
  delay = 0,
  style
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);
  const reduceMotion = isHydrated && prefersReducedMotion;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(18px)" }}
      animate={reduceMotion || isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
