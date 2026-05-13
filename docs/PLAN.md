# PLAN — Site Lilian Carvalho

**Data:** 2026-05-13
**Acompanha:** `docs/SPEC.md`
**Stack base já instalada:** Next.js 16.2.6, React 19.2.4, Tailwind 4, TypeScript

---

## 1. Stack de animação a adicionar

| Lib | Função | Por que essa |
|---|---|---|
| `lenis` | Smooth scroll com inércia | Padrão da indústria, leve, sem dependência |
| `motion` (Framer Motion v12) | Animações declarativas, scroll-linked, tilt, reveal | Mantida pela Vercel agora, integra direto com React 19 |
| `gsap` + `@gsap/react` | Timeline complexa, ScrollTrigger pin/scrub | Único confortável pra horizontal pinned scroll |
| `three` + `@react-three/fiber` + `@react-three/drei` | Cena 3D do hero | R3F é o padrão de Three.js em React |
| `clsx` ou `tailwind-merge` | Composição condicional de classes | Conveniência |
| `lucide-react` | Ícones base (line icons) | Set consistente, tree-shake bom |

**Não vou adicionar agora (avaliar depois se necessário):**
- Matter.js (pills com física): tentar primeiro com Framer Motion mouse-repel; se ficar pobre, escalar
- Spline: cena de hero será shader custom, mais leve e único; Spline pesa
- next/dynamic com SSR off só onde precisar (R3F, Lenis)

### Decisão de licença GSAP

GSAP 3.13+ está MIT desde 2025 (Webflow assumiu), incluindo ScrollTrigger e SplitText. Sem custo, sem clube. Usar versão 3.13 ou superior.

---

## 2. Estrutura de arquivos alvo

```
app/
  layout.tsx                  → fontes, metadata, providers
  page.tsx                    → orquestra seções
  globals.css                 → tokens CSS, base
  providers/
    smooth-scroll.tsx         → Lenis wrapper (client)
    reduced-motion.tsx        → context global
  sections/
    hero/
      index.tsx               → composição
      shader-scene.tsx        → R3F canvas + shader liquid
      shader.glsl.ts          → fragment + vertex (string template)
      particles.tsx           → R3F Points
      copy.tsx                → texto e CTAs
    manifesto/
      index.tsx
      reveal-text.tsx         → split por palavra
    services/
      index.tsx
      card.tsx                → tilt + glow
      data.ts
    stack/
      index.tsx
      marquee.tsx
      data.ts
    segments/
      index.tsx
      pill-cloud.tsx          → motion repulse
      data.ts
    process/
      index.tsx
      horizontal-track.tsx    → GSAP pin
      step.tsx
      data.ts
    cta/
      index.tsx
    footer/
      index.tsx
  components/
    nav-floating.tsx
    cursor.tsx
    section-heading.tsx
    button.tsx
  lib/
    use-mouse-pos.ts
    use-reduced-motion.ts
    cn.ts                     → clsx + twMerge
  styles/
    tokens.css                → CSS vars (cores, easings)

docs/
  SPEC.md
  PLAN.md
public/
  fonts/                      → se hostar Instrument Serif local
  og.png                      → fallback OG
  lilian.jpg                  → quando chegar foto
```

---

## 3. Fases de execução

### Fase 0 — Setup (30 min)

- Limpar `app/page.tsx` boilerplate
- Atualizar `app/layout.tsx`: metadata pt-BR, fontes (Geist + Instrument Serif + Geist Mono via `next/font`)
- Criar tokens CSS em `app/styles/tokens.css`
- Instalar deps: `npm i lenis motion gsap @gsap/react three @react-three/fiber @react-three/drei clsx tailwind-merge lucide-react`
- Instalar types: `npm i -D @types/three`
- Criar `lib/cn.ts`
- Atualizar `tailwind.config` (Tailwind 4 usa CSS-first; basta CSS vars no `globals.css`)

**Gate:** `npm run dev` sobe limpo, página vazia com fundo escuro e título "Lilian Carvalho" em Instrument Serif.

