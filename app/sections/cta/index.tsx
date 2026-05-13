"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";

export function Cta() {
  return (
    <section
      id="contato"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Layer 1: fine dot grid drifting forward */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none will-change-[background-position]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1.2px)",
          backgroundSize: "44px 44px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "44px 44px"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2: bigger sparse dots drifting opposite direction for parallax depth */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none will-change-[background-position]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1.4px, transparent 1.6px)",
          backgroundSize: "120px 120px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "-120px 120px"] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* Radar pulse rings expanding from center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[0, 2, 4, 6].map((delay) => (
          <motion.div
            key={delay}
            className="absolute h-[28vw] w-[28vw] sm:h-[20vw] sm:w-[20vw] rounded-full border border-white/15"
            animate={{ scale: [0.2, 3.2], opacity: [0.35, 0] }}
            transition={{
              duration: 8,
              delay,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
        <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-[0_0_24px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Vignette to anchor the content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.9) 85%, #0a0a0a 100%)",
        }}
      />

      {/* Scan line drifting top → bottom */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent pointer-events-none"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

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
