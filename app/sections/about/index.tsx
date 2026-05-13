"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMobilePerformanceMode } from "@/lib/use-mobile-performance-mode";

export function About() {
  const mobilePerformanceMode = useMobilePerformanceMode();

  // Animating `filter: blur(...)` forces paint+composite work every frame —
  // brutal on mobile GPUs. Strip the blur step on mobile and rely on
  // opacity/transform only (still feels smooth with the long ease curve).
  const imageInitial = mobilePerformanceMode
    ? { opacity: 0, y: 60, scale: 0.95 }
    : { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" };
  const imageWhileInView = mobilePerformanceMode
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

  const copyInitial = mobilePerformanceMode
    ? { opacity: 0, y: 40 }
    : { opacity: 0, y: 40, filter: "blur(8px)" };
  const copyWhileInView = mobilePerformanceMode
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <section id="sobre" className="relative w-full bg-background py-16 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={imageInitial}
            whileInView={imageWhileInView}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
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
          </motion.div>

          <motion.div
            initial={copyInitial}
            whileInView={copyWhileInView}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
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

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-wrap gap-3 sm:gap-4"
            >
               <motion.div whileHover={{ scale: 1.05 }} className="rounded-full border border-violet-500/20 bg-violet-500/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-violet-200 backdrop-blur-md transition-colors hover:bg-violet-500/10 hover:border-violet-500/30 cursor-default">
                 Analítica
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} className="rounded-full border border-white/5 bg-white/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-neutral-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:border-white/20 cursor-default">
                 Estratégica
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} className="rounded-full border border-white/5 bg-white/5 px-6 py-3 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-neutral-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:border-white/20 cursor-default">
                 Orientada a ROI
               </motion.div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
