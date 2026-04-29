"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { CircuitBoard } from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SystemLoader } from "@/components/chrome/SystemLoader";
import { BlueprintOverlay } from "@/components/chrome/BlueprintOverlay";
import { CommandLauncher } from "@/components/chrome/CommandLauncher";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { StageHud } from "@/components/nav/StageHud";
import { StaticCore } from "@/components/scene/StaticCore";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FooterSection } from "@/components/sections/FooterSection";

const loadCoreScene = () => import("@/components/scene/CoreScene").then((mod) => mod.CoreScene);

const CoreScene = dynamic(loadCoreScene, {
  ssr: false,
  loading: () => <StaticCore />
});

const MemoSystemLoader = memo(SystemLoader);
const MemoCommandLauncher = memo(CommandLauncher);
const MemoHeroSection = memo(HeroSection);
const MemoAboutSection = memo(AboutSection);
const MemoSkillsSection = memo(SkillsSection);
const MemoExperienceSection = memo(ExperienceSection);
const MemoProjectsSection = memo(ProjectsSection);
const MemoFooterSection = memo(FooterSection);

function shouldPreferStaticCore() {
  const navigatorWithHints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const isCompact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
  const saveData = Boolean(navigatorWithHints.connection?.saveData);
  const lowMemory = typeof navigatorWithHints.deviceMemory === "number" && navigatorWithHints.deviceMemory <= 2;
  const lowCoreCount = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;

  return isCompact && (saveData || lowMemory || lowCoreCount);
}

function requestIdleWork(task: () => void, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(idleId);
  }

  const timer = globalThis.setTimeout(task, 1);
  return () => globalThis.clearTimeout(timer);
}

export function PortfolioExperience() {
  const progress = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const stackSceneFocus = progress >= 0.315 && progress < 0.535;
  const showcaseSceneFocus = progress >= 0.695 && progress < 0.84;
  const sceneIsClear = stackSceneFocus || showcaseSceneFocus;
  const sceneIsPeeking = (progress >= 0.27 && progress < 0.315) || (progress >= 0.66 && progress < 0.695);
  const progressStyle = useMemo(
    () =>
      ({
        "--scene-blur": sceneIsClear ? "0px" : sceneIsPeeking ? "1.1px" : "2.4px",
        "--scene-opacity": sceneIsClear ? 0.94 : sceneIsPeeking ? 0.68 : 0.48,
        "--scene-saturate": sceneIsClear ? 1.08 : sceneIsPeeking ? 0.94 : 0.76
      }) as React.CSSProperties,
    [sceneIsClear, sceneIsPeeking]
  );

  useEffect(() => {
    if (reduceMotion || isSceneReady) {
      return;
    }

    if (shouldPreferStaticCore()) {
      return;
    }

    const isCompact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const scrollDepth = window.scrollY / Math.max(window.innerHeight, 1);
    const shouldPreloadMobileScene = isCompact && scrollDepth >= 0.9;
    const shouldMountMobileScene = isCompact && (scrollDepth >= 1.25 || showcaseSceneFocus);
    const shouldMountDesktopScene = !isCompact;

    if (shouldPreloadMobileScene) {
      loadCoreScene();
    }

    if (!shouldMountDesktopScene && !shouldMountMobileScene) {
      return;
    }

    const delay = isCompact ? 120 : 1000;
    let cleanupIdle: (() => void) | null = null;
    const timer = window.setTimeout(() => {
      const cancelIdle = requestIdleWork(() => setIsSceneReady(true), isCompact ? 700 : 1200);
      cleanupIdle = cancelIdle;
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cleanupIdle?.();
    };
  }, [isSceneReady, progress, reduceMotion, showcaseSceneFocus]);

  useEffect(() => {
    const aura = cursorAuraRef.current;
    if (!aura || reduceMotion) {
      return;
    }

    const motionQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 901px)");
    if (!motionQuery.matches) {
      return;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      aura.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
      frame = 0;
    };

    const moveAura = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      aura.style.opacity = "1";

      if (!frame) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    const hideAura = () => {
      aura.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveAura, { passive: true });
    document.addEventListener("mouseleave", hideAura);
    document.addEventListener("visibilitychange", hideAura);

    return () => {
      window.removeEventListener("pointermove", moveAura);
      document.removeEventListener("mouseleave", hideAura);
      document.removeEventListener("visibilitychange", hideAura);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reduceMotion]);

  return (
    <main className="portfolio-shell" style={progressStyle}>
      <MemoSystemLoader />
      <GlobalNav progress={progress} />
      <div className="scene-layer" aria-hidden="true">
        {reduceMotion || !isSceneReady ? (
          <StaticCore />
        ) : (
          <CoreScene progress={progress} hoveredSkill={hoveredSkill} isActive={sceneIsClear} />
        )}
      </div>
      <div className="cursor-aura" ref={cursorAuraRef} aria-hidden="true" />
      <BlueprintOverlay progress={progress} />
      <StageHud progress={progress} />
      <MemoCommandLauncher />

      <MemoHeroSection />
      <MemoAboutSection />
      <MemoSkillsSection hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
      <section className="stack-focus-gap" aria-hidden="true" />
      <MemoExperienceSection />
      <MemoProjectsSection />
      <MemoFooterSection />

      <div className="reduced-motion-note">
        <CircuitBoard size={14} />
        Reduced motion protocol active
      </div>
    </main>
  );
}
