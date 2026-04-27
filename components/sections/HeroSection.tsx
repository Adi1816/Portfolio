"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

function HeroTitle() {
  const words = ["ADITYA", "SRIVASTAVA"];

  return (
    <h1 className="hero-title" aria-label="Aditya Srivastava">
      {words.map((word, wordIndex) => (
        <span className="hero-word" aria-hidden="true" key={word}>
          {word.split("").map((letter, letterIndex) => {
            const index = wordIndex * 7 + letterIndex;
            return (
              <motion.span
                initial={{ opacity: 0, y: 30, filter: "blur(18px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.35 + index * 0.025, ease: [0.16, 1, 0.3, 1] }}
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
  return (
    <section className="story-section hero-section" id="hero">
      <div className="copy-block hero-copy">
        <SectionEyebrow>Status: SDE at Oracle (OSDMC)</SectionEyebrow>
        <HeroTitle />
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hero-subtitle"
        >
          Software Development Engineer | System Architect
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="hero-offer"
        >
          FTE Offers from Flipkart, Cisco and Oracle
        </motion.p>
      </div>
    </section>
  );
}
