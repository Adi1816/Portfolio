"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated && prefersReducedMotion;
}

function HeroTitle() {
  const words = ["ADITYA", "SRIVASTAVA"];
  const reduceMotion = useHydratedReducedMotion();

  return (
    <h1 className="hero-title" aria-label="Aditya Srivastava">
      {words.map((word, wordIndex) => (
        <span className="hero-word" aria-hidden="true" key={word}>
          {word.split("").map((letter, letterIndex) => {
            const index = wordIndex * 7 + letterIndex;
            return (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(18px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.35 + index * 0.025, ease: [0.16, 1, 0.3, 1] }}
                key={`${word}-${letter}-${letterIndex}`}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function HeroSection() {
  const reduceMotion = useHydratedReducedMotion();
  const revealTransition = reduceMotion ? { duration: 0 } : { duration: 0.8 };

  return (
    <section className="story-section hero-section" id="hero">
      <div className="copy-block hero-copy">
        <SectionEyebrow>Status: SDE at Oracle (OSDMC)</SectionEyebrow>
        <HeroTitle />
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? revealTransition : { ...revealTransition, delay: 0.9 }}
          className="hero-subtitle"
        >
          Software Development Engineer | System Architect
        </motion.p>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? revealTransition : { ...revealTransition, delay: 1.0 }}
          className="hero-offer"
        >
          FTE Offers from <span className="offer-brand flipkart">Flipkart</span>,{" "}
          <span className="offer-brand cisco">Cisco</span> and <span className="offer-brand oracle">Oracle</span>
        </motion.p>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? revealTransition : { ...revealTransition, delay: 1.1 }}
          className="hero-signal-grid"
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
        </motion.div>
      </div>
    </section>
  );
}
