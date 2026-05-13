"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MouseEvent, useRef } from "react";
import type { ServiceCard as ServiceCardType, ChartType } from "./data";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";

function useHasFineHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

function MiniChart({ type }: { type: ChartType }) {
  if (type === "bar") {
    const bars = [30, 45, 25, 60, 80, 50, 95];
    return (
      <div className="absolute right-4 sm:right-10 bottom-0 h-32 w-48 flex items-end justify-end gap-1.5 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-5 bg-white rounded-t-sm"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    );
  }

  if (type === "line") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-8 h-24 w-40 opacity-10 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <motion.path
            d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle cx="100" cy="5" r="4" className="fill-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.4 }} />
        </svg>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-6 h-24 w-32 grid grid-cols-2 grid-rows-2 gap-2 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <motion.div className="bg-white rounded-sm" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
        <motion.div className="bg-white rounded-sm" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
        <motion.div className="bg-white rounded-sm col-span-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
      </div>
    );
  }

  if (type === "nodes") {
    return (
      <div className="absolute right-6 sm:right-12 bottom-6 h-24 w-24 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <motion.circle cx="50" cy="50" r="10" className="fill-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} />
          <motion.circle cx="20" cy="20" r="6" className="fill-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} />
          <motion.circle cx="80" cy="80" r="6" className="fill-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} />
          <motion.circle cx="80" cy="20" r="6" className="fill-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }} />
          <motion.line x1="50" y1="50" x2="20" y2="20" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} />
          <motion.line x1="50" y1="50" x2="80" y2="80" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.1 }}/>
          <motion.line x1="50" y1="50" x2="80" y2="20" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.2 }}/>
        </svg>
      </div>
    );
  }

  if (type === "wireframe") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-0 h-32 w-32 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
         <motion.div className="w-full h-8 border-2 border-white rounded-t-lg mb-2" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} />
         <motion.div className="w-full h-12 border-2 border-white rounded-sm mb-2" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} />
         <motion.div className="w-full h-16 border-2 border-white rounded-sm" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} />
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <div className="absolute right-10 sm:right-16 bottom-10 h-16 w-16 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-center">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          animate={{ scale: [1, 2.5, 2.5], opacity: [1, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-white"
          animate={{ scale: [1, 2, 2], opacity: [1, 0, 0] }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="absolute inset-6 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </div>
    );
  }

  return null;
}

interface ServiceCardProps {
  card: ServiceCardType;
  index: number;
}

export function ServiceCard({ card, index }: ServiceCardProps) {
  const mobilePerformanceMode = useMobilePerformanceMode();

  if (mobilePerformanceMode) {
    return <StaticServiceCard card={card} />;
  }

  return <AnimatedServiceCard card={card} index={index} />;
}

function StaticServiceCard({ card }: { card: ServiceCardType }) {
  const Icon = card.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-violet-500/10 bg-neutral-900/40 p-6 h-full min-h-[300px]",
        "shadow-[0_0_40px_rgba(139,92,246,0.05)]",
      )}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between mb-10">
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            {card.number}
          </span>
          <Icon className="h-5 w-5 stroke-[1.5] text-neutral-400" />
        </div>

        <div className="mt-auto relative z-20">
          <h3 className="font-sans font-bold tracking-tight text-2xl text-white leading-tight mb-3">
            {card.title}
          </h3>

          <p className="font-sans text-[15px] text-neutral-400 font-light tracking-wide leading-relaxed max-w-[95%]">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedServiceCard({ card, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasFineHover();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasHover) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    node.style.setProperty("--glow-x", `${x * 100}%`);
    node.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    if (!hasHover) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={hasHover ? handleMouseMove : undefined}
      onMouseLeave={hasHover ? handleMouseLeave : undefined}
      style={
        hasHover
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-xl border border-violet-500/10 bg-neutral-900/40 p-6 sm:p-10 h-full min-h-[300px]",
        "transition-all duration-500 hover:border-violet-400/30 hover:bg-neutral-800/50 shadow-[0_0_40px_rgba(139,92,246,0.05)] hover:shadow-[0_0_80px_rgba(139,92,246,0.15)]",
        "sm:backdrop-blur-md",
      )}
    >


      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between mb-10 sm:mb-16">
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            {card.number}
          </span>
          <Icon className="h-5 w-5 stroke-[1.5] text-neutral-400 transition-colors duration-500 group-hover:text-white" />
        </div>

        <div className="mt-auto relative z-20">
          <h3 className="font-sans font-bold tracking-tight text-2xl sm:text-4xl text-white leading-tight mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform duration-500">
            {card.title}
          </h3>

          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light tracking-wide leading-relaxed max-w-[95%] sm:max-w-[85%] group-hover:text-neutral-300 transition-colors duration-500">
            {card.description}
          </p>
        </div>
      </div>

      <MiniChart type={card.chartType} />
    </motion.div>
  );
}
