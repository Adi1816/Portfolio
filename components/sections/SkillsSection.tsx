"use client";

import type { CSSProperties, PointerEvent } from "react";
import { memo, useCallback, useState } from "react";
import { competitiveProfiles, skills } from "@/data/portfolio";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

type StackOrb = {
  id: string;
  label: string;
  category: string;
  title: string;
  meta: string;
  detail: string;
  tone: "blue" | "green" | "silver";
  href?: string;
  skillName?: string;
};

function buildStackOrbs(): StackOrb[] {
  return [
    ...skills.map((skill) => ({
      id: `skill-${skill.name}`,
      label: skill.name,
      category: skill.group.toUpperCase(),
      title: skill.name,
      meta: skill.level,
      detail: skill.log,
      tone: skill.tone,
      skillName: skill.name
    })),
    ...competitiveProfiles.map((profile, index) => ({
      id: `profile-${profile.platform}`,
      label: profile.platform,
      category: "COMPETITIVE PROGRAMMING",
      title: profile.platform,
      meta: `${profile.tier} / ${profile.rating}`,
      detail: `${profile.handle} is Aditya's ${profile.platform} profile, showing a ${profile.tier.toLowerCase()} level competitive programming signal.`,
      tone: (index % 3 === 0 ? "green" : index % 3 === 1 ? "blue" : "silver") as StackOrb["tone"],
      href: profile.href
    }))
  ];
}

const STACK_ORBS = buildStackOrbs();

const StackOrbButton = memo(function StackOrbButton({
  item,
  index,
  isHighlighted,
  onActivate,
  onDeactivate
}: {
  item: StackOrb;
  index: number;
  isHighlighted: boolean;
  onActivate: (item: StackOrb) => void;
  onDeactivate: () => void;
}) {
  const labelLength = item.label.replace(/[^a-z0-9]/gi, "").length;
  const size = Math.min(132, Math.max(84, 72 + labelLength * 5.2));
  const depth = Math.min(1.12, 0.9 + labelLength * 0.018);
  const style = {
    "--orb-index": index,
    "--orb-size": `${size}px`,
    "--orb-y": `${[-10, 18, -2, 26, 8][index % 5]}px`,
    "--orb-x": `${[-8, 10, 0, -14, 12, 4][index % 6]}px`,
    "--orb-depth": `${depth}`
  } as CSSProperties;

  const content = (
    <>
      <span>{item.label}</span>
      <i>{item.category}</i>
    </>
  );

  if (item.href) {
    return (
      <a
        className={isHighlighted ? `stack-orb ${item.tone} active` : `stack-orb ${item.tone}`}
        href={item.href}
        onBlur={onDeactivate}
        onFocus={() => onActivate(item)}
        onPointerEnter={() => onActivate(item)}
        onPointerLeave={onDeactivate}
        rel="noreferrer"
        style={style}
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={isHighlighted ? `stack-orb ${item.tone} active` : `stack-orb ${item.tone}`}
      onBlur={onDeactivate}
      onFocus={() => onActivate(item)}
      onPointerEnter={() => onActivate(item)}
      onPointerLeave={onDeactivate}
      onClick={() => onActivate(item)}
      style={style}
      type="button"
    >
      {content}
    </button>
  );
});

export function SkillsSection({
  setHoveredSkill
}: {
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}) {
  const [activeItem, setActiveItem] = useState<StackOrb>(STACK_ORBS[0]);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [readoutTilt, setReadoutTilt] = useState({ x: 0, y: 0 });

  const activate = useCallback((item: StackOrb) => {
    setActiveItem(item);
    setHighlightedItemId(item.id);
    setHoveredSkill(item.skillName ?? item.title);
  }, [setHoveredSkill]);

  const deactivate = useCallback(() => {
    setHighlightedItemId(null);
    setHoveredSkill(null);
  }, [setHoveredSkill]);

  function tiltReadout(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setReadoutTilt({
      x: Number((-y * 8).toFixed(2)),
      y: Number((x * 10).toFixed(2))
    });
  }

  return (
    <section className="story-section stack-section" id="stack">
      <RevealText className="copy-block">
        <SectionEyebrow>Tech Stack Explosion</SectionEyebrow>
        <h2>Interactive stack field.</h2>
        <p>
          Languages, frameworks, backend systems, cloud platforms, coursework, and competitive profiles assembled into one
          active engineering field.
        </p>
      </RevealText>

      <div className="stack-lab">
        <div className="orb-field" aria-label="Interactive technology and competitive programming stack">
          {STACK_ORBS.map((item, index) => (
            <StackOrbButton
              index={index}
              item={item}
              isHighlighted={highlightedItemId === item.id}
              key={item.id}
              onActivate={activate}
              onDeactivate={deactivate}
            />
          ))}
        </div>

        <div
          className="stack-readout"
          aria-live="polite"
          onPointerLeave={() => setReadoutTilt({ x: 0, y: 0 })}
          onPointerMove={tiltReadout}
          style={{ "--readout-rotate-x": `${readoutTilt.x}deg`, "--readout-rotate-y": `${readoutTilt.y}deg` } as CSSProperties}
        >
          <span>{activeItem.category}</span>
          <h3>{activeItem.title}</h3>
          <strong>{activeItem.meta}</strong>
          <p>{activeItem.detail}</p>
          <div className="readout-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          {activeItem.href ? (
            <a href={activeItem.href} rel="noreferrer" target="_blank">
              Open Profile
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
