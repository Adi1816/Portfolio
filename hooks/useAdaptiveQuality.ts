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
    dpr: isCompact ? [1, 1.2] : [1, 1.8],
    segments: isCompact ? 2 : 4,
    shadows: !isCompact,
    transmissionSamples: isCompact ? 3 : 6
  };
}
