import { experience } from "@/data/portfolio";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

export function ExperienceSection() {
  return (
    <section className="story-section timeline-section" id="timeline">
      <RevealText className="copy-block narrow">
        <SectionEyebrow>Architectural Timeline</SectionEyebrow>
        <h2>Enterprise systems with measurable release signals.</h2>
      </RevealText>
      <div className="timeline">
        {experience.map((item, index) => (
          <RevealText className="timeline-card" delay={index * 0.12} key={item.company}>
            <span>{item.meta}</span>
            <h3>{item.company}</h3>
            <small>{item.period}</small>
            <h4>{item.title}</h4>
            <p>{item.details}</p>
            <strong>{item.metric}</strong>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
