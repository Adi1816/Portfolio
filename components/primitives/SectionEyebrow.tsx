import { Sparkles } from "lucide-react";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <Sparkles size={14} />
      {children}
    </div>
  );
}
