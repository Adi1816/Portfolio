import { stages } from "@/data/portfolio";

export function GlobalNav({ progress }: { progress: number }) {
  const activeIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));

  return (
    <nav className="global-nav" aria-label="Portfolio navigation">
      <a className="nav-brand" href="#hero" aria-label="Aditya Srivastava home">
        <span>AS</span>
        <strong>System Architecture</strong>
      </a>
      <div className="nav-stages" aria-label="Career stage navigation">
        {stages.map((stage, index) => (
          <a
            aria-current={index === activeIndex ? "location" : undefined}
            className={index === activeIndex ? "active" : ""}
            href={`#${stage.id}`}
            key={stage.id}
          >
            {stage.label}
          </a>
        ))}
      </div>
      <div className="nav-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </nav>
  );
}
