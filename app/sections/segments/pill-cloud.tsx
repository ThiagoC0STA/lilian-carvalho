"use client";

import { segments } from "./data";
import { cn } from "@/lib/cn";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

export function SegmentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {segments.map((segment, index) => (
        <SegmentCard key={segment.label} segment={segment} index={index} />
      ))}
    </div>
  );
}

interface SegmentCardProps {
  segment: (typeof segments)[number];
  index: number;
}

function SegmentCard({ segment, index }: SegmentCardProps) {
  const [ref, revealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-10% 0px",
  });
  const Icon = segment.icon;

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-8 hover:border-white/20 transition-all duration-300",
        "reveal-up-sm",
        revealed && "is-visible",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          segment.color,
        )}
      />

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
    </div>
  );
}
