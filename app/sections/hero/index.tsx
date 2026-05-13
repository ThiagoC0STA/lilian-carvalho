"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";
import { HeroStaticBg } from "./static-bg";

const R3FScene = dynamic(() => import("./r3f-scene"), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const showCardRef = useRef<boolean>(false);
  const reducedMotion = useReducedMotion();
  const mobilePerformanceMode = useMobilePerformanceMode();

  // Pause the R3F render loop once the hero scrolls out of view (desktop only;
  // mobile uses a static fallback so there's no WebGL to pause).
  const [sceneActive, setSceneActive] = useState(true);
  useEffect(() => {
    if (mobilePerformanceMode) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mobilePerformanceMode]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Typography parallax — desktop only. On mobile we keep typography static
  // (no per-frame scroll-driven transforms) so the only scroll listener cost
  // is the showCard threshold check below.
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    mobilePerformanceMode ? [1, 1] : [1, 0],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 0.3],
    mobilePerformanceMode ? ["0%", "0%"] : ["0%", "-100%"],
  );
  const copyScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    mobilePerformanceMode ? [1, 1] : [1, 1.1],
  );

  const [showCard, setShowCard] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgressRef.current = latest;
    // Only call setState when the threshold is actually crossed — React would
    // bail on identical values, but skipping the call entirely avoids the
    // function call overhead on every scroll frame.
    const next = latest > 0.15 && latest < 0.95;
    if (next !== showCardRef.current) {
      showCardRef.current = next;
      setShowCard(next);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* Background layer — R3F on desktop, static CSS gradient on mobile.
            The R3F scene was the dominant mobile perf cost even with all the
            tuning (still 30fps of matrix math + WebGL composite per frame).
            Static CSS background = zero JS-per-frame, smooth native scroll. */}
        <div className="absolute inset-0" aria-hidden="true">
          {reducedMotion ? null : mobilePerformanceMode ? (
            <HeroStaticBg />
          ) : (
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
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform"
          style={{ opacity: copyOpacity, y: copyY, scale: copyScale }}
        >
          <motion.h1
            className="font-serif uppercase font-bold text-foreground leading-[0.9] tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(3.75rem, 12vw, 12rem)",
            }}
          >
            Lilian
            <br />
            Carvalho
          </motion.h1>

          <motion.p
            className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-400 mt-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Analista de Dados &bull; Performance &bull; Mídia
          </motion.p>
        </motion.div>

        {/* --- GLASSMORPHISM DATA CARD ---
            On mobile we drop backdrop-blur (Safari/Android GPU killer) and
            use a near-opaque background. */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              key="hero-card"
              initial={{ opacity: 0, y: 150, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -150, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center z-40 px-6 pointer-events-none"
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
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
