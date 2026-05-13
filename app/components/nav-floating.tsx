"use client";

import { useEffect, useState } from "react";
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

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[var(--ease-out-expo)]",
        visible
          ? "bottom-8 sm:bottom-12 opacity-100 translate-y-0"
          : "bottom-0 opacity-0 translate-y-8 pointer-events-none",
      )}
    >
      <ul className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
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
  );
}
