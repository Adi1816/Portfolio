"use client";

import { Code2, Command, Copy, ExternalLink, FileText, FolderKanban, Github, Linkedin, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { competitiveProfiles, projects, siteProfile } from "@/data/portfolio";

const profileActions = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-srivastava-12476524a/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Adi1816", icon: Github }
];

export function CommandLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Email");
  const launcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!launcherRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteProfile.email);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy Email"), 1400);
    } catch {
      window.location.href = `mailto:${siteProfile.email}`;
    }
  }

  return (
    <div className={isOpen ? "command-launcher open" : "command-launcher"} ref={launcherRef}>
      <button
        aria-controls="launch-command-panel"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="command-trigger"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {isOpen ? <X size={16} /> : <Command size={16} />}
        Launch
      </button>
      <div
        aria-hidden={!isOpen}
        aria-label="Launch command center"
        className="command-panel"
        id="launch-command-panel"
        role="dialog"
      >
        <div className="command-panel-head">
          <span>Command Center</span>
          <strong>{siteProfile.name}</strong>
          <p>Available for high-impact backend, systems, and AI product work.</p>
        </div>

        <div className="command-status">
          <i />
          System handshake ready
        </div>

        <div className="command-primary-grid">
          <button onClick={copyEmail} type="button">
            <Copy size={15} />
            {copyLabel}
          </button>
          <a href={`mailto:${siteProfile.email}`} onClick={() => setIsOpen(false)}>
            <Mail size={15} />
            Email
          </a>
          <a href={siteProfile.resumeHref} onClick={() => setIsOpen(false)} rel="noreferrer" target="_blank">
            <FileText size={15} />
            Resume
          </a>
        </div>

        <div className="command-group">
          <span>Profiles</span>
          <div className="command-link-grid">
            {profileActions.map((item) => (
              <a href={item.href} key={item.label} onClick={() => setIsOpen(false)} rel="noreferrer" target="_blank">
                <item.icon size={15} />
                {item.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>

        <div className="command-group">
          <span>Competitive Signal</span>
          <div className="command-link-grid compact">
            {competitiveProfiles.map((profile) => (
              <a href={profile.href} key={profile.platform} onClick={() => setIsOpen(false)} rel="noreferrer" target="_blank">
                <Code2 size={15} />
                <strong>{profile.platform}</strong>
                <em>{profile.tier}</em>
              </a>
            ))}
          </div>
        </div>

        <div className="command-group">
          <span>Project Launches</span>
          <div className="command-link-grid compact">
            {projects.map((project) => {
              const liveLink = project.links[0];

              return (
                <a href={liveLink.href} key={project.name} onClick={() => setIsOpen(false)} rel="noreferrer" target="_blank">
                  <FolderKanban size={15} />
                  <strong>{project.name}</strong>
                  <em>{liveLink.label}</em>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
