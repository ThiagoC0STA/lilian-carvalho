import { SegmentCards } from "./pill-cloud";

export function Segments() {
  return (
    <section
      id="segments"
      className="relative w-full bg-background py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 sm:mb-24 max-w-3xl">

          <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]">
            Marcas que confiaram em estratégia, não em sorte.
          </h2>
          <p className="font-sans text-lg text-neutral-400 mt-8 leading-relaxed">
            Atuo em projetos onde o dado é cru, a operação é real e o ROI
            precisa aparecer no extrato.
          </p>
        </div>

        <SegmentCards />
      </div>
    </section>
  );
}
