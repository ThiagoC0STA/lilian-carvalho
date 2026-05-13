import type { ProcessStep } from "./data";
import { cn } from "@/lib/cn";

interface StepProps {
  step: ProcessStep;
}

export function Step({ step }: StepProps) {
  return (
    <article className="relative w-[88vw] sm:w-[75vw] lg:w-[60vw] xl:w-[48vw] shrink-0 snap-center px-0 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/90 sm:bg-neutral-950/40 sm:backdrop-blur-xl p-6 sm:p-14 lg:p-20 h-[75vh] sm:h-[70vh] flex flex-col justify-between group transition-all duration-700 hover:bg-neutral-900/60 hover:border-violet-500/20">

        {/* Subtle glow — `blur-3xl` is a GPU killer on mobile, gate to ≥sm */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full sm:blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-violet-500/10 transition-colors duration-700 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <h3 className="font-serif font-bold tracking-tight text-3xl sm:text-6xl text-white leading-tight max-w-[70%]">
              {step.title}
            </h3>
            <span
              className={cn(
                "font-sans font-black text-[4rem] sm:text-[10rem] leading-none select-none",
                "text-transparent group-hover:text-violet-500/5 transition-colors duration-700"
              )}
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              {step.number}
            </span>
          </div>

          <p className="font-sans text-[17px] sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mb-7 sm:mb-12">
            {step.description}
          </p>
        </div>

        <div className="relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6 sm:mb-10" />
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            {step.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className="flex items-start gap-4 font-sans text-[15px] sm:text-base text-neutral-300"
              >
                <span className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
