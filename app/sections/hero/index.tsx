"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";
import { cn } from "@/lib/cn";

const R3FScene = dynamic(() => import("./r3f-scene"), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const showCardRef = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();
  const mobilePerformanceMode = useMobilePerformanceMode();

  // Pause the R3F render loop once the hero scrolls out of view — same on
  // mobile and desktop now that mobile also runs the R3F scene (tuned via
  // `mobilePerformanceMode`).
  const [sceneActive, setSceneActive] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Card visibility — driven by scroll position. `hasShownCard` is what lets
  // us trigger the "exit upward" CSS transition instead of just resetting to
  // the "below + invisible" initial state when the user scrolls past it.
  const [showCard, setShowCard] = useState(false);
  const [hasShownCard, setHasShownCard] = useState(false);

  // Single rAF-throttled scroll listener that replaces the entire
  // useScroll + useTransform + useMotionValueEvent stack from motion/react:
  //   • feeds `scrollProgressRef` for the R3F camera/scene
  //   • toggles the card show/exit state when the threshold is crossed
  //   • on desktop, writes CSS variables on the copy wrapper for parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const compute = () => {
      rafId = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / total));
      scrollProgressRef.current = progress;

      const next = progress > 0.15 && progress < 0.95;
      if (next !== showCardRef.current) {
        showCardRef.current = next;
        if (next) {
          setShowCard(true);
          setHasShownCard(true);
        } else {
          setShowCard(false);
        }
      }

      const copy = copyRef.current;
      if (copy) {
        const opacity = progress < 0.2 ? 1 - progress / 0.2 : 0;
        const yPct = progress < 0.3 ? -(progress / 0.3) * 100 : -100;
        const scale = progress < 0.2 ? 1 + (progress / 0.2) * 0.1 : 1.1;
        copy.style.setProperty("--copy-opacity", String(opacity));
        copy.style.setProperty("--copy-y", `${yPct}%`);
        copy.style.setProperty("--copy-scale", String(scale));
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mobilePerformanceMode]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* Background layer — R3F on every viewport. The scene tunes its
            instance count and frame-skip via `mobilePerformanceMode` so it
            stays affordable on touch devices without changing the look. */}
        <div className="absolute inset-0" aria-hidden="true">
          {reducedMotion ? null : (
            <R3FScene
              scrollRef={scrollProgressRef}
              mobilePerformanceMode={mobilePerformanceMode}
              active={sceneActive}
            />
          )}
        </div>

        {/* Ambient Overlay to darken edges and behind text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.8) 80%, rgba(5,5,5,0.95) 100%)",
          }}
        />

        {/* --- MAIN TYPOGRAPHY --- */}
        <div
          ref={copyRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center hero-copy-parallax"
        >
          <h1
            className="font-serif uppercase font-bold text-foreground leading-[0.9] tracking-tighter hero-copy-anim"
            style={{ fontSize: "clamp(3.75rem, 12vw, 12rem)" }}
          >
            Lilian
            <br />
            Carvalho
          </h1>

          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-400 mt-8 max-w-lg hero-sub-anim">
            Analista de Dados &bull; Performance &bull; Mídia
          </p>
        </div>

        {/* --- GLASSMORPHISM DATA CARD ---
            CSS-toggled: kept mounted permanently, classes drive the
            enter/exit transitions. */}
        <div
          aria-hidden={!showCard}
          className={cn(
            "absolute inset-0 flex items-center justify-center z-40 px-6 pointer-events-none hero-card",
            showCard && "is-shown",
            !showCard && hasShownCard && "is-exiting",
          )}
        >
          <div className="w-full max-w-5xl rounded-3xl border border-violet-500/20 bg-neutral-950/95 sm:bg-neutral-950/60 sm:backdrop-blur-3xl p-6 sm:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-6xl font-serif font-bold text-white mb-6 sm:mb-8 tracking-tighter">
              A ARTE DA <span className="text-violet-400 italic font-light">PERFORMANCE.</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-xl font-sans font-light tracking-wide max-w-2xl leading-relaxed">
              Não olho apenas para planilhas. Eu construo arquiteturas de dados que transformam tráfego em lucro líquido.
            </p>

            <div className="w-full h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent my-8 sm:my-10" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full font-sans text-[10px] sm:text-sm font-medium uppercase tracking-widest text-neutral-400">
              <div>
                <span className="block text-2xl sm:text-4xl text-white font-serif font-bold mb-1 sm:mb-2">ROI</span>
                Maximização
              </div>
              <div>
                <span className="block text-2xl sm:text-4xl text-white font-serif font-bold mb-1 sm:mb-2">LTV</span>
                Retenção
              </div>
              <div>
                <span className="block text-2xl sm:text-4xl text-white font-serif font-bold mb-1 sm:mb-2">CPA</span>
                Otimização
              </div>
              <div>
                <span className="block text-2xl sm:text-4xl text-white font-serif font-bold mb-1 sm:mb-2">CRO</span>
                Conversão
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
