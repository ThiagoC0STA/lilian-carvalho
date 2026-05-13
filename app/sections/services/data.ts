import {
  TrendingUp,
  Target,
  LayoutDashboard,
  Cpu,
  MousePointerClick,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ChartType = "line" | "bar" | "dashboard" | "nodes" | "wireframe" | "pulse";

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  chartType: ChartType;
}

export const services: ServiceCard[] = [
  {
    number: "01",
    title: "Tráfego pago",
    description: "Meta Ads e Google Ads. Estrutura de conta, escala, otimização contínua.",
    icon: Target,
    chartType: "bar",
  },
  {
    number: "02",
    title: "Performance e KPIs",
    description: "Leitura de funil, custo por etapa, ROAS real. Métricas que importam, não vanity.",
    icon: TrendingUp,
    chartType: "line",
  },
  {
    number: "03",
    title: "Dashboards executivos",
    description: "Relatórios que o decisor lê em 30 segundos e age. Sem ruído, só sinal.",
    icon: LayoutDashboard,
    chartType: "dashboard",
  },
  {
    number: "04",
    title: "Automação",
    description: "SQL e Python aplicados a coleta, limpeza e alertas de campanha.",
    icon: Cpu,
    chartType: "nodes",
  },
  {
    number: "05",
    title: "Landing pages",
    description: "Páginas focadas em conversão, do brief ao A/B test. Cada pixel com propósito.",
    icon: MousePointerClick,
    chartType: "wireframe",
  },
  {
    number: "06",
    title: "IA aplicada",
    description: "GPT, automações e workflows que escalam o trabalho criativo e analítico.",
    icon: Sparkles,
    chartType: "pulse",
  },
];
