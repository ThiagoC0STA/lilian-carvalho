"use client";

import { cn } from "@/lib/cn";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerMs?: number;
}

// Word-by-word reveal driven entirely by CSS — the per-word stagger comes
// from the `--i` CSS variable on each <span>, and the transition kicks in
// when `.is-visible` is toggled on the wrapper by `useRevealOnScroll`.
export function RevealText({
  text,
  className,
  delay = 0,
  staggerMs: _staggerMs = 30,
}: RevealTextProps) {
  const [ref, revealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-15% 0px",
  });

  const words = text.split(/\s+/);
  const baseDelayMs = Math.round(delay * 1000);

  return (
    <div
      ref={ref}
      className={cn("reveal-words", className, revealed && "is-visible")}
      style={
        {
          "--reveal-delay": `${baseDelayMs}ms`,
        } as React.CSSProperties
      }
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <span
            className="reveal-word"
            style={{ "--i": i } as React.CSSProperties}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </div>
  );
}
