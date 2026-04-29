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
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [mobileStackBeat, setMobileStackBeat] = useState({ focus: false, peeking: false });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const desktopStackSceneFocus = progress >= 0.315 && progress < 0.455;
  const stackSceneFocus = isCompactViewport ? mobileStackBeat.focus : desktopStackSceneFocus;
  const sceneIsClear = stackSceneFocus;
  const desktopSceneIsPeeking =
    (progress >= 0.27 && progress < 0.315) ||
    (progress >= 0.455 && progress < 0.465);
  const sceneIsPeeking = isCompactViewport ? mobileStackBeat.peeking && !mobileStackBeat.focus : desktopSceneIsPeeking;
  const sceneProgress = isCompactViewport && mobileStackBeat.peeking ? 0.38 : progress;
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
    const compactQuery = window.matchMedia("(max-width: 760px), (pointer: coarse)");

    const syncViewportMode = () => {
      setIsCompactViewport(compactQuery.matches);
    };

    syncViewportMode();
    compactQuery.addEventListener("change", syncViewportMode);

    return () => compactQuery.removeEventListener("change", syncViewportMode);
  }, []);

  useEffect(() => {
    if (!isCompactViewport) {
      if (mobileStackBeat.focus || mobileStackBeat.peeking) {
        setMobileStackBeat({ focus: false, peeking: false });
      }

      return;
    }

    const stackFocusGap = document.querySelector<HTMLElement>(".stack-focus-gap");

    if (!stackFocusGap) {
      return;
    }

    const rect = stackFocusGap.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const focus = rect.top < viewportHeight * 0.72 && rect.bottom > viewportHeight * 0.26;
    const peeking = rect.top < viewportHeight * 0.98 && rect.bottom > viewportHeight * 0.08;

    setMobileStackBeat((current) => (current.focus === focus && current.peeking === peeking ? current : { focus, peeking }));
  }, [isCompactViewport, mobileStackBeat.focus, mobileStackBeat.peeking, progress]);

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
  }, [isSceneReady, progress, reduceMotion]);

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
          <CoreScene progress={sceneProgress} hoveredSkill={hoveredSkill} isActive={sceneIsClear} />
        )}
      </div>
      <div className="cursor-aura" ref={cursorAuraRef} aria-hidden="true" />
      <BlueprintOverlay progress={progress} />
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
