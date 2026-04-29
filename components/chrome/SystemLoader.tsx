"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { bootLines } from "@/data/portfolio";

export function SystemLoader() {
  return (
    <motion.div
      className="system-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ delay: 2.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="loader-core">
        <span />
        <i />
      </div>
      <div className="loader-copy">
        <strong>Aditya Srivastava</strong>
        <div>
          {bootLines.map((line, index) => (
            <motion.p
              key={line}
              className={index === bootLines.length - 1 ? "loader-line final" : "loader-line"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: index === bootLines.length - 1 ? 1 : 0.68, y: 0 }}
              transition={{ delay: 0.2 + index * 0.25, duration: 0.45 }}
            >
              <ChevronRight size={12} />
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
