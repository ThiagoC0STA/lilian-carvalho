import {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Scissors,
  Coffee,
  Store,
  Diamond,
  Laptop,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface Segment {
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const segments: Segment[] = [
  {
    label: "Gastronomia",
    description: "CPA por reserva, LTV de salão e otimização de delivery.",
    icon: Utensils,
    color: "from-violet-400/20 to-violet-400/5",
  },
  {
    label: "Varejo & E-commerce",
    description: "Escala de ROAS, catálogo dinâmico e recuperação de carrinho.",
    icon: ShoppingBag,
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    label: "Saúde & Clínicas",
    description: "Geração de leads qualificados para procedimentos de alto ticket.",
    icon: Stethoscope,
    color: "from-amber-400/20 to-amber-400/5",
  },
  {
    label: "Estética",
    description: "Funis de agendamento focados em CAC baixo e retenção.",
    icon: Scissors,
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    label: "Marcas Premium",
    description: "Posicionamento digital sem perder a exclusividade da marca.",
    icon: Diamond,
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    label: "Infoprodutos",
    description: "Lançamentos e perpétuo com foco em ROI e escala agressiva.",
    icon: Laptop,
    color: "from-purple-500/20 to-purple-500/5",
  },
];
