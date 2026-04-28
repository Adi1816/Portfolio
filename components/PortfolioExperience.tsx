"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { CircuitBoard } from "lucide-react";
import { useMemo, useState } from "react";
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

const CoreScene = dynamic(() => import("@/components/scene/CoreScene").then((mod) => mod.CoreScene), {
  ssr: false,
  loading: () => <StaticCore />
});

export function PortfolioExperience() {
  const progress = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sceneIsClear = (progress >= 0.365 && progress < 0.515) || (progress >= 0.755 && progress < 0.885);
  const progressStyle = useMemo(
    () =>
      ({
        "--scene-blur": sceneIsClear ? "0px" : "2.2px",
        "--scene-opacity": sceneIsClear ? 0.94 : 0.5,
        "--scene-saturate": sceneIsClear ? 1.08 : 0.78
      }) as React.CSSProperties,
    [sceneIsClear]
  );

  return (
    <main className="portfolio-shell" style={progressStyle}>
      <SystemLoader />
      <GlobalNav progress={progress} />
      <div className="scene-layer" aria-hidden="true">
        {reduceMotion ? <StaticCore /> : <CoreScene progress={progress} hoveredSkill={hoveredSkill} />}
      </div>
      <BlueprintOverlay progress={progress} />
      <StageHud progress={progress} />
      <CommandLauncher />

      <HeroSection />
      <AboutSection />
      <SkillsSection hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
      <section className="stack-focus-gap" aria-hidden="true" />
      <ExperienceSection />
      <ProjectsSection />
      <FooterSection />

      <div className="reduced-motion-note">
        <CircuitBoard size={14} />
        Reduced motion protocol active
      </div>
    </main>
  );
}
