"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealText } from "./reveal-text";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 sm:mb-24">


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start">
          <div className="space-y-8 max-w-2xl">
            <RevealText
              text="Eu trabalho na fronteira entre dados e crescimento."
              className="font-serif font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1]"
            />

            <RevealText
              text="Onde a maioria vê planilha, eu vejo padrão. Onde vê CPA alto, eu vejo o criativo que precisa morrer e o público que ninguém testou."
              className="font-sans text-lg sm:text-xl text-muted-strong leading-relaxed"
              delay={0.2}
            />

            <RevealText
              text="Comecei na ciência do movimento humano. Hoje aplico o mesmo método em campanhas digitais: medir, ajustar, repetir até funcionar."
              className="font-sans text-lg sm:text-xl text-muted-strong leading-relaxed"
              delay={0.4}
            />

            <RevealText
              text="Meta Ads, Google Ads, SQL, Python, dashboards e IA são ferramentas. O que entrego é decisão mais inteligente."
              className="font-sans text-lg sm:text-xl text-foreground leading-relaxed"
              delay={0.6}
            />
          </div>

          <motion.aside
            style={{ y: visualY, scale: visualScale }}
            className="hidden lg:block w-72 shrink-0"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-neutral-900/40 backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)",
                }}
              />
              
              {/* Animated Data Core Visualization */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg viewBox="0 0 100 100" className="w-48 h-48 animate-[spin_40s_linear_infinite]">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#d946ef" strokeWidth="0.5" strokeDasharray="1 6" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
                  <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="#d946ef" strokeWidth="0.2" opacity="0.3" />
                </svg>
              </div>

              <div className="relative h-full w-full flex flex-col justify-between p-8">
                <div className="space-y-2">
                  <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] text-white">
                    Lilian Carvalho
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    Data & Performance
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    Curitiba, BR
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 px-2">
              <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                  Foco
                </span>
                <span className="font-serif italic text-sm text-white">
                  Alta Performance
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                  Mídia
                </span>
                <span className="font-serif italic text-sm text-white">
                  Meta / Google
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                  Analytics
                </span>
                <span className="font-serif italic text-sm text-white">
                  SQL / Python
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
