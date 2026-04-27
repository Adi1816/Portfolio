"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/data/portfolio";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(0);
  const selectedProject = projects[activeProject];

  return (
    <div className="project-showcase">
      <div className="project-rail" style={{ "--project-count": projects.length } as React.CSSProperties} aria-label="Project selector">
        {projects.map((project, index) => (
          <button
            className={activeProject === index ? "project-rail-card active" : "project-rail-card"}
            key={project.name}
            onClick={() => setActiveProject(index)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.name}</strong>
            <p>{project.stack}</p>
          </button>
        ))}
      </div>

      <RevealText className="project-case-study">
        <div className="case-media-grid">
          {selectedProject.media.map((media, index) => (
            <div className={index === 1 ? "case-media secondary" : "case-media"} key={media.src}>
              <Image alt={media.alt} fill priority={activeProject === 0 && index === 0} sizes="(max-width: 900px) 100vw, 420px" src={media.src} />
            </div>
          ))}
        </div>

        <div className="case-divider" />

        <div className="case-copy">
          <span>Text about project</span>
          <h3>{selectedProject.name}</h3>
          <p>{selectedProject.copy}</p>
          <p>{selectedProject.problem}</p>
        </div>

        <div className="case-detail-grid">
          <div>
            <h4>Architecture</h4>
            <ul>
              {selectedProject.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Engineering Decisions</h4>
            <ul>
              {selectedProject.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="case-actions">
          {selectedProject.links.map((link) => (
            <a className={link.href.startsWith("#add") ? "pending" : ""} href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </RevealText>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="story-section projects-section" id="showcase">
      <RevealText className="copy-block">
        <SectionEyebrow>Feature Showcase</SectionEyebrow>
        <h2>Product surfaces built like instruments.</h2>
      </RevealText>
      <ProjectShowcase />
    </section>
  );
}
