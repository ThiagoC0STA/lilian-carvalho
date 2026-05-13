import { Hero } from "./sections/hero";
import { Manifesto } from "./sections/manifesto";
import { Services } from "./sections/services";
import { Stack } from "./sections/stack";
import { Segments } from "./sections/segments";
import { Process } from "./sections/process";
import { About } from "./sections/about";
import { Cta } from "./sections/cta";
import { Footer } from "./sections/footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <About />
      <Manifesto />
      <Services />
      <Stack />
      <Segments />
      <Process />
      <Cta />
      <Footer />
    </main>
  );
}
