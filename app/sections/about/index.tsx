"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

export function About() {
  const [imageRef, imageRevealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-15% 0px",
  });
  const [copyRef, copyRevealed] = useRevealOnScroll<HTMLDivElement>({
    rootMargin: "-15% 0px",
  });

  return (
    <section id="sobre" className="relative w-full bg-background py-16 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <div
            ref={imageRef}
            className={cn("relative reveal-up", imageRevealed && "is-visible")}
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-neutral-900/40">
              <Image
                src="/momoi.png"
                alt="Lilian Carvalho"
                fill
                priority
                quality={100}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />
            </div>
          </div>

          <div
            ref={copyRef}
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className={cn(
              "flex flex-col justify-center reveal-up",
              copyRevealed && "is-visible",
            )}
          >
            <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-6xl text-white leading-[1.05] mb-8">
              A mente por trás da estratégia.
            </h2>

            <div className="space-y-6 font-sans text-lg sm:text-xl text-neutral-400 font-light leading-relaxed">
              <p>
                Trabalho com dados porque os números não mentem, mas o verdadeiro desafio é transformar todo esse volume de informações em <strong className="text-white font-medium">ação e lucro líquido</strong>.
              </p>
              <p>
                Como especialista em performance e growth, meu objetivo não é apenas rodar campanhas, mas sim arquitetar um ecossistema onde cada etapa da jornada do usuário é rastreada, compreendida e altamente otimizada.
              </p>
              <p>
                Acredito na elegância da eficiência: um design focado em conversão, dados extremamente limpos e processos maduros que escalam negócios sem inflar o caos da operação.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
              <span className="rounded-full border border-violet-500/20 bg-violet-500/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-violet-200 sm:backdrop-blur-md transition-all duration-300 hover:bg-violet-500/10 hover:border-violet-500/30 hover:scale-105 cursor-default">
                Analítica
              </span>
              <span className="rounded-full border border-white/5 bg-white/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-neutral-300 sm:backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-default">
                Estratégica
              </span>
              <span className="rounded-full border border-white/5 bg-white/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-neutral-300 sm:backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-default">
                Orientada a ROI
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
