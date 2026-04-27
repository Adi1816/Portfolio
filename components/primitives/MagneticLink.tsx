"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { SocialLink } from "@/data/portfolio";

export function MagneticLink({ item }: { item: SocialLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = item.icon;

  return (
    <a
      ref={ref}
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        ref.current?.style.setProperty("--magnet-x", `${x}px`);
        ref.current?.style.setProperty("--magnet-y", `${y}px`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--magnet-x", "0px");
        ref.current?.style.setProperty("--magnet-y", "0px");
      }}
    >
      <Icon size={18} />
      {item.label}
      <ArrowUpRight size={16} />
    </a>
  );
}
