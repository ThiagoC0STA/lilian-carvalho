# SPEC — Site Lilian Carvalho

**Data:** 2026-05-13
**Status:** Draft
**Pessoa:** Lilian Carvalho (Curitiba, PR)
**Stack base:** Next.js 16.2.6, React 19, Tailwind 4, TypeScript

---

## 1. Posicionamento

Site one-page de apresentação pessoal pra Lilian Carvalho, analista de dados e performance digital.

**Promessa central:** "Dados que viram decisão. Decisões que viram resultado."

Não é um portfólio de cases (ela ainda está montando o histórico). É um **manifesto visual de competência**: o site precisa convencer pelo design + clareza do que ela faz, não por logos de clientes.

### Quem é

- Analista de Dados na Numeratti
- Foco: performance digital, mídia paga, BI orientado a marketing
- Formação técnica: Educação Física (UniDomBosco) + Métricas Boss Prime (Digital Analytics)
- Localização: Curitiba, PR

### O que ela faz

- Meta Ads e Google Ads (gestão, otimização, leitura de funil)
- Análise de KPIs e construção de dashboards executivos
- Otimização de campanhas (públicos, criativos, lances)
- Automação aplicada a marketing (SQL, Python)
- Landing pages e projetos de conversão
- IA aplicada a performance digital

### Segmentos atendidos

Gastronomia, varejo, saúde, estética, lifestyle, negócios locais, marcas premium, produtos digitais, serviços.

### Contatos

- Email: liliancarvalho52@icloud.com
- LinkedIn: linkedin.com/in/liliancarvalho-95b0093b8
- WhatsApp: a confirmar (deixar placeholder)

---

## 2. Audiência e objetivo

**Público-alvo:**
- Pequenas/médias marcas buscando freelancer de performance
- Agências procurando analista parceiro
- Recrutadores avaliando perfil sênior em formação

**Ação primária (CTA):** abrir conversa por email ou WhatsApp.
**Ação secundária:** seguir no LinkedIn.

**Métrica de sucesso do site:**
- Tempo de leitura > 45s (engajamento)
- Taxa de clique no CTA > 8%
- Compartilhamento orgânico (visual diferenciado vira lembrança)

---

## 3. Identidade visual

### Direção

**Premium, escura, cinética.** Referências: Linear, Vercel, Stripe, Studio Tobias, Active Theory. Nada de "agência de marketing colorida". A escolha de design comunica que ela entende sofisticação visual, e isso é parte da venda em segmento premium.

### Paleta

```
Background base:    #0a0a0b  (preto azulado profundo)
Surface elevado:    #14141a  (cinza muito escuro)
Foreground:         #f5f5f7  (off-white)
Muted:              #6b6b75  (cinza médio)

Accent primário:    #a78bfa  (violeta elétrico)
Accent secundário:  #f97316  (âmbar performance)
Gradiente hero:     violeta → magenta → âmbar (animado em shader)
```

Tema: dark-first. Sem light mode na v1.

### Tipografia

- **Display:** Instrument Serif (italic em destaques), elegância e contraste
- **Body:** Geist Sans (já no projeto)
- **Mono:** Geist Mono (KPIs, números, detalhes técnicos)

### Tom de voz

PT-BR. Curto, direto, sem jargão vazio. Confiante sem ser arrogante. Usa números quando faz sentido. Evita "transformar pessoas em vendas" e clichês de coach.

Exemplos:
- OK: "Eu leio dados como história. E reescrevo a história até virar resultado."
- Evitar: "Sou apaixonada por ajudar marcas a alcançarem o próximo nível"

---

## 4. Arquitetura de conteúdo

One-page com 8 seções verticais + navegação flutuante.

### 4.1 Hero

- Nome grande em display serif italic (`Lilian Carvalho`)
- Subtítulo em sans: `Analista de Dados / Performance / Mídia Paga`
- Frase manifesto: `Dados que viram decisão. Decisões que viram resultado.`
- Background: shader WebGL com gradiente líquido violeta para magenta para âmbar reagindo a mouse, com partículas flutuando
- Scroll indicator minimalista
- Tag canto: `Curitiba, BR / Disponível para projetos`

### 4.2 Manifesto (Sobre)

- Texto curto de 3 parágrafos, scroll-reveal palavra por palavra
- Lateral: foto da Lilian (placeholder até receber asset) + tags (cidade, role, anos atuando)
- Tom em primeira pessoa

Texto base:
> Eu trabalho na fronteira entre dados e crescimento. Onde a maioria vê planilha, eu vejo padrão. Onde vê CPA alto, eu vejo o criativo que precisa morrer e o público que ninguém testou.
>
> Comecei na ciência do movimento humano. Hoje aplico o mesmo método em campanhas digitais: medir, ajustar, repetir até funcionar.
>
> Meta Ads, Google Ads, SQL, Python, dashboards e IA são ferramentas. O que entrego é decisão mais inteligente.

### 4.3 O que eu faço

Grid de 6 cards com motion. Cada card:
- Ícone/glyph minimalista (line icons custom, não emoji)
- Título curto
- 2 linhas de descrição
- Hover: tilt 3D + brilho seguindo cursor

**Cards:**
1. **Tráfego pago** — Meta Ads e Google Ads. Estrutura de conta, escala, otimização contínua.
2. **Performance e KPIs** — Leitura de funil, custo por etapa, ROAS real (não vanity).
3. **Dashboards executivos** — Relatórios que o decisor lê em 30 segundos e age.
4. **Automação** — SQL e Python aplicados a coleta, limpeza e alertas de campanha.
5. **Landing pages** — Páginas focadas em conversão, do brief ao A/B test.
6. **IA aplicada** — GPT, automações e workflows que escalam o trabalho criativo e analítico.

