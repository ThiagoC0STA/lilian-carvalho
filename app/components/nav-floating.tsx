"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const sections: { id: string; label: string }[] = [
  { id: "hero", label: "Início" },
  { id: "manifesto", label: "Sobre" },
  { id: "services", label: "Serviços" },
  { id: "stack", label: "Stack" },
  { id: "segments", label: "Segmentos" },
  { id: "process", label: "Processo" },
  { id: "contato", label: "Contato" },
];

export function NavFloating() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile sheet when ESC is pressed.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* === Mobile: hamburger fab + collapsible sheet (bottom-right) === */}
      <nav
        aria-label="Navegação principal"
        className={cn(
          "sm:hidden fixed bottom-6 right-6 z-50 transition-all duration-500 ease-(--ease-out-expo)",
          visible
            ? "opacity-100 translate-y-0"
            : "translate-y-8 opacity-0 pointer-events-none",
        )}
      >
        {/* Collapsible menu sheet — anchored above the button */}
        <ul
          id="mobile-menu"
          className={cn(
            "absolute bottom-full right-0 mb-3 flex flex-col gap-1 rounded-2xl border border-white/10 bg-neutral-950/95 backdrop-blur-xl p-2 min-w-[200px] origin-bottom-right shadow-[0_12px_48px_rgba(0,0,0,0.6)] transition-all duration-300 ease-(--ease-out-expo)",
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none",
          )}
        >
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block font-sans font-semibold text-[11px] uppercase tracking-[0.2em] px-4 py-3 rounded-xl transition-colors",
                  activeId === id
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "text-muted hover:text-white hover:bg-white/5",
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="h-14 w-14 rounded-full border border-white/15 bg-neutral-950/90 backdrop-blur-xl text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform active:scale-95"
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* === Desktop: floating pill bar (bottom-center) === */}
      <nav
        aria-label="Navegação principal"
        className={cn(
          "hidden sm:block fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-(--ease-out-expo)",
          visible
            ? "bottom-12 opacity-100 translate-y-0"
            : "bottom-0 opacity-0 translate-y-8 pointer-events-none",
        )}
      >
        <ul className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block font-sans font-semibold text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-full transition-all duration-300",
                  activeId === id
                    ? "bg-white/10 text-white shadow-inner ring-1 ring-white/20"
                    : "text-muted hover:text-white hover:bg-white/5",
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