### Fase 1 — Esqueleto (1h)

- Criar todas pastas de `sections/` com `index.tsx` retornando placeholder
- Wire em `app/page.tsx`
- Layout responsivo base (max-width container, padding)
- `components/nav-floating.tsx` com âncoras
- Footer básico

**Gate:** scroll mostra 8 blocos placeholder, nav âncora funciona, sem JS pesado ainda.

### Fase 2 — Smooth scroll + Reduced motion (30 min)

- `providers/smooth-scroll.tsx` com Lenis (client component, `next/dynamic`)
- `lib/use-reduced-motion.ts` lendo media query
- Documentar padrão: toda animação consulta esse hook

**Gate:** scroll com inércia perceptível, OK em mobile, OK em `prefers-reduced-motion: reduce`.

### Fase 3 — Hero shader (3h, o coração visual)

- Criar `sections/hero/shader-scene.tsx`:
  - `<Canvas>` R3F fullscreen com `<ShaderPlane />` em `<OrthographicCamera>`
  - Fragment shader: simplex noise 3D domain warping, três cores (violeta `#a78bfa`, magenta `#d946ef`, âmbar `#f97316`) misturadas via noise
  - Uniforms: `uTime`, `uMouse`, `uResolution`
  - Pixel ratio cap 1.5, pausa via `useFrame` quando hidden
- `particles.tsx`: 800 pontos com size atenuado, drift lento
- `copy.tsx`: nome em Instrument Serif italic 12vw, subtítulo, manifesto, scroll cue
- Reveal inicial em sequência (mascara preta dissolve, cada linha sobe)

**Gate:** hero perde fôlego ninguém. Roda 60fps no Macbook M1; 30fps+ em Android médio (Moto G).

### Fase 4 — Manifesto + reveals (1h)

- `reveal-text.tsx`: helper que pega texto, split em palavras com `useInView`
- Padrão: cada palavra anima `opacity 0 → 1` + `y 12px → 0`, stagger 30ms
- Foto da Lilian em coluna lateral com leve parallax (Framer `useScroll`)

**Gate:** texto revela ao entrar na viewport, lateral parallax sutil.

### Fase 5 — Services cards com tilt (1.5h)

- `card.tsx`:
  - Tilt baseado em `useMotionValue` + `useTransform` (mouse pos relativa ao card)
  - Glow: `<div>` absolute com `background: radial-gradient(circle at var(--mx) var(--my), accent/20%, transparent)`, mx/my atualizados via `style` inline
  - Border gradient sutil quando hover
  - 6 cards em grid 3x2 desktop, 1 coluna mobile

**Gate:** hover sobre card desktop dá sensação de objeto 3D leve; mobile mostra cards estáticos.

### Fase 6 — Stack marquee (30 min)

- Duas faixas horizontais, uma `animation: marquee 30s linear infinite`, outra reversa 45s
- Conteúdo duplicado pra loop sem corte
- Pause on hover desktop

**Gate:** loop suave, sem flash no wrap.

### Fase 7 — Segments pills (1h)

- Lista de 9 pills, posições iniciais espalhadas
- Cada pill: `motion.div` com float idle (`y` senoidal lento via `useTime`)
- Mouse proximity: empurra a pill na direção oposta ao cursor (vetor distância)
- Sem física real, só repulsão simples

**Gate:** cloud parece viva, repele do mouse, não bagunça layout em mobile (mobile mostra grid estático).

### Fase 8 — Process timeline pinned (2h)

- `horizontal-track.tsx`:
  - Container alto (~400vh)
  - GSAP `useGSAP` + `ScrollTrigger` com `pin: true`, `scrub: 1`
  - Track horizontal traduzindo `x` conforme scroll progress
- 4 cards `step.tsx` lado a lado
- Indicador de progresso no topo (barra fina)

**Gate:** pin trava a seção, scroll mexe horizontal, sai do pin no momento certo.

