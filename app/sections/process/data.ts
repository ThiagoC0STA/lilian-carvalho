export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bullets: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Antes de mexer em qualquer lance, eu leio o que está acontecendo agora. Conta, funil, criativo e tracking na mesa, sem palpite. Só depois de entender o estado real é que faz sentido propor mudança.",
    bullets: [
      "Auditoria de conta e estrutura",
      "Leitura de funil ponta a ponta",
      "Mapeamento de gargalos e oportunidades",
    ],
  },
  {
    number: "02",
    title: "Estratégia",
    description:
      "Diagnóstico vira plano, plano vira hipótese testável. Cada decisão cabe em uma frase, tem um número que prova ou refuta e um prazo curto pra responder. Estratégia que não mede é achismo bem escrito.",
    bullets: [
      "Definição de KPIs reais",
      "Estrutura de campanhas e públicos",
      "Plano de criativos e tracking",
    ],
  },
  {
    number: "03",
    title: "Execução",
    description:
      "Onde a teoria encontra o pixel. Campanha estruturada, criativo no padrão, tracking limpo e landing alinhada ao anúncio. Se entrou no ar, entrou medindo, do clique à conversão.",
    bullets: [
      "Setup completo de campanhas",
      "Segmentação e criativos no ar",
      "Tracking, LP e instrumentação",
    ],
  },
  {
    number: "04",
    title: "Otimização contínua",
    description:
      "Performance não é projeto, é processo. Toda semana é leitura, ajuste e decisão: cortar o que drena, dobrar no que entrega, manter o resto em observação até virar sinal claro pra escalar.",
    bullets: [
      "Leitura semanal de dados",
      "Ajuste de lance, público, criativo",
      "Escala progressiva do que converte",
    ],
  },
];
