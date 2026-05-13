"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerMs?: number;
}

export function RevealText({
  text,
  className,
  delay = 0,
  staggerMs = 30,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mobilePerformanceMode = useMobilePerformanceMode();
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  if (mobilePerformanceMode) {
    return (
      <div ref={ref} className={className}>
        {text}
      </div>
    );
  }

  const words = text.split(/\s+/);

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: 0.7,
              delay: delay + (i * staggerMs) / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
