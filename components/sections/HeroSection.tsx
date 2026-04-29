import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

function HeroTitle() {
  const words = ["ADITYA", "SRIVASTAVA"];

  return (
    <h1 className="hero-title" aria-label="Aditya Srivastava">
      {words.map((word, wordIndex) => (
        <span className="hero-word" aria-hidden="true" key={word}>
          {word.split("").map((letter, letterIndex) => (
            <span
              key={`${word}-${letter}-${letterIndex}`}
              style={{ "--letter-index": wordIndex * 7 + letterIndex } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function HeroSection() {
  return (
    <section className="story-section hero-section" id="hero">
      <div className="copy-block hero-copy">
        <SectionEyebrow>Status: SDE at Oracle (OSDMC)</SectionEyebrow>
        <HeroTitle />
        <p className="hero-subtitle hero-reveal" style={{ "--hero-delay": "0.68s" } as React.CSSProperties}>
          Software Development Engineer | System Architect
        </p>
        <p className="hero-offer hero-reveal" style={{ "--hero-delay": "0.76s" } as React.CSSProperties}>
          FTE Offers from <span className="offer-brand flipkart">Flipkart</span>,{" "}
          <span className="offer-brand cisco">Cisco</span> and <span className="offer-brand oracle">Oracle</span>
        </p>
        <div
          className="hero-signal-grid"
          style={{ "--hero-delay": "0.84s" } as React.CSSProperties}
          aria-label="Career signal highlights"
        >
          <span>
            <i>Current</i>
            <strong>Oracle OSDMC</strong>
          </span>
          <span>
            <i>Competitive</i>
            <strong>CF Expert · LC Knight</strong>
          </span>
          <span>
            <i>Product</i>
            <strong>AI + API Systems</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
