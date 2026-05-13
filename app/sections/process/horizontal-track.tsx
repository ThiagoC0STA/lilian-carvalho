"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { processSteps } from "./data";
import { Step } from "./step";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!container || !track || !progress) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (pointer: fine)", () => {
        const totalWidth = track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        const progressTween = gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 0.8,
          },
        });

        return () => {
          tween.kill();
          progressTween.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="w-full overflow-x-auto bg-background pb-8 [scrollbar-width:none] md:sticky md:top-0 md:h-screen md:overflow-hidden md:pb-0 flex flex-col snap-x snap-mandatory md:snap-none">
        <div className="relative hidden h-px w-full bg-white/5 md:block">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet-600 via-amber-500 to-transparent"
          />
        </div>

        <div className="flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex items-center gap-4 px-4 md:gap-0 md:px-0 md:will-change-transform"
          >
            {processSteps.map((step) => (
              <Step
                key={step.number}
                step={step}
              />
            ))}
            <div className="w-[20vw] shrink-0" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
}
