"use client";

import { Command, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { siteProfile, socialLinks } from "@/data/portfolio";

export function CommandLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? "command-launcher open" : "command-launcher"}>
      <button className="command-trigger" onClick={() => setIsOpen((value) => !value)} type="button" aria-expanded={isOpen}>
        {isOpen ? <X size={16} /> : <Command size={16} />}
        Launch
      </button>
      <div className="command-panel" aria-hidden={!isOpen}>
        <span>Quick Actions</span>
        <strong>{siteProfile.name}</strong>
        {socialLinks.map((item) => (
          <a className={item.href.startsWith("#") ? "pending" : ""} href={item.href} key={item.label}>
            <item.icon size={16} />
            {item.label}
            <ExternalLink size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}