### 4.4 Stack e ferramentas

Marquee infinito horizontal com logos/nomes em duas faixas (uma indo direita, outra esquerda, velocidades diferentes).

**Tráfego e analytics:** Meta Ads, Google Ads, GA4, Google Tag Manager, Looker Studio, Hotjar
**Dados:** SQL, BigQuery, Python, Pandas, Sheets
**Conversão:** Webflow, Framer, Next.js (LPs), GTM, Stape
**IA:** ChatGPT, Claude, n8n, Zapier

### 4.5 Segmentos atendidos

Cloud animada de pills (chips) com física simples. Cada pill carrega um segmento, flutua leve, repele do cursor.

Gastronomia, Varejo, Saúde, Estética, Lifestyle, Negócios locais, Marcas premium, Produtos digitais, Serviços.

### 4.6 Processo

Timeline horizontal scroll-pinned (a seção fixa enquanto o conteúdo desliza lateral).

4 etapas:
1. **Diagnóstico** — auditoria de conta, leitura de funil, mapeamento de gargalos
2. **Estratégia** — definição de KPIs, estrutura de campanhas, plano de criativos
3. **Execução** — implementação, segmentação, criativos, tracking, LP se necessário
4. **Otimização contínua** — leitura semanal, ajuste de lance/público/criativo, escala

Cada etapa: número grande, título, descrição, 2 ou 3 bullets de entregáveis.

### 4.7 CTA / Contato

Seção full-bleed com gradiente líquido em fundo (mesmo shader do hero, parado ou em loop lento).

Conteúdo central:
- Headline grande: `Tem dado parado virando custo? Vamos conversar.`
- 3 botões: Email, LinkedIn, WhatsApp
- Linha sutil: `Resposta em até 24h em dias úteis.`

### 4.8 Footer

Mínimo: nome, cidade, ano corrente, links rápidos (LinkedIn, email). Easter egg opcional: pequeno gráfico animado de linha indo pra cima no canto.

---

## 5. Animações e motion

### Princípios

- **Propósito antes de espetáculo:** toda animação reforça hierarquia ou narrativa
- **60fps mobile:** se não roda fluido no celular médio, é cortada ou simplificada
- **Respeita `prefers-reduced-motion`:** versão estática completa funcional
- **Sem auto-play barulhento:** nada gira, pulsa ou pisca sem motivo

### Catálogo

| Animação | Onde | Tech |
|---|---|---|
| Smooth scroll com inércia | Site todo | Lenis |
| Shader gradient liquid | Hero, CTA | React Three Fiber + GLSL custom |
| Partículas flutuantes ambiente | Hero | R3F Points + custom shader |
| Reveal por palavra/letra | Manifesto, headlines | Framer Motion + SplitText helper |
| Tilt 3D nos cards | Seção "O que eu faço" | Framer Motion (mouse-driven) |
| Glow do cursor nos cards | Seção "O que eu faço" | CSS radial-gradient + JS mouse track |
| Marquee infinito 2 faixas | Stack | CSS animation + duplicação |
| Pills com física | Segmentos | Framer Motion + colisão leve, ou Matter.js se valer |
| Counter de números | (se houver KPIs reais) | Framer Motion useTransform |
| Timeline horizontal pinned | Processo | GSAP ScrollTrigger pin + scrub |
| Page intro mask | Carregamento inicial | Framer Motion exit + black overlay |
| Cursor custom (sutil) | Site todo desktop | Pequeno blend mode dot |

### Performance

- Shader é o ponto mais pesado: usar `precision mediump`, resolução pixelRatio cap 1.5, pausar quando aba inativa
- 3D só renderiza em viewport (Intersection Observer)
- Imagens via `next/image` AVIF
- Fontes via `next/font`
- Bundle target: < 250KB gzipped JS no first load

---

## 6. SEO e meta

- Title: `Lilian Carvalho — Análise de Dados e Performance Digital`
- Description: `Analista de dados focada em performance, mídia paga e otimização de campanhas. Curitiba, BR.`
- OG image: render do hero (gerar via @vercel/og)
- Schema.org Person
- Idioma: pt-BR
- Sitemap + robots.txt
- Favicon custom (monogramas LC ou ponto animado)

---

## 7. Fora do escopo (v1)

- Blog
- Cases detalhados (entram quando ela tiver autorização dos clientes)
- Multi-idioma
- Light mode
- CMS
- Formulário com captcha + email transactional (v1 abre `mailto:` e WhatsApp link direto)

---

## 8. Riscos e premissas

- **Premissa:** Lilian aprova tom da copy antes do deploy
- **Premissa:** foto e logo (se houver) chegam até início do dev
- **Risco:** shader pode pesar em mobile baixo; mitigação: fallback CSS animated gradient
- **Risco:** copywriting pode soar genérico; mitigação: validar com a Lilian seções 4.1, 4.2 e 4.7 antes de finalizar
- **Risco:** sem cases reais, seção de números fica vazia; mitigação: omitir essa seção até ter dado real (não inventar)

---

## 9. Critério de pronto

- [ ] Lighthouse desktop maior ou igual a 95 em todas categorias
- [ ] Lighthouse mobile maior ou igual a 85
- [ ] Funciona com motion reduzido
- [ ] Sem CLS visível
- [ ] CTAs funcionais (mailto, links externos)
- [ ] Lilian aprovou copy final
- [ ] Deploy em domínio próprio ou subdomínio Vercel
