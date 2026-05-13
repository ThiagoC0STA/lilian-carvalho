"use client";

import { MouseEvent } from "react";
import type { ServiceCard as ServiceCardType, ChartType } from "./data";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

function useHasFineHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

function MiniChart({ type }: { type: ChartType }) {
  if (type === "bar") {
    const bars = [30, 45, 25, 60, 80, 50, 95];
    return (
      <div className="absolute right-4 sm:right-10 bottom-0 h-32 w-48 flex items-end justify-end gap-1.5 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-5 bg-white rounded-t-sm chart-bar"
            style={
              {
                "--bar-height": `${h}%`,
                "--chart-delay": `${i * 100}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (type === "line") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-8 h-24 w-40 opacity-10 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <path
            d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5"
            pathLength={1}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            className="chart-draw"
          />
          <circle
            cx="100"
            cy="5"
            r="4"
            className="fill-white chart-scale"
            style={{ "--chart-delay": "1400ms" } as React.CSSProperties}
          />
        </svg>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-6 h-24 w-32 grid grid-cols-2 grid-rows-2 gap-2 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <div
          className="bg-white rounded-sm chart-scale"
          style={{ "--chart-delay": "100ms" } as React.CSSProperties}
        />
        <div
          className="bg-white rounded-sm chart-scale"
          style={{ "--chart-delay": "200ms" } as React.CSSProperties}
        />
        <div
          className="bg-white rounded-sm col-span-2 chart-scale"
          style={{ "--chart-delay": "300ms" } as React.CSSProperties}
        />
      </div>
    );
  }

  if (type === "nodes") {
    return (
      <div className="absolute right-6 sm:right-12 bottom-6 h-24 w-24 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <circle cx="50" cy="50" r="10" className="fill-white chart-scale" />
          <circle
            cx="20"
            cy="20"
            r="6"
            className="fill-white chart-scale"
            style={{ "--chart-delay": "200ms" } as React.CSSProperties}
          />
          <circle
            cx="80"
            cy="80"
            r="6"
            className="fill-white chart-scale"
            style={{ "--chart-delay": "300ms" } as React.CSSProperties}
          />
          <circle
            cx="80"
            cy="20"
            r="6"
            className="fill-white chart-scale"
            style={{ "--chart-delay": "400ms" } as React.CSSProperties}
          />
          <line
            x1="50"
            y1="50"
            x2="20"
            y2="20"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="4 4"
            pathLength={1}
            className="chart-draw"
          />
          <line
            x1="50"
            y1="50"
            x2="80"
            y2="80"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="4 4"
            pathLength={1}
            className="chart-draw"
            style={{ "--chart-delay": "100ms" } as React.CSSProperties}
          />
          <line
            x1="50"
            y1="50"
            x2="80"
            y2="20"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="4 4"
            pathLength={1}
            className="chart-draw"
            style={{ "--chart-delay": "200ms" } as React.CSSProperties}
          />
        </svg>
      </div>
    );
  }

  if (type === "wireframe") {
    return (
      <div className="absolute right-4 sm:right-10 bottom-0 h-32 w-32 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-bottom-right">
        <div className="w-full h-8 border-2 border-white rounded-t-lg mb-2 chart-fadeup" />
        <div
          className="w-full h-12 border-2 border-white rounded-sm mb-2 chart-fadeup"
          style={{ "--chart-delay": "100ms" } as React.CSSProperties}
        />
        <div
          className="w-full h-16 border-2 border-white rounded-sm chart-fadeup"
          style={{ "--chart-delay": "200ms" } as React.CSSProperties}
        />
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <div className="absolute right-10 sm:right-16 bottom-10 h-16 w-16 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-75 sm:scale-100 origin-center">
        <div className="pulse-ring absolute inset-0 rounded-full border-2 border-white" />
        <div className="pulse-ring pulse-ring-delay absolute inset-2 rounded-full border-2 border-white" />
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
  const [ref, revealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-10% 0px",
  });
  const hasHover = useHasFineHover();

  // 3D tilt — direct DOM mutation, no Motion springs. CSS handles the
  // smoothing via `transition: transform 0.3s` on `.tilt-card`.
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasHover) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 8; // -4 → 4
    const rotateY = (x - 0.5) * 8; // -4 → 4
    node.style.setProperty("--tilt-x", `${rotateX}deg`);
    node.style.setProperty("--tilt-y", `${rotateY}deg`);
    node.style.setProperty("--glow-x", `${x * 100}%`);
    node.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    if (!hasHover) return;
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  };

  const Icon = card.icon;

  return (
    <div
      ref={ref}
      onMouseMove={hasHover ? handleMouseMove : undefined}
      onMouseLeave={hasHover ? handleMouseLeave : undefined}
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-violet-500/10 bg-neutral-900/40 p-6 sm:p-10 h-full min-h-[300px]",
        "hover:border-violet-400/30 hover:bg-neutral-800/50 shadow-[0_0_40px_rgba(139,92,246,0.05)] hover:shadow-[0_0_80px_rgba(139,92,246,0.15)]",
        "sm:backdrop-blur-md",
        "reveal-up",
        hasHover && "tilt-card",
        revealed && "is-visible",
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
    </div>
  );
}
