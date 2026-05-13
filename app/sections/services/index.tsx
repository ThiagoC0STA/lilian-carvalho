"use client";

import { services } from "./data";
import { ServiceCard } from "./card";

export function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 sm:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>

            <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] max-w-2xl">
              Seis frentes, um mesmo objetivo.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-400 max-w-md leading-relaxed sm:text-right">
            Cada frente conecta dado, decisão e resultado. Sozinhas funcionam.
            Juntas, escalam a sua performance ao máximo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            // Asymmetrical Bento Grid Logic
            let colSpan = "md:col-span-1";
            if (index === 0) colSpan = "md:col-span-2";
            if (index === 3) colSpan = "md:col-span-2";
            if (index === 4) colSpan = "md:col-span-2";

            return (
              <div key={service.number} className={colSpan}>
                <ServiceCard card={service} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
