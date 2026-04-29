export function BlueprintOverlay({ progress }: { progress: number }) {
  return (
    <div className="blueprint-overlay" aria-hidden="true">
      <div className="blueprint-label top-right">
        <span>SCROLL VECTOR</span>
        <strong>{Math.round(progress * 100).toString().padStart(3, "0")} / 100</strong>
      </div>
    </div>
  );
}
