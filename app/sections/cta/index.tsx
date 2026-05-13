"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";

export function Cta() {
  return (
    <section
      id="contato"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Creative Aurora Background */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-violet-600/20 blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-amber-500/15 blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-purple-600/20 blur-[140px] mix-blend-screen"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10 w-full flex flex-col items-center text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold tracking-tight text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.02] max-w-4xl"
        >
          Tem dado parado virando custo?
          <br />
          <span className="text-white/60">Vamos conversar.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center mt-16 gap-2"
        >
          <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.3em] text-white/40">
            Resposta em até 24h em dias úteis
          </p>
          <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.3em] text-white/20">
            Curitiba - PR
          </p>
        </motion.div>
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
