import { experience } from "@/data/portfolio";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

const experienceAccents: Record<string, { accent: string; soft: string }> = {
  Oracle: { accent: "#ff312e", soft: "rgba(255, 49, 46, 0.14)" },
  DocuSign: { accent: "#34a853", soft: "rgba(52, 168, 83, 0.14)" },
  "TLE Eliminators": { accent: "#f7c948", soft: "rgba(247, 201, 72, 0.14)" }
};

function ExperienceMark({ company }: { company: string }) {
  const key = company.toLowerCase().replace(/[^a-z]/g, "");
  const logo = key.includes("oracle")
    ? {
        src: "/logos/oracle.svg",
        label: "Oracle logo",
        className: "oracle-logo"
      }
    : key.includes("docusign")
      ? {
          src: "/logos/docusign.svg",
          label: "DocuSign logo",
          className: "docusign-logo"
        }
      : {
          src: "/logos/tle-eliminators.svg",
          label: "TLE Eliminators logo",
          className: "tle-logo"
        };

  return (
    <div className={`experience-mark ${logo.className}`} aria-label={logo.label}>
      <img alt="" decoding="async" loading="lazy" src={logo.src} />
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="story-section timeline-section" id="timeline">
      <RevealText className="copy-block narrow">
        <SectionEyebrow>Architectural Timeline</SectionEyebrow>
        <h2>Enterprise systems with measurable release signals.</h2>
      </RevealText>
      <div className="timeline">
        {experience.map((item, index) => {
          const accent = experienceAccents[item.company] ?? { accent: "#00ff41", soft: "rgba(0, 255, 65, 0.14)" };

          return (
            <RevealText
              className="timeline-card"
              delay={index * 0.12}
              key={item.company}
              style={
                {
                  "--timeline-delay": index * 0.42,
                  "--timeline-accent": accent.accent,
                  "--timeline-accent-soft": accent.soft
                } as React.CSSProperties
              }
            >
              <div className="timeline-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="timeline-body">
                <div className="timeline-topline">
                  <span>{item.meta}</span>
                  <small>{item.period}</small>
                </div>
                <h3>{item.company}</h3>
                <h4>{item.title}</h4>
                <p>{item.details}</p>
                <div className="timeline-tags" aria-label={`${item.company} technology and signal tags`}>
                  {item.stack.map((tag) => (
                    <i key={tag}>{tag}</i>
                  ))}
                </div>
              </div>
              <aside className="timeline-signal">
                <ExperienceMark company={item.company} />
                <span>{item.signal}</span>
                <strong>{item.metric}</strong>
              </aside>
            </RevealText>
          );
        })}
      </div>
    </section>
  );
}
