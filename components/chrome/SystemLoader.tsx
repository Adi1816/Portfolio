import { ChevronRight } from "lucide-react";
import { bootLines } from "@/data/portfolio";

export function SystemLoader() {
  return (
    <div className="system-loader" aria-hidden="true">
      <div className="loader-core">
        <span />
        <i />
      </div>
      <div className="loader-copy">
        <strong>Aditya Srivastava</strong>
        <div>
          {bootLines.map((line, index) => (
            <p
              key={line}
              className={index === bootLines.length - 1 ? "loader-line final" : "loader-line"}
              style={{ "--loader-index": index } as React.CSSProperties}
            >
              <ChevronRight size={12} />
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
