import type { Metadata } from "next";
import { Instrument_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./providers/smooth-scroll";
import { NavFloating } from "./components/nav-floating";

const instrumentSans = Instrument_Sans({
  variable: "--font_instrumentsans",
  subsets: ["latin"],
});



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://liliancarvalho.vercel.app"),
  title: "Lilian Carvalho — Análise de Dados e Performance Digital",
  description:
    "Analista de dados focada em performance, mídia paga e otimização de campanhas. Meta Ads, Google Ads, dashboards, SQL e IA aplicada. Curitiba, BR.",
  applicationName: "Lilian Carvalho",
  authors: [{ name: "Lilian Carvalho" }],
  creator: "Lilian Carvalho",
  keywords: [
    "análise de dados",
    "performance digital",
    "mídia paga",
    "Meta Ads",
    "Google Ads",
    "dashboards",
    "otimização de campanhas",
    "Curitiba",
  ],
  openGraph: {
    title: "Lilian Carvalho — Análise de Dados e Performance Digital",
    description: "Dados que viram decisão. Decisões que viram resultado.",
    url: "/",
    siteName: "Lilian Carvalho",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lilian Carvalho — Análise de Dados",
    description: "Dados que viram decisão. Decisões que viram resultado.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSans.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground relative">
        {/* Grain overlay — desktop only. mix-blend-overlay + an SVG turbulence
            pattern covering the entire viewport forces the browser to composite
            the whole page every frame, which is one of the heaviest things you
            can ask a mobile GPU to do. Drop it on touch devices. */}
        <div className="pointer-events-none fixed inset-0 z-50 bg-grain mix-blend-overlay hidden sm:block" />

        {/* Ambient ortho-lights — desktop only.
            `blur-[120px]` on a 50vh × 50vw fixed-position element is essentially
            a full-screen Gaussian blur per orb. Three of those, repainted every
            time anything scrolls, is what was making mobile feel "embaçado e
            travado". Mobile gets a single static radial gradient (rendered once,
            no re-paint cost). */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden hidden sm:block">
          <div className="absolute -top-[20%] -left-[10%] h-[50vh] w-[50vw] rounded-full bg-violet/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[40vh] w-[40vw] rounded-full bg-magenta/10 blur-[100px]" />
          <div className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vw] rounded-full bg-amber/5 blur-[120px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[-1] sm:hidden"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(245,158,11,0.04) 0%, transparent 55%)",
          }}
        />

        <SmoothScroll>{children}</SmoothScroll>
        <NavFloating />
      </body>
    </html>
  );
}
