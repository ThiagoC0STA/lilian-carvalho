import { Marquee } from "./marquee";
import { stackRowOne, stackRowTwo } from "./data";

export function Stack() {
  return (
    <section
      id="stack"
      className="relative w-full bg-background py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 mb-16 sm:mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>

            <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] max-w-2xl">
              Ferramentas que viraram extensão das mãos.
            </h2>
          </div>
          <p className="font-sans text-base text-neutral-400 max-w-md leading-relaxed">
            Aprender ferramenta é fácil. Saber quando NÃO usar é o que separa
            consultor de operador.
          </p>
        </div>
      </div>

      <div className="space-y-10 sm:space-y-14">
        <Marquee items={stackRowOne} direction="left" durationSeconds={45} />
        <Marquee items={stackRowTwo} direction="right" durationSeconds={55} />
      </div>
    </section>
  );
}
