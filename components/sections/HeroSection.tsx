"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

function HeroTitle() {
  const words = ["ADITYA", "SRIVASTAVA"];
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);
  const reduceMotion = isHydrated && prefersReducedMotion;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <h1 className="hero-title" aria-label="Aditya Srivastava">
      {words.map((word, wordIndex) => (
        <span className="hero-word" aria-hidden="true" key={word}>
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${word}-${letter}-${letterIndex}`}
              initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: reduceMotion ? 0 : 0.18 + (wordIndex * 7 + letterIndex) * 0.026,
                duration: reduceMotion ? 0 : 0.74,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {letter}
            </motion.span>
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
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.68, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          Software Development Engineer | System Architect
        </motion.p>
        <motion.p
          className="hero-offer"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.76, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          FTE Offers from <span className="offer-brand flipkart">Flipkart</span>,{" "}
          <span className="offer-brand cisco">Cisco</span> and <span className="offer-brand oracle">Oracle</span>
        </motion.p>
        <motion.div
          className="hero-signal-grid"
          aria-label="Career signal highlights"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.84, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>
      </div>
    </section>
  );
}
