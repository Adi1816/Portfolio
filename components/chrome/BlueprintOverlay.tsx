import { stages } from "@/data/portfolio";

export function BlueprintOverlay({ progress }: { progress: number }) {
  const activeStage = stages[Math.min(stages.length - 1, Math.floor(progress * stages.length))];

  return (
    <div className="blueprint-overlay" aria-hidden="true">
      <div className="blueprint-label top-left">
        <span>CORE / {activeStage.label}</span>
        <strong>{activeStage.log}</strong>
      </div>
      <div className="blueprint-label top-right">
        <span>SCROLL VECTOR</span>
        <strong>{Math.round(progress * 100).toString().padStart(3, "0")} / 100</strong>
      </div>
      <div className="signal-feed">
        <p>render.pipeline: webgl</p>
        <p>motion.driver: gsap.scrolltrigger</p>
        <p>text.reveal: framer.blur-in</p>
      </div>
    </div>
  );
}
