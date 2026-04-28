"use client";

import { useEffect, useState } from "react";

export type QualityProfile = {
  isCompact: boolean;
  dpr: [number, number];
  segments: number;
  shadows: boolean;
  transmissionSamples: number;
};

export function useAdaptiveQuality(): QualityProfile {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return {
    isCompact,
    dpr: isCompact ? [1, 1] : [1, 1.25],
    segments: isCompact ? 1 : 3,
    shadows: false,
    transmissionSamples: isCompact ? 2 : 3
  };
}
