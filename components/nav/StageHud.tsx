import { Server } from "lucide-react";
import { stages } from "@/data/portfolio";

export function StageHud({ progress }: { progress: number }) {
  const activeStage = stages[Math.min(stages.length - 1, Math.floor(progress * stages.length))];

  return (
    <aside className="stage-hud" aria-hidden="true">
      <span>{activeStage.range}</span>
      <strong>{activeStage.label}</strong>
      <p>{activeStage.log}</p>
      <i>
        <Server size={12} />
        {Math.round(progress * 100)}%
      </i>
    </aside>
  );
}
