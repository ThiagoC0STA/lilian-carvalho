"use client";

import { motion } from "motion/react";
import { segments } from "./data";
import { cn } from "@/lib/cn";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";

export function SegmentCards() {
  const mobilePerformanceMode = useMobilePerformanceMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {segments.map((segment, index) => {
        const Icon = segment.icon;
        const content = (
          <>
            {/* Elegant Color Gradient Background */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", segment.color)} />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3 tracking-wide">
                {segment.label}
              </h3>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                {segment.description}
              </p>
            </div>
          </>
        );

        if (mobilePerformanceMode) {
          return (
            <div
              key={segment.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-8 transition-all duration-300 hover:border-white/20"
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={segment.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-8 hover:border-white/20 transition-all duration-300"
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}
