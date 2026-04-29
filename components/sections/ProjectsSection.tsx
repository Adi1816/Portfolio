"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

const projectThemes = ["#0072c6", "#8b5cf6", "#ff312e", "#f7c948"];

function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(0);
  const [previewImage, setPreviewImage] = useState<(typeof projects)[number]["media"][number] | null>(null);
  const projectButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previewCloseRef = useRef<HTMLButtonElement>(null);
  const selectedProject = projects[activeProject];
  const projectCount = projects.length;

  function selectProject(index: number, syncHash = true) {
    setActiveProject(index);

    if (syncHash) {
      const slug = projects[index]?.slug;
      if (slug) {
        window.history.replaceState(null, "", `#${slug}`);
      }
    }
  }

  function moveProject(direction: -1 | 1) {
    setActiveProject((current) => {
      const next = (current + direction + projectCount) % projectCount;
      window.history.replaceState(null, "", `#${projects[next].slug}`);
      return next;
    });
  }

  useEffect(() => {
    projectButtonRefs.current[activeProject]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [activeProject]);

  useEffect(() => {
    const hydrateFromHash = () => {
      const slug = window.location.hash.replace("#", "");
      const projectIndex = projects.findIndex((project) => project.slug === slug);

      if (projectIndex >= 0) {
        selectProject(projectIndex, false);
        document.getElementById("showcase")?.scrollIntoView({ block: "start" });
      }
    };

    hydrateFromHash();
    window.addEventListener("hashchange", hydrateFromHash);
    return () => window.removeEventListener("hashchange", hydrateFromHash);
  }, []);

  useEffect(() => {
    if (!previewImage) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        setPreviewImage(null);
      }
    }

    previewCloseRef.current?.focus();
    window.addEventListener("keydown", closeOnEscape, true);
    return () => window.removeEventListener("keydown", closeOnEscape, true);
  }, [previewImage]);

  return (
    <div className="project-showcase" style={{ "--project-accent": projectThemes[activeProject % projectThemes.length] } as React.CSSProperties}>
      <div className="project-selector">
        <div className="project-rail" style={{ "--project-count": projects.length } as React.CSSProperties} aria-label="Project selector">
          {projects.map((project, index) => (
            <button
              className={activeProject === index ? "project-rail-card active" : "project-rail-card"}
              key={project.name}
              onClick={() => selectProject(index)}
              ref={(node) => {
                projectButtonRefs.current[index] = node;
              }}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{project.name}</strong>
              <p>{project.stack}</p>
            </button>
          ))}
        </div>

        <div className="project-controls" aria-label="Project controls">
          <button aria-label="Previous project" onClick={() => moveProject(-1)} type="button">
            <ChevronLeft size={17} />
          </button>
          <div className="project-dots" aria-label="Project position">
            {projects.map((project, index) => (
              <button
                aria-label={`Show ${project.name}`}
                aria-pressed={activeProject === index}
                className={activeProject === index ? "active" : ""}
                key={project.name}
                onClick={() => selectProject(index)}
                type="button"
              />
            ))}
          </div>
          <span>
            {String(activeProject + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
          </span>
          <button aria-label="Next project" onClick={() => moveProject(1)} type="button">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <RevealText className="project-case-study">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="case-reel"
            exit={{ opacity: 0, y: -14 }}
            initial={{ opacity: 0, y: 18 }}
            key={selectedProject.name}
            id={selectedProject.slug}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="case-meta-row">
              <span>{selectedProject.stack}</span>
              <span>{selectedProject.metric}</span>
              <span>{selectedProject.signal}</span>
            </div>

            <div className="case-media-grid">
              {selectedProject.media.map((media, index) => (
                <button
                  aria-label={`Preview ${selectedProject.name} ${media.label}`}
                  className={index === 1 ? "case-media secondary" : "case-media"}
                  key={media.src}
                  onClick={() => setPreviewImage(media)}
                  type="button"
                >
                  <Image alt={media.alt} fill priority={activeProject === 0} sizes="(max-width: 900px) 100vw, 420px" src={media.src} />
                </button>
              ))}
            </div>

            <div className="case-divider" />

            <div className="case-copy">
              <span>Case study</span>
              <h3>{selectedProject.name}</h3>
              <p>{selectedProject.copy}</p>
              <p>{selectedProject.problem}</p>
            </div>

            <div className="case-brief-grid" aria-label={`${selectedProject.name} case study brief`}>
              <div>
                <span>Role</span>
                <strong>{selectedProject.role}</strong>
              </div>
              <div>
                <span>Challenge</span>
                <strong>{selectedProject.challenge}</strong>
              </div>
              <div>
                <span>Solution</span>
                <strong>{selectedProject.solution}</strong>
              </div>
              <div className="case-impact">
                <span>Impact</span>
                <strong>{selectedProject.impact}</strong>
                <ul>
                  {selectedProject.proofPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
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
          </motion.div>
        </AnimatePresence>
      </RevealText>

      <AnimatePresence>
        {previewImage ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label="Project screenshot preview"
            aria-modal="true"
            className="project-preview"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            role="dialog"
          >
            <button
              className="project-preview-close"
              onClick={() => setPreviewImage(null)}
              ref={previewCloseRef}
              type="button"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <motion.button
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="project-preview-frame"
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              type="button"
              aria-label={`Expanded preview: ${previewImage.alt}`}
            >
              <Image alt={previewImage.alt} fill priority sizes="96vw" src={previewImage.src} />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="story-section projects-section" id="showcase">
      <RevealText className="copy-block">
        <SectionEyebrow>Feature Showcase</SectionEyebrow>
        <h2>Product systems, built to be inspected.</h2>
      </RevealText>
      <ProjectShowcase />
    </section>
  );
}
