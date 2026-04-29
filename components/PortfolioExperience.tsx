"use client";

import dynamic from "next/dynamic";
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
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";

const loadCoreScene = () => import("@/components/scene/CoreScene").then((mod) => mod.CoreScene);

const CoreScene = dynamic(loadCoreScene, {
  ssr: false,
  loading: () => <StaticCore />
});

const DeferredSkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection),
  {
    ssr: false,
    loading: () => <section className="story-section stack-section" id="stack" aria-label="Loading tech stack section" />
  }
);

const DeferredProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection),
  {
    ssr: false,
    loading: () => <section className="story-section projects-section" id="showcase" aria-label="Loading project showcase" />
  }
);

const MemoSystemLoader = memo(SystemLoader);
const MemoCommandLauncher = memo(CommandLauncher);
const MemoHeroSection = memo(HeroSection);
const MemoAboutSection = memo(AboutSection);
const MemoExperienceSection = memo(ExperienceSection);
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

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reduceMotion;
}

export function PortfolioExperience() {
  const progress = useScrollProgress();
  const reduceMotion = usePrefersReducedMotion();
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [shouldRenderStack, setShouldRenderStack] = useState(false);
  const [shouldRenderProjects, setShouldRenderProjects] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const stackSceneFocus = progress >= 0.315 && progress < 0.455;
  const sceneIsClear = stackSceneFocus;
  const sceneIsPeeking =
    (progress >= 0.27 && progress < 0.315) ||
    (progress >= 0.455 && progress < 0.465);
  const progressStyle = useMemo(
    () =>
      ({
        "--scene-blur": sceneIsClear ? "0px" : sceneIsPeeking ? "2.4px" : "5px",
        "--scene-opacity": sceneIsClear ? 0.9 : sceneIsPeeking ? 0.46 : 0.3,
        "--scene-saturate": sceneIsClear ? 1.08 : sceneIsPeeking ? 0.86 : 0.64
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
    const shouldMountMobileScene = isCompact && scrollDepth >= 1.25;
    const shouldPreloadDesktopScene = !isCompact && progress >= 0.24;
    const shouldMountDesktopScene = !isCompact && progress >= 0.28;

    if (shouldPreloadMobileScene || shouldPreloadDesktopScene) {
      loadCoreScene();
    }

    if (!shouldMountDesktopScene && !shouldMountMobileScene) {
      return;
    }

    const delay = isCompact ? 120 : 180;
    let cleanupIdle: (() => void) | null = null;
    const timer = window.setTimeout(() => {
      const cancelIdle = requestIdleWork(() => setIsSceneReady(true), isCompact ? 700 : 1200);
      cleanupIdle = cancelIdle;
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cleanupIdle?.();
    };
  }, [isSceneReady, progress, reduceMotion]);

  useEffect(() => {
    if (shouldRenderStack && shouldRenderProjects) {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    const projectHashes = new Set(["ai-mock-interview", "specpilot", "freshers-guide", "text2mantra"]);

    if (!shouldRenderStack && (progress >= 0.16 || hash === "stack" || hash === "timeline" || projectHashes.has(hash))) {
      setShouldRenderStack(true);
    }

    if (!shouldRenderProjects && (progress >= 0.58 || hash === "showcase" || projectHashes.has(hash))) {
      setShouldRenderProjects(true);
    }
  }, [progress, shouldRenderProjects, shouldRenderStack]);

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
      {shouldRenderStack ? (
        <DeferredSkillsSection hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
      ) : (
        <section className="story-section stack-section deferred-section-shell" id="stack" aria-hidden="true" />
      )}
      <section className="stack-focus-gap" aria-hidden="true" />
      <MemoExperienceSection />
      {shouldRenderProjects ? (
        <DeferredProjectsSection />
      ) : (
        <section className="story-section projects-section deferred-section-shell" id="showcase" aria-hidden="true" />
      )}
      <MemoFooterSection />

      <div className="reduced-motion-note">
        <CircuitBoard size={14} />
        Reduced motion protocol active
      </div>
    </main>
  );
}
