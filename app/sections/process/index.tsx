import { HorizontalTrack } from "./horizontal-track";

export function Process() {
  return (
    <section id="process" className="relative w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl">

          <h2 className="font-serif font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]">
            Quatro etapas que separam tentativa de método.
          </h2>
          <p className="font-sans text-lg text-neutral-400 mt-8 leading-relaxed max-w-xl">
            Não é receita de bolo. É a estrutura que mantém a operação previsível
            quando o mercado deixa de ser.
          </p>
        </div>
      </div>

      <HorizontalTrack />
    </section>
  );
}
