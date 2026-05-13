"use client";

import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";
import { cn } from "@/lib/cn";

export function Cta() {
  // Reveal the content block once it enters the viewport. Replaces the
  // three `motion.div whileInView` blocks (heading, buttons, footer line).
  const [contentRef, contentRevealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-15% 0px",
  });

  // Decorative ambient layer — only painted on desktop. Mobile gets a
  // single static gradient because the rAF-free CSS keyframes are still
  // 5+ promoted layers, which Android Chrome / iOS Safari hate.
  const [ambientRef, ambientVisible] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "0px 0px -10%",
    once: false,
  });
  const mobilePerformanceMode = useMobilePerformanceMode();
  const showAmbient = ambientVisible && !mobilePerformanceMode;
  const radarDelays = [0, 2, 4, 6];

  return (
    <section
      ref={ambientRef}
      id="contato"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Mobile static ambient — paint-once gradient instead of 4+ rAF loops */}
      {mobilePerformanceMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1.2px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%)",
          }}
        />
      )}

      {/* Layer 1: fine dot grid drifting forward — CSS keyframe (no Motion) */}
      {showAmbient && (
        <div
          aria-hidden="true"
          className="absolute -inset-16 pointer-events-none cta-bg-drift-1"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1.2px)",
            backgroundSize: "44px 44px",
          }}
        />
      )}

      {/* Layer 2: bigger sparse dots — CSS keyframe (no Motion) */}
      {showAmbient && (
        <div
          aria-hidden="true"
          className="absolute -inset-32 pointer-events-none cta-bg-drift-2"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1.4px, transparent 1.6px)",
            backgroundSize: "120px 120px",
          }}
        />
      )}

      {/* Radar pulse rings expanding from center — CSS keyframe (no Motion) */}
      {showAmbient && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {radarDelays.map((delay) => (
            <div
              key={delay}
              className="absolute h-[28vw] w-[28vw] sm:h-[20vw] sm:w-[20vw] rounded-full border border-white/15 cta-radar-ring"
              style={{ "--radar-delay": `${delay}s` } as React.CSSProperties}
            />
          ))}
          <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-[0_0_24px_rgba(255,255,255,0.4)]" />
        </div>
      )}

      {/* Static center dot on mobile — keeps the visual anchor without rAF */}
      {mobilePerformanceMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-[0_0_24px_rgba(255,255,255,0.4)]" />
        </div>
      )}

      {/* Vignette to anchor the content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.9) 85%, #0a0a0a 100%)",
        }}
      />

      {/* Scan line — CSS keyframe (no Motion) */}
      {showAmbient && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent pointer-events-none cta-scanline"
        />
      )}

      <div
        ref={contentRef}
        className={cn(
          "relative mx-auto max-w-6xl px-6 z-10 w-full flex flex-col items-center text-center reveal-up",
          contentRevealed && "is-visible",
        )}
      >
        <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.02] max-w-4xl">
          Tem dado parado virando custo?
          <br />
          <span className="text-white/60">Vamos conversar.</span>
        </h2>

        <div
          style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          className={cn(
            "mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 reveal-up",
            contentRevealed && "is-visible",
          )}
        >
          <CtaButton
            href="mailto:liliancarvalhomkt@gmail.com"
            icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}
            label="liliancarvalhomkt@gmail.com"
            primary
          />
          <CtaButton
            href="https://www.linkedin.com/in/lilian-carvalho-95b0093b8/"
            icon={<LinkedinGlyph />}
            label="LinkedIn"
            external
          />
          <CtaButton
            href="https://wa.me/554197441412"
            icon={<MessageCircle className="h-4 w-4" strokeWidth={1.5} />}
            label="WhatsApp"
            external
          />
        </div>

        <div
          style={{ "--reveal-delay": "600ms" } as React.CSSProperties}
          className={cn(
            "flex flex-col items-center mt-16 gap-2 reveal-up",
            contentRevealed && "is-visible",
          )}
        >
          <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.3em] text-white/40">
            Resposta em até 24h em dias úteis
          </p>
          <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.3em] text-white/20">
            Curitiba - PR
          </p>
        </div>
      </div>
    </section>
  );
}

interface CtaButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  external?: boolean;
}

function LinkedinGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function CtaButton({ href, icon, label, primary, external }: CtaButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={
        primary
          ? "group inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-4 font-sans text-sm hover:bg-foreground/90 transition-colors"
          : "group inline-flex items-center gap-3 rounded-full border border-border text-foreground px-6 py-4 font-sans text-sm hover:border-foreground/40 transition-colors"
      }
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
    </a>
  );
}
