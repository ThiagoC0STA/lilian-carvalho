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
        <div className="pointer-events-none fixed inset-0 z-50 bg-grain mix-blend-overlay" />
        
        {/* Subtle glowing ambient lights in the background */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] h-[50vh] w-[50vw] rounded-full bg-violet/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[40vh] w-[40vw] rounded-full bg-magenta/10 blur-[100px]" />
          <div className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vw] rounded-full bg-amber/5 blur-[120px]" />
        </div>

        <SmoothScroll>{children}</SmoothScroll>
        <NavFloating />
      </body>
    </html>
  );
}