### Fase 9 — CTA + footer (45 min)

- CTA: shader rodando em loop lento atrás, headline grande, 3 botões
- WhatsApp link `wa.me/<numero>` (placeholder até confirmar)
- Footer minimal

**Gate:** clique em email abre mailto, LinkedIn abre nova aba.

### Fase 10 — Polimento (2h)

- Cursor custom desktop (dot 8px com `mix-blend-mode: difference`)
- Nav flutuante destaca seção atual via `IntersectionObserver`
- Page intro: black overlay com nome dissolvendo, dura 800ms
- Easter egg footer
- SEO: metadata final, sitemap, robots, OG via `@vercel/og`
- Lighthouse audit, ajustes finais

**Gate:** abre o site, fecha, abre de novo, e a sensação é "isso aqui é caro".

### Fase 11 — Deploy (15 min)

- Vercel via CLI ou GitHub
- Domínio: subdomínio Vercel primeiro, custom domain quando definido
- Verificar OG image
- Verificar mobile real

---

## 4. Ordem de implementação otimizada

```
0 → 1 → 2 → 3 (hero é o teste de viabilidade do conceito)
    → 4, 5, 6, 7 em qualquer ordem (independentes)
    → 8 (mais arriscado, deixar perto do fim)
    → 9 → 10 → 11
```

Se a Fase 3 (shader) não der o look que vendemos no SPEC, **paramos e reavaliamos** antes de seguir. É o componente que justifica todo o conceito.

---

## 5. Verificações por fase

Cada fase entrega um commit com:
- Funcionalidade do gate atendida
- `npm run lint` limpo
- Build (`npm run build`) verde
- Smoke test manual em desktop + mobile (Chrome devtools)

---

## 6. Decisões técnicas registradas

- **R3F over puro Three.js:** integra com React lifecycle, devtools, e Drei dá helpers grátis
- **Lenis over Locomotive:** Locomotive está abandonado, Lenis é mantido pelo Studio Freight
- **GSAP só onde Framer Motion não cobre bem:** pin + scrub horizontal é dor em Framer Motion; GSAP resolve em 10 linhas
- **Tailwind 4 CSS-first:** sem `tailwind.config.ts`, tokens via `@theme` no CSS
- **Sem state manager global:** props + context bastam, página é estática-ish
- **Sem CMS:** copy mora em arquivos `data.ts` por seção, editar é trocar string

---

## 7. O que precisa do Luciano/Lilian antes do dev

- [ ] Foto da Lilian (qualquer formato, eu trato)
- [ ] WhatsApp pra link (ou confirmar que pula esse botão)
- [ ] Aprovação do tom da copy do Hero, Manifesto e CTA (seções 4.1, 4.2, 4.7 do SPEC)
- [ ] Decisão de domínio (subdomínio Vercel `liliancarvalho.vercel.app` na v1?)
- [ ] Logo/monograma se ela tiver, senão crio um simples (ponto + linha minimalista)

---

## 8. Estimativa total

| Fase | Horas |
|---|---|
| 0 Setup | 0.5 |
| 1 Esqueleto | 1.0 |
| 2 Smooth scroll | 0.5 |
| 3 Hero shader | 3.0 |
| 4 Manifesto | 1.0 |
| 5 Services | 1.5 |
| 6 Stack | 0.5 |
| 7 Segments | 1.0 |
| 8 Process | 2.0 |
| 9 CTA + Footer | 0.75 |
| 10 Polimento | 2.0 |
| 11 Deploy | 0.25 |
| **Total** | **~14h** |

Distribuído em 2 a 3 sprints de meio período, ou 2 dias cheios focados.

---

## 9. Próximo passo

Quando Luciano aprovar SPEC + PLAN, começamos pela **Fase 0** ou pela **Fase 3** (hero shader) como protótipo isolado, pra travar o look antes do resto.

Recomendação: começar Fase 0 + 3 numa branch `hero-prototype`, fazer commit assim que o hero estiver "vendável", e só então sair pro restante.
