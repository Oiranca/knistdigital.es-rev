# Informe de Auditoría de Fidelidad — knistdigital.es-rev vs Tema Original (CodeStudio)

**Fecha:** 2026-06-14 · **Actualizado:** 2026-06-14 (pasada atómica componente-por-componente añadida al final)
**Tema de referencia (ground truth):** `/Users/samuelromeroarbelo/Downloads/knitsdigital/project` — variante **CodeStudio** (`index.html` → `codestudio.jsx` + `cs-*.jsx`, `styles.css` + `variants.css`). Las variantes `aurora` / `softgrid` / `stitch` se ignoran (no son el tema activo).
**Tema bajo prueba:** Next.js en este repo — `app/*`, `app/globals.css`, `src/lib/*`.
**Método:** comparación exhaustiva en 5 carriles paralelos (color/tema, tipografía, secciones home, subpáginas, nav/footer/hover/motion), modo claro y oscuro.

> Este informe **documenta**, no corrige. Cada hallazgo lleva severidad P0–P3, ubicación `archivo:línea`, valor original vs reconstruido, impacto y recomendación.

---

## Audit Health Score

| # | Dimensión | Score | Hallazgo clave |
|---|-----------|-------|----------------|
| 1 | Accessibility | **2/4** | Modo claro: hover ghost `#a8ba53` = 2.14:1 (falla AA), CTA pistacho ~1.35:1, texto secundario degradado 6.61→4.6:1 |
| 2 | Performance | **3/4** | Animaciones usan transform/opacity, guard de reduced-motion añadido; sin problemas de layout-thrash |
| 3 | Responsive Design | **3/4** | Responsive funcional, pero escala tipográfica fluida sistemáticamente reducida (clamps mín/máx por debajo) |
| 4 | Theming | **2/4** | Dark ~95% fiel; **modo claro roto**: fondo gris frío (no beige), gradientes y CTA no invierten, hex hard-coded en 60+ sitios |
| 5 | Anti-Patterns | **3/4** | Diseño distintivo (estética IDE), sin slop genérico; pero faux-italic añadido, sombras añadidas en logos, pill de link activo inventado |
| **Total** | | **13/20** | **Aceptable — trabajo significativo necesario (banda 10–13)** |

---

## Anti-Patterns Verdict

**¿Parece generado por IA? No de forma evidente.** El diseño base es distintivo y deliberado (estética "code-studio / IDE": editor con tráfico de ventana, árbol de archivos, snippets con sintaxis, commits de git como manifiesto). Eso es mérito del tema original y la reconstrucción lo preserva en estructura.

Tells menores introducidos por la reconstrucción (no presentes en el original):
- **Faux-italic** en titulares display (`gradient-text italic`) — el original los pone rectos. Además el italic es sintético (next/font no carga el estilo italic real).
- **Sombras genéricas añadidas** a los tiles de logos del marquee (`shadow-sm/hover:shadow-md`) que el original no usa.
- **Pill de link activo** en nav (`text-kd-pistacho border`) que el original no renderiza.
- **Gradient-text** (`.gradient-text`) — es un anti-patrón clásico de IA, pero aquí **replica el `.cs-hl` del original**, así que se mantiene por fidelidad.

No hay paleta IA (cyan-on-dark, púrpura-azul), ni glassmorphism decorativo, ni card-grids vacíos. El problema no es "slop"; es **deriva de fidelidad**.

---

## Executive Summary

- **Audit Health Score: 13/20 (Aceptable)** — reafirmado tras la pasada atómica (la nueva evidencia profundiza los mismos patrones, no abre dimensiones nuevas).
- **Total de hallazgos: ~150** → primera pasada ~63 (P0:1 · P1:~27 · P2:~23 · P3:~24) **+ pasada atómica ~90** (P1:~38 · P2:~40 · P3:~13). Detalle atómico en la sección final.
- **Estado por modo:** Dark ≈ 95% fiel. **Light ≈ 65%** (la pasada atómica revela que editor/tabs/snippet se vuelven blancos en claro cuando deberían quedar oscuros, y que casi todos los radios/paddings/bordes están sistemáticamente desviados).

### Top 5 problemas críticos

1. **[P0] Scroll-reveal ausente en toda la home** — `app/page.tsx` no importa `useReveal`; el stagger de commits del manifiesto y la entrada de secciones nunca disparan. (`src/lib/useReveal.ts` existe pero está sin usar.)
2. **[P1] Modo claro: fondo, gradientes y CTA no invierten** — fondo `#f5f5f7` gris frío en vez de `#f4f1ea` beige cálido; `.gradient-text` y botón primario no cambian a la paleta lila-deep del original; hover ghost `#a8ba53` **falla WCAG AA (2.14:1)**.
3. **[P1] Regresión sistemática de escala tipográfica** — H2 de sección `clamp(34,5vw,64)`→`(28,4vw,52)`, H3 de servicio 36→24px, H3 de commit 26→18px, H2 del CTA 80→52px. La jerarquía se aplana en todas las páginas.
4. **[P1] Hero/CTA radial glows incorrectos** — posiciones cambiadas (esquinas→centro), intensidad 8–22% → 90%, sin variante light. Secciones Services/Collab pierden su fondo radial+grid dedicado y el shell glass (blur).
5. **[P1] Páginas de estado rediseñadas / contenido perdido** — 404 y gracias abandonan el bloque terminal `cs-status` (404 queda **sin botones = callejón sin salida**); cookies/privacidad pierden la estética README markdown; privacidad **omite párrafos legales** (Redsys/PayPal, AVISO LEGAL).

### Próximos pasos recomendados

Orden sugerido (detalle al final): `/colorize` (modo claro) → `/typeset` (escala) → `/animate` (reveal/typewriter/hover) → `/adapt` + `/clarify` (subpáginas y contenido legal) → `/polish`.

---

## Detailed Findings by Severity

### P0 — Blocking

- **[P0] Scroll-reveal ausente en toda la home**
  - **Location:** `app/page.tsx` (sin import de `useReveal`); ref original `codestudio.jsx:125,187`, `variants.css:336-345`, `data.jsx:158-174`.
  - **Category:** Performance / Anti-Pattern (motion) · **Mode:** both
  - **Impact:** Sin animaciones de entrada al hacer scroll; el stagger característico de commits del manifiesto (`transition … calc(.12s * var(--i))` sobre `.is-in`) nunca ocurre. La página se siente estática vs el original.
  - **Recommendation:** Importar y aplicar `useReveal` a Services y Manifesto; gatear el `is-in`/stagger. Verificar que `src/lib/useReveal.ts` use threshold `0.08`, rootMargin `-5%`, failsafe ~1600ms.
  - **Suggested command:** `/animate`

### P1 — Major (incluye fallos WCAG AA)

**Color & Theming (modo claro)**
- **[P1] Fondo claro gris frío, no beige cálido** — `app/globals.css:28` + inline en `page.tsx` (201,320,451,526,626,730…). Original `#f4f1ea` / bg-2 `#ebe7dd`; reconstruido `#f5f5f7` / `#ebebed`. Toda la identidad "papel cálido" se pierde. → `/colorize`
- **[P1] `.gradient-text` no invierte en light** — `app/globals.css:126-131`. Original light `.cs-hl` = `linear-gradient(135deg, lila-deep, turquesa-deep)`; reconstruido siempre pistacho→turquesa (baja legibilidad sobre fondo claro). → `/colorize`
- **[P1] CTA primario no cambia a lila-deep en light** — `app/page.tsx:101`. Original `.is-light .cs-btn-primary` = bg `lila-deep`, texto blanco (hover negro). Reconstruido sigue pistacho `#d2e968` ⇒ ~1.35:1, botón lavado. → `/colorize`
- **[P1] Hover ghost usa pistacho-deep en light — FALLA AA** — `app/page.tsx:109`. `#a8ba53` sobre blanco = **2.14:1** (< 4.5:1). Usar `lila-deep` o el token `--color-kd-nav-cta #6b5db8` (5.41:1). → `/colorize`
- **[P1] Texto secundario light degradado** — `app/globals.css:31`, inline `#6e6f75`. Original `#555` (6.61:1) → reconstruido 4.6:1 (apenas pasa AA). → `/colorize`
- **[P1] Hero glow opacidad inflada ~11×** — `app/page.tsx:47,53`: pistacho/turquesa al `90%`. Original `.cs-hero-bg` 8% (dark) / 22-18% (light). → `/colorize`

**Typography**
- **[P1] H2 de sección, max clamp 64→52px** — `page.tsx:211,381,462`. Original `.cs-section-head h2` `clamp(34px,5vw,64px)`. → `/typeset`
- **[P1] H2 del CTA infra-escalado 80→52px** — `page.tsx:546`. Original `.cs-cta-inner h2` `clamp(40px,6vw,80px)`, lh 1, ls -.03em. → `/typeset`
- **[P1] H3 de panel de servicio 36→24px** — `page.tsx:303`. Original `.cs-panel-head h3` 36px (móvil 26px). → `/typeset`

**Home sections (layout/motion)**
- **[P1] Hero radial glows: posición+intensidad+sin variante light** — `page.tsx:44-55` vs `variants.css:53-59,1562-1566`. Esquinas `30% 20%`/`80% 80%` y 8–22% → centro `40% 50%`/`70% 40%` y 90%. → `/colorize` + `/animate`
- **[P1] Hero full-bleed `min-h-[92vh]` en vez de bloque centrado 1320px** — `page.tsx:39` vs `variants.css:48-52` (`max-width:1320px;margin:0 auto`, sin min-height). → `/layout`
- **[P1] Services pierde fondo radial+grid dedicado** — `page.tsx:201` vs `variants.css:187-206` (lila/turquesa radials + grid 32px). Reconstruido plano. → `/layout`
- **[P1] Services pierde el shell glass** — `page.tsx:220-223` vs `variants.css:207-216` (bg-2 80%, radius 16px, padding 16px, `blur(8px)`, columnas `280px 1fr` gap 24px). Reconstruido `240px 1fr` sin bg/padding/blur. → `/layout`
- **[P1] Manifesto: stagger de reveal ausente** — `page.tsx:391-430` vs `variants.css:336-345`. Commits visibles estáticos, sin translateY ni `--i`. → `/animate`
- **[P1] Collab pierde fondo radial+grid** — `page.tsx:451-452` (igual que Services). → `/layout`
- **[P1] CTA glow: ellipse-centro en vez de circle-bottom** — `page.tsx:533-535` vs `variants.css:397-401,1569-1572` (`circle at 50% 100%`, 16% dark / 35% light, spread 50%). → `/colorize`

**Nav / Footer / Hover**
- **[P1] Toggle de tema sin rotación hover** — `PageNav.tsx:100-104`, `page.tsx:669-673`. Original `.v3-theme:hover { transform: rotate(15deg) }`. → `/animate`
- **[P1] Flecha del CTA nav no desliza en hover** — `PageNav.tsx:121`, `page.tsx:690`. Original `.v3-cta:hover .v3-cta-arrow { translateX(4px) }`. → `/animate`
- **[P1] Hover de logos del marquee incorrecto** — `page.tsx:491` vs `variants.css:381-393`. Falta grayscale(.4)→color, borde pistacho, scale 1.04, bg `#f4f1ea`→`#fff`; se añadió sombra ajena. → `/animate`
- **[P1] Pill de link activo inventado en nav** — `PageNav.tsx:82-84`. El original no tiene `.is-active`/`[aria-current]` visual (solo `aria-current` a11y). Quitar branch de color/borde o confirmar como mejora intencional. → `/critique`
- **[P1] Menú móvil rediseñado (drawer lateral vs accordion superior)** — `PageNav.tsx:154-222` vs `styles.css:2917-2962` (top-slide max-height con blur backdrop). → `/adapt`

**Subpáginas (estructura/contenido)**
- **[P1] 404: bloque terminal `cs-status` reemplazado, sin botones (callejón sin salida)** — `app/not-found.tsx` vs `cs-notfound.jsx:7-20`. Pierde panel terminal, links "Try: / · /servicios · /contacto" y los 2 CTA. → `/clarify` + `/layout`
- **[P1] Gracias: terminal `cs-status` reemplazado por hero SVG** — `app/thank-you/page.tsx` vs `cs-gracias.jsx:7-20`. Pierde "200 OK", línea "48h" y 2º CTA. → `/layout`
- **[P1] Pricing: landings pierden cuerpo JSON-editor** — `pricing/page.tsx:193-227` vs `cs-precios.jsx:121-144` (claves `"price"`,`"plazo"`,`"features":[...]`). → `/layout`
- **[P1] Pricing: fila "Código" ausente en mantenimiento Basic** — `data.ts:328-336` (7 filas vs 8 del original `cs-precios.jsx:34`). → `/clarify`
- **[P1] Team: 4→6 miembros (añadidos Oli, Samu)** — `data.ts:181-218` vs `cs-equipo.jsx:5-14`. Confirmar si intencional. → `/clarify`
- **[P1] Cookies/Privacidad: estética README markdown perdida** — `cookies/page.tsx`, `privacy/page.tsx` vs `cs-doc` (`variants.css:1991-2035`, prefijos `#`/`##`/`###`, bullets `-`). → `/layout`
- **[P1] Privacidad: párrafos legales omitidos** — faltan Redsys/PayPal (`cs-privacidad.jsx:47-48`) y un párrafo de AVISO LEGAL (`:60`). → `/clarify`

### P2 — Minor

**Typography:** faux-italic en display que el original pone recto (`page.tsx:85,549`; además italic sintético por falta de `style:['italic']` en next/font); hero H1 de subpágina `clamp(48,7vw,96)` lh .96 (verificar en services/pricing); H2 de subpágina debe ser `clamp(28,4vw,48)` (token distinto del home). → `/typeset`

**Home:** título hero margin `24px 0` (`page.tsx:79`); sub max-width 50ch / lh 1.55 (`:90`); editor radius 14px + `shadow 0 32px 80px` (`:120`); H2 services clamp; H3 panel 36px; tabs `p-8 min-h-[340px]` (`:290`); **typewriter del snippet ausente** (re-teclea por tab, cursor parpadeante — `:317-348`); snippet light debe quedar oscuro; commit grid `100px 1fr` max-w 920px + hash pistacho (`:394-409`); commit H3 26px (`:414`); CTA H2 clamp + inner max-w 800px + padding 100px; marquee mask edge-fade + radius 16px (`:472-476`); tiles 200×110px, grayscale, gap 24px (`:491-497`). → `/animate` `/layout`

**Nav/Motion:** stagger móvil `0.04s*i`/0.25s (`PageNav.tsx:198`); **`--kd-ease` mal** = `cubic-bezier(.4,0,.2,1)`, debería ser `cubic-bezier(.22,.61,.36,1)` (`globals.css:64`); nav scroll bg `/55` + `blur(28px) saturate(180%)` sin shadow + 350ms (`PageNav.tsx:48-56`); link nav duration 250ms; toggle collab hover (fill pistacho + lift) (`page.tsx:509-512`); CTA nav no debe levantar (solo `.cs-btn` levanta). → `/animate`

**Subpáginas:** services CTA con gradient extra (`:229-231`) + pistacho light sin variante olive `#5a6b18`; freelancer copy truncada (`pricing:152,155`) + badge restyle; contact labels español `nombre/mensaje` vs `name/message`, success inline en vez de `/thank-you`, submit no se deshabilita hasta válido, bloque email extra; team rol en fila vs apilado; 404 jerarquía de encabezados; cookies copy ampliada; privacidad secciones recortadas. → `/clarify` `/adapt`

### P3 — Polish

- Color: card-2 light `#f0f0f2` sin equivalente; tokens de sintaxis light divergen (`globals.css:34-36` usan los del editor dark); hex de modo claro hard-coded (60+ ocurrencias) sin single-source; tokens `*-light` declarados y no usados.
- Typo: badge hero 12px (`:62`); links nav peso 400 no bold (`PageNav.tsx:81`); nav CTA 13px; tag de sección 13px; heading de columna footer (mono+uppercase vs display original).
- Home: dots de tráfico (ya coinciden); padding manifesto 20/60px; icono pause (verificar 2 barras).
- Nav/Footer: iconos sociales en cajas 44px con fill pistacho hover (`styles.css:1676`); brand footer horizontal + tagline a la derecha; underline-border en hover de links footer.
- Subpáginas: hover-lift en cards de servicio; CTA landing como botón filled; tamaños de precio mantenimiento; aspect-ratio/posición de foto y tag de equipo.

---

## Patterns & Systemic Issues

1. **El modo claro es ciudadano de segunda.** El original define un bloque `.is-light` que invierte fondo (beige), gradientes (lila-deep→turquesa-deep) y botones (lila-deep). La reconstrucción dejó la mayoría de valores light **hard-coded inline** en `page.tsx` (60+ hex) en vez de tokenizados, con paleta gris fría y sin inversión de acentos. **Causa raíz de la mayoría de P1 y de los 2 fallos WCAG AA.**
2. **Downscale tipográfico sistemático.** Casi todos los clamps de titular se redujeron (64→52, 80→52, 36→24, 26→18). No es un error puntual sino un patrón que aplana la jerarquía en todo el sitio.
3. **Motion adelgazado.** Falta scroll-reveal (home), typewriter del snippet (services), rotación del toggle, slide de flecha CTA, hover desaturate→color de logos, fill-hover del toggle collab. El token de easing `--kd-ease` está intercambiado con `--kd-ease-soft`, degradando todas las transiciones.
4. **Secciones/figuras "aplanadas".** Services y Collab perdieron su fondo radial+grid y el shell glass; hero y CTA perdieron la geometría/intensidad de sus glows. El resultado es plano frente a la capa ambiental del original.
5. **Páginas de estado y legales rediseñadas.** 404/gracias abandonan el lenguaje terminal `cs-status`; cookies/privacidad pierden la estética README; privacidad omite contenido legal real.

---

## Positive Findings (mantener)

- **Modo oscuro ≈ 95% fiel.** Los 12 tokens de marca `--kd-*` y todos los `--cs-*` dark coinciden exactamente.
- **Familias tipográficas correctas** vía next/font: Nunito (body), Red Hat Display (display), JetBrains Mono (mono), con eje variable que resuelve pesos 400–900.
- **A11y de base sólida y por encima del original:** `:focus-visible` 3px `#9747ff`, skip-link, `aria-expanded/current/pressed`, Escape-to-close, retorno de foco al burger, guard CSS `prefers-reduced-motion`.
- **Estructura completa:** las 5 secciones home en orden correcto; nav y footer con todas las piezas; ARIA del IDE (tabs/tabpanel, árbol) bien cableado.
- **Animaciones de hero fieles:** typewriter del editor (9 líneas, 280ms, guard reduced-motion), LED `cs-pulse` 1.6s, cursor `cs-blink`, marquee `cs-marquee` 38s — todas correctas.
- **Token nuevo `--color-kd-nav-cta #6b5db8` (5.41:1)** es una mejora AA válida; conviene reutilizarlo para el hover ghost en light.

---

## Recommended Actions (orden de prioridad)

1. **[P0/P1] `/colorize`** — Reparar modo claro: fondo beige `#f4f1ea`, invertir `.gradient-text` y CTA a lila-deep, arreglar hover ghost (AA fail 2.14:1), restaurar intensidad/posición de glows hero+CTA. Tokenizar los hex light.
2. **[P1] `/typeset`** — Restaurar escala de titulares: section H2 `clamp(34,5vw,64)`, CTA H2 `clamp(40,6vw,80)`, panel H3 36px, commit H3 26px; quitar faux-italic (o cargar italic real).
3. **[P1/P2] `/animate`** — Reconectar `useReveal` (home), typewriter del snippet, rotación toggle, slide flecha CTA, hover desaturate→color de logos, fill-hover toggle collab; corregir token `--kd-ease`.
4. **[P1] `/layout`** — Devolver fondo radial+grid y shell glass a Services/Collab; hero a bloque 1320px (sin `min-h-92vh`); reconstruir 404/gracias con terminal `cs-status`; cuerpo JSON de landings; estética README en cookies/privacidad.
5. **[P1/P2] `/clarify`** — Restaurar contenido perdido: fila "Código" en Basic, párrafos legales (Redsys/PayPal, AVISO LEGAL), copy freelancer; revisar 404 sin botones (callejón sin salida); confirmar 4 vs 6 miembros de equipo y labels de contacto.
6. **[P2] `/adapt`** — Revisar menú móvil (accordion superior vs drawer), clamps de subpágina, comportamiento de éxito del formulario de contacto.
7. **[P3] `/polish`** — Pasada final: tokens de sintaxis light, cajas de iconos sociales, layout de footer, pesos/tamaños de nav, hover-lift en cards.

---

---

# Pasada Atómica — Hallazgos Adicionales (2026-06-14)

Segunda auditoría componente-por-componente (4 carriles: primitivas interactivas, fondos/degradados, cards/contenedores/spacing, micro-estados/iconos/motion). Solo se listan hallazgos **nuevos o más precisos** que no estaban arriba. Valores exactos (px/hex/ms) verificados contra la variante CodeStudio (`.cs-`/`.v3-` en `styles.css`+`variants.css`).

## Hallazgo transversal nuevo más importante

**[P1] En modo claro, el editor / tabs / snippet deben permanecer OSCUROS — la reconstrucción los vuelve blancos.** El original mantiene `#1a1c22` (editor), `#14151a` (barra) y `#1a1c22` (snippet) incluso en light (`variants.css:1588-1606,1622-1623,264-273`). La reconstrucción los gira a `bg-white` / `#f0f0f2` / `#f5f5f7`. Afecta home (`page.tsx:123,131,290,318`), services (`84,88,99`), pricing (`56,61,70,195,197`), team (`48,53,64`). Pierde la estética "terminal oscuro sobre papel crema". El gris `#f0f0f2` de la barra es inventado (sin equivalente original). → `/colorize`

## Atómico: Primitivas Interactivas

- **[P1] Botón ghost transparente, original es card rellena** — `page.tsx:107-111`. Original `.cs-btn-ghost` `background:var(--cs-bg-card)` (`#1a1c22`/`#fff`), borde `--cs-line-strong` (.14). Reconstruido transparente, borde .20. → `/colorize`
- **[P1] Nav CTA radio 10px, original es píldora 999px** — `PageNav.tsx:115,209`, `page.tsx:684,777`. Original `.v3-cta` `border-radius:999px; padding:12px 22px; font-weight:800; font-size:15px; gap:10px`. Reconstruido `rounded-[10px] px-5 py-2.5 font-semibold text-[14px]`. → `/layout`
- **[P1] Nav CTA con lift hover en vez de oscurecer bg** — `PageNav.tsx:115`. Original no levanta (transición `gap/background/color`); dark sin cambio, light oscurece a negro. Reconstruido añade `-translate-y-0.5`. → `/animate`
- **[P1] Flecha CTA nav sin slide también en `PageNav.tsx:121`** (compartido por subpáginas; el informe solo cubría el nav inline del home). → `/animate`
- **[P1] Toggle tema sin rotate también en `PageNav.tsx:100-104`** + bg hover ≠ `--v3-line` + falta `transition transform`. → `/animate`
- **[P1] CTA de paquete (pricing) es link de texto, no botón relleno** — `pricing/page.tsx:220-225`. Original `.cs-pkg-cta` `padding:14px 22px; border-radius:10px; background:var(--c)` (lila/turquesa/pistacho por tier), `color:--kd-black`, hover `brightness(1.1) translateY(-2px)`. Reconstruido `hover:underline` sin bg/padding/radio. → `/layout`
- **[P1] Input: radio 10→6px, borde 1.5→1px, fuente mono→body, bg/padding** — `contact/page.tsx:74-78`. Original `.cs-field input/textarea` `padding:14px 16px; border-radius:10px; border:1.5px solid --cs-line; background:--cs-bg-card; font:mono 14px`. Reconstruido `rounded-md border px-3 py-2.5 font-body`, bg light `#f5f5f7`. → `/layout` + `/typeset`
- **[P1] Foco de input: anillo brand perdido** — `contact/page.tsx:74`. Original foco = borde pistacho **+** `outline:2px color-mix(pistacho 35%); outline-offset:1px` (light lila-deep 30%). Reconstruido `outline-none` + solo color de borde → cae al `:focus-visible` global morado 3px. → `/colorize`
- **[P1] Links footer sin border-bottom hover + token light** — `PageFooter.tsx:41,60`. Original `.v3-footer-nav a` hover `color+border-bottom pistacho` (light lila-deep). Reconstruido solo `hover:text`. → `/animate`
- **[P2] Prefijo `>` de label hardcoded sin color** — `contact/page.tsx:106,128,152`. Original `label::before{content:'>';color:pistacho}` (light turquesa-deep), label 12px. Reconstruido `> ` en texto, gris, 14px. → `/colorize`
- **[P2] Asterisco requerido rojo, original lila** — `contact/page.tsx:106` `text-kd-red`. Original `.req{color:--kd-lila}` (light lila-deep). → `/colorize`
- **[P2] Error en dark: color maroon bajo contraste + falta `!`** — `contact/page.tsx:123`. Original `.cs-error` dark `#ff9ec0`, light `#962f58`, 13px/600, `::before{content:'!'}`. Reconstruido `#962f58` en ambos modos. → `/colorize`
- **[P2] Sin borde rojo en campo inválido** — original `.cs-field.has-error input{border-color:--kd-red}`. Reconstruido solo `<p>` de error. → `/colorize`
- **[P2] Submit: peso 600→700, py 12→14, hover sin brightness, disabled opacity-50** — `contact/page.tsx:202-208`. Original disabled = `color-mix(pistacho 35%,card)` + fg-soft. → `/colorize`
- **[P2] Form container: bg `--cs-bg-card` (debe ser `--cs-bg-2`), radio 12→14, sin mono** — `contact/page.tsx:98`. → `/colorize`
- **[P2] Link privacidad checkbox lila en dark, original pistacho** — `contact/page.tsx:187`. → `/colorize`
- **[P2] Nav links añaden glyph `✧` por link que el original no tiene** — `PageNav.tsx:87`, `page.tsx:760`. → `/critique`
- **[P2] Tag de sección sin variante light `#4a7d3e` (queda `#6a9955`)** — `page.tsx:233` y demás eyebrows. → `/colorize`
- **[P2] Badge freelancer chip plano vs píldora con borde** — `pricing/page.tsx:119`. → `/polish`
- **[P2] Botón xl del CTA home sobredimensionado** — `page.tsx:556` `px-8 py-4 text-lg` vs original `18px 28px / 16px`. → `/typeset`
- **[P2] Panel link "Saber más" 14px/700, original 13px/600 + hover light inventado** — `page.tsx:349-357`. → `/typeset`
- **[P3] Badge hero 14px (orig 12px), gap 12 (orig 10), LED glow 8px (orig 12px)** — `page.tsx:61-73`. → `/polish`
- **[P3] Nav link py 8 (orig 10), 13px (orig 14px), sin `letter-spacing .02em`** — `PageNav.tsx:81`. → `/typeset`
- **[P3] Borde toggle tema ≠ `--v3-line`** — `PageNav.tsx:100`. → `/polish`

## Atómico: Fondos y Degradados

- **[P1] Fondos de sección en claro son gris frío, no beige — en TODAS las páginas** — home `page.tsx:201,228,320,370,451,526,730`; services `217,254`; pricing `171,321,357`; team `169,218`; contact `76,223`; cookies `14,22`; privacy `16,24`; not-found `14,23`; thank-you `15,24`; `globals.css:28-29`. Original light `--cs-bg:#f4f1ea / --cs-bg-2:#ebe7dd`. Reconstruido `#f5f5f7 / #ebebed`. → `/colorize`
- **[P1] Root home `#faf8f3` ≠ `#f4f1ea`** — `page.tsx:617`. El commit "beige" se pasó a casi-blanco e incoherente con las secciones (`#f5f5f7`). → `/colorize`
- **[P1] Barra de editor light `#f0f0f2` inventada (debe ser `#14151a`)** — `page.tsx:131`, `services:88`, `pricing:61,197`, `team:53`. → `/colorize`
- **[P1] Fondo `cs-page-hero` de subpáginas ausente** — sin capa radial/grid; subpáginas sobre `#f5f5f7`. → `/colorize` + `/layout`
- **[P2] Grid light `.04` vs original `.05`** — `globals.css:145-146` (~20% más tenue). → `/colorize`
- **[P2] Overlay radial+grid light de Services/Collab nunca construido** — valores originales light `lila 20% / turquesa 16% / .06 grid` (`variants.css:199-206`). Reconstruido plano. → `/layout` + `/colorize`
- **[P2] Shell services: translucidez `cs-bg-2 72%` + blur(8px) faltan en light** — `page.tsx:371,452` solo aplican en dark. → `/layout`
- **[P2] CTA glow light 35% no construido + forma elipse vs circle** — `page.tsx:534`. Original light `circle at 50% 100%, pistacho 35%, transparent 50%`. → `/colorize`
- **[P2] Tree-item activo light: `bg-kd-lila-soft` sólido vs `color-mix(lila-deep 10%)`** — `page.tsx:253`. → `/colorize`
- **[P2] Doc-head light `#ebebed` (debe `#ebe7dd`)** — `cookies:22`, `privacy:24`. → `/colorize`
- **[P2] Terminal de estado (404/gracias): bg `#fff` + `box-shadow 0 8px 24px rgba(0,0,0,.08)` light / `#1a1c22` dark no replicados** — `not-found:23`, `thank-you:24`. → `/layout`
- **[P3] `#f0f0f2` "card-2" sin equivalente original** (mapear a `#ebe7dd`). → `/colorize`
- **[P3] Footer light hereda gris (debe `#f4f1ea`)** — `page.tsx:802`. → `/colorize`
- **[P3] Badge foto equipo `bg-white/90` vs sólido `#fff`** — `team:138`. → `/polish`
- *Nota:* no existen reglas `::selection`, `::-webkit-scrollbar*` ni `caret-color` en ninguno de los dos (ambos usan defaults — no es discrepancia).

## Atómico: Cards, Contenedores y Spacing

- **[P1] Barra editor padding `16/12` vs original `10px 14px`** — `page.tsx:129-148`. → `/layout`
- **[P1] Panel services padding 32→24px** — `page.tsx:290`. → `/layout`
- **[P1] Commit radio 10→8px + padding `22/24`→20px** — `page.tsx:394`. → `/layout`
- **[P1] Freelancer card radio 14→12px + padding 28→32px** — `pricing:115`. → `/layout`
- **[P1] `.cs-pkg` cards radio 14→12px (sistémico)** — `pricing:195,290`. → `/layout`
- **[P1] Package body padding 28→24 + gap 14→12** — `pricing:205`. → `/layout`
- **[P1] Member card borde débil (`--cs-line` vs `--cs-line-strong`) + radio 14→12** — `team:126`. → `/layout`
- **[P1] Foto miembro `aspect 4/3` vs cuadrada `1:1`** — `team:129` (retratos salen apaisados). → `/layout`
- **[P1] Member tag: esquina/derecha vs izquierda, radio 4 vs píldora, sin borde** — `team:136-142`. → `/layout`
- **[P1] `.cs-doc` max-width 760→860px** — `cookies:20`, privacy (perjudica lectura). → `/layout`
- **[P1] Social links sin caja 44px** — `PageFooter.tsx:74-93`. Original `44×44 radius 12px border bg`, hover fill pistacho. (También touch-target.) → `/layout`
- **[P1] Footer-top sin divisor** — original `border-bottom 1px + padding-bottom 36px + margin-bottom 60px`. Reconstruido `mb-10`. → `/layout`
- **[P2] Tab chip editor padding `12/2` vs `6px 14px`** — `page.tsx:137-142`. → `/layout`
- **[P2] Body editor `p-4` vs `20px 0`** — `page.tsx:150-189`. → `/layout`
- **[P2] Tree item `px-2 py-1.5` vs `8px 10px`; snippet `p-4` vs `14px 16px`** — `page.tsx:249,318`. → `/layout`
- **[P2] Commit body gap 4→6px** — `page.tsx:410`. → `/polish`
- **[P2] Package bar padding `16/12` vs `10px 16px`** — `pricing:197`. → `/layout`
- **[P2] Badge recomendado restyled (chip color vs neutro píldora con borde)** — `pricing:119`. → `/colorize`
- **[P2] Extras card: bg `--cs-bg-card` (debe `--cs-bg-2`), radio 10→8, padding 20→16** — `pricing:237`. → `/layout`
- **[P2] Member body padding asimétrico `18/20/22` aplanado a 20 + gap 6→8; grid gap 16→24** — `team:122,145`. → `/layout`
- **[P2] Form bg layer `--cs-bg-card` (debe `--cs-bg-2`) + radio 14→12** — `contact:98`. → `/layout`
- **[P2] Submit py 14→12** — `contact:206`. → `/layout`
- **[P2] Doc-head chip margin/padding + márgenes de h1/h2/h3/p/li perdidos** (ritmo vertical aplanado, bullet indent 24 vs 20) — cookies/privacy. → `/layout` + `/typeset`
- **[P2] Footer header columna: mono 11px gris-light vs display 12px tracking .14em pistacho; padding `60/24` aplanado a 48; bottom bar 12px mono vs 13px** — `PageFooter.tsx`. → `/typeset` + `/colorize`
- **[P3] Editor dark sin `box-shadow 0 32px 80px rgba(0,0,0,.5)`** — `page.tsx:119`. → `/polish`
- *Corrección:* checkbox 16px coincide (`h-4 w-4`) — sin hallazgo.

## Atómico: Micro-estados, Iconos y Motion

- **[P1] Stroke-width global de iconos 2 vs 1.5** — `icons.tsx:103`. Todo icono ~33% más grueso (manifesto debería ser 1.6). → `/polish`
- **[P1] Icono `sun` sustituido** — `icons.tsx:12-23` (`r=5` + 8 `<line>`) vs original `r=4` + path compacto. → `/polish`
- **[P1] Icono `moon` path distinto** — `icons.tsx:26`. → `/polish`
- **[P1] `linkedin` sustituido (logo Feather relleno vs "in" en cuadro redondeado)** — `icons.tsx:48-54`. → `/polish`
- **[P1] Hover bg tree-item alpha distinto + transición sin `.15s` + color de icono `▸` siempre aplicado** — `page.tsx:249-266`. → `/animate`
- **[P1] Commit (manifesto) sin hover-border + transición** — original `:hover{border-color:pistacho}` (light lila-deep). → `/animate`
- **[P1] Hover lift de card categoría servicio ausente** — `services:169`. Original `:hover{border-color:var(--c); translateY(-2px)}`. → `/animate`
- **[P1] Hover lift card miembro ausente (+ `filter:saturate(.9)` foto)** — `team:126`. Original `translateY(-3px)`. → `/animate`
- **[P1] Hover lift card pricing + CTA brightness ausente** — `pricing`. Original `cs-pkg:hover translateY(-4px)`, cta `brightness(1.1) translateY(-2px)`. → `/animate`
- **[P1] Flecha `→` del botón ghost hero sin slide 3px** — `page.tsx:113`. Original `.cs-arrow` `translateX(3px)` en hover. → `/animate`
- **[P1] Botón primario sin triada `transform/background/border-color .2s`** — `page.tsx:101,556` (bg hover `#e5fc7a` salta sin fade). → `/animate`
- **[P2] Iconos `menu`/`close`/`instagram`/`play`/`pause` con geometría distinta** (líneas vs path; play/pause stroke vs relleno redondeado del original). → `/polish` / `/animate`
- **[P2] Hash commit gris + autor pistacho (invertido): original hash pistacho, autor gris** — `page.tsx:399-411`. → `/colorize`
- **[P2] Logo collab: base sin `grayscale(.4)/opacity .9` + `transition-all` (anima sombra) + tile 144×64 vs 200×110** — `page.tsx:491`. → `/animate` + `/layout`
- **[P2] Disabled submit: opacity-50 vs `color-mix(pistacho 35%,card)` + fg-soft** — `contact:206`. → `/polish`
- **[P2] `::before` markdown (`# / ## / ### / -`) + underline-offset 3px + `strong` coloreado ausentes** — cookies/privacy. → `/layout`
- **[P2] focus-visible por-elemento perdido en inputs y tiles collab (teclado no desatura/escala)** — a11y. → `/animate`
- **[P2] Nav scroll `transition-all duration-200` vs original `background/border/backdrop .35s`** — `page.tsx:623`, `PageNav.tsx:48`. → `/animate`
- **[P2] Keyframe `v3-rise` (translateY 40px) es vehículo equivocado para el reveal** — el reveal real usa patrón `cs-commit` translateY(20px) + `calc(.12s*var(--i))`, no reproducido. → `/animate`
- **[P3] `icons.tsx` omite `check`/`arrow-right`/`arrow-down`** (se usan glyphs de texto — comportamiento OK, set incompleto). → `/polish`
- **[P3] SVG `spark` sin usar diverge del original** — `icons.tsx:55`. → `/polish`
- **[P3] `v1-fadeup` backdrop usa easing inline saltándose token** — `globals.css:58`, `page.tsx:718`. → `/polish`

## Patrones sistémicos nuevos (refuerzan diagnóstico)

1. **Radios sistemáticamente sub-escalados:** `rounded-lg`(8) / `rounded-xl`(12) / `rounded-md`(6) de Tailwind usados donde el original pide 10/14/16px. Afecta editor, commit, freelancer, pkg, member, form. Causa raíz: mapeo perezoso a tokens Tailwind por defecto en vez de valores exactos.
2. **Capas de profundidad equivocadas:** varios contenedores usan `--cs-bg-card` donde el original usa `--cs-bg-2` (form, extras), aplanando la jerarquía de superficies.
3. **Paddings asimétricos del original aplanados a uniformes** (`p-4`/`p-5`/`p-8`) — el original usa pares `10/14`, `14/16`, `18/22`, `22/24`, `60/24`.
4. **Hover-lifts ausentes en todo el sistema de cards** (servicio, miembro, pricing, commit) — el original levanta 2–4px con border de acento en cada uno.
5. **Iconos más gruesos (stroke 2 vs 1.5) y 3–4 sustituidos** — diferencia de "peso visual" en todo nav/footer/toggles.
6. **Light mode**: además del fondo gris, el sistema "código-oscuro-sobre-papel" (editor/tabs/snippet/terminal permanecen oscuros) no se implementó; muchos valores light directamente no existen.

## Acciones recomendadas — actualización

El orden no cambia, pero el peso de `/colorize` y `/layout` aumenta:
1. **[P1] `/colorize`** — además de lo anterior: beige `#f4f1ea` consistente en TODA página, editor/tabs/snippet/terminal oscuros en light, eliminar `#f0f0f2`/`#faf8f3`, capas `--cs-bg-2` correctas, anillo de foco brand en inputs, colores de error/label/asterisco.
2. **[P1] `/layout`** — radios exactos (10/14/16), paddings asimétricos, social boxes 44px, footer divisor, CTA pricing como botón relleno, `.cs-doc` 760px, foto equipo cuadrada.
3. **[P1] `/animate`** — hover-lifts de todas las cards, slides de flecha, hover-border commit, anillos focus-visible por-elemento, durations 250/350ms, token `--kd-ease`.
4. **[P1] `/typeset`** — escala de titulares + tamaños de nav/badge/label/footer header.
5. **[P2] `/clarify`** — contenido legal/feature perdido, labels, 404 sin botones.
6. **[P3] `/polish`** — iconos (stroke 1.5 + paths originales), sombras, micro-paddings.

---

# Barrido de Paridad — Modo Claro Completo (2026-06-14)

Verificación **declaración por declaración** de TODO el bloque light original (`variants.css` `.var-cs.is-light` ≈68 reglas + `styles.css` `.v3-root.is-light` ≈34 reglas ≈ **95 declaraciones light**). Resultado: **✅ ≈41 reproducidas · ⚠️ ≈18 valor incorrecto · ❌ ≈23 ausentes → paridad light ≈ 62%.** El modo claro NO está a la altura del oscuro (~95%). Solo hallazgos NUEVOS no documentados arriba.

## ❌ Reglas light del original sin equivalente alguno

- **[P1] Snippet del panel de tabs debe quedar OSCURO con sintaxis propia en claro** — `page.tsx:317-347`. Original light `.cs-tabs .cs-snippet` `background:#1a1c22; color:#e4e5eb` + num `rgba(228,229,235,.5)` + `.ks #c586c0/.kf turquesa/.kc #6a9955/.kn pistacho/.kb #569cd6` (variants.css:264-273). Reconstruido blanco `#f5f5f7`. → `/colorize`
- **[P1] Paleta de sintaxis del CUERPO en claro nunca implementada** — `globals.css:34-36`. Original `.var-cs.is-light .ks #af00db / .kf #018a6c / .kc #4a7d3e / .kn #a8ba53 / .kb #0451a5` (variants.css:1548-1552). Reconstruido usa tokens dark siempre; eyebrows `/* servicios */` (`page.tsx:205,375,456,540`) salen `#6a9955` en vez de `#4a7d3e`. → `/colorize`
- **[P1] `cs-commit-hash` light = lila-deep `#7569d6`, no verde** — `page.tsx:399-401` (usa `#6a9955`). variants.css:1610. → `/colorize`
- **[P1] `cs-led` light = turquesa-deep `#018a6c` + glow 12px** — `page.tsx:69` (siempre pistacho). variants.css:1619. → `/colorize`
- **[P1] `cs-typing-cursor` light = lila-deep** — `page.tsx:185` (cursor `▍` del editor, siempre pistacho). variants.css:1621. → `/colorize`
- **[P1] `cs-led-soft` light = lila-deep ausente** — `●` del badge. variants.css:1620. → `/colorize`
- **[P1] `cs-collab-toggle:hover` light = fill lila-deep + texto blanco** — `page.tsx:509-513` (solo `border-black/20`). variants.css:1652-1654. → `/animate`+`/colorize`
- **[P1] CTA glow SIN rama light (35% circle-bottom)** — `page.tsx:533-535` (un solo valor 16% elipse para ambos modos). variants.css:1569-1571. → `/colorize`
- **[P1] Hero glow SIN rama light (22%/18% esquinas)** — `page.tsx:44-55` (queda 90% centro en claro). variants.css:1562-1565. → `/colorize`
- **[P1] Input focus light = lila-deep (no pistacho)** — `contact/page.tsx:74`. Original `border lila-deep + outline lila-deep 30%` (variants.css:1946-1948). → `/colorize`
- **[P1] Shell glass (services/collab) sin rama light** — `page.tsx:371,452` aplican translucidez+blur solo en dark; en claro desaparece. → `/layout`
- **[P2] `cs-cat-num` light = `#4a5b18` + chip de fondo** — `services/page.tsx:157`. variants.css:1769-1772. → `/colorize`
- **[P2] `cs-extras-price` light = `#4a5b18`** — `pricing/page.tsx:240` (usa turquesa-deep). variants.css:1806. → `/colorize`
- **[P2] `cs-editor-sm` light box-shadow = `0 16px 40px rgba(0,0,0,.08)`** — heros subpágina. variants.css:1735. → `/polish`
- **[P2] `cs-status-terminal` light box-shadow = `0 8px 24px rgba(0,0,0,.08)`** — 404/gracias. variants.css:2050. → `/layout`

## ⚠️ Reglas light presentes pero con valor desviado

- **[P1] Tokens root light desviados Y sin usar** — `globals.css:28-31`. Original `--cs-bg #f4f1ea / --cs-bg-2 #ebe7dd / --cs-bg-card #fff / --cs-line rgba(0,0,0,.08) / --cs-line-strong .14 / --cs-fg-soft #555`. Reconstruido `#f5f5f7/#ebebed/.../#6e6f75` y además hardcoded inline (los tokens `-light` no se consumen). Falta tokenizar `#fff` card y líneas `.08/.14` (el código usa `border-black/10`). → `/colorize`
- **[P1] Tree-item activo light = `color-mix(lila-deep 10%)` translúcido** — `page.tsx:251-253` usa `bg-kd-lila-soft #e4e1fb` sólido. variants.css:1581-1583. → `/colorize`
- **[P1] Grid root light `.04` vs `.05`** — `globals.css:145-146`. variants.css:1541-1542. → `/colorize`
- **[P1] Overlay radial+grid light services/collab = lila 20% / turquesa 16% / grid `.06`** — `page.tsx:201,451` plano. variants.css:199-205. → `/colorize`+`/layout`
- **[P2] Editor-bar light debe ser `#14151a` oscuro, no `#f0f0f2`** — `page.tsx:131` (+ services/pricing/team). variants.css:1593. → `/colorize`
- **[P2] CTA ghost light: original card-relleno borde negro 1.5px + hover fill pistacho** — `page.tsx:107-111` es ghost transparente con hover `#a8ba53` (falla AA). styles.css:2810-2818. → `/colorize`
- **[P3] Skip-link light no invierte a lila-deep** — `globals.css:110-120`. styles.css:2903-2904. → `/colorize`
- **[P3] `nav-spark ✧` light = turquesa-deep** — `PageNav.tsx:87` (pistacho/70 + glyph ajeno). styles.css:2900. → `/colorize`
- **[P3] Hero-ticker light = negro (elemento ausente)** — styles.css:2893. → `/layout`
- **Nota:** Nav CTA `#6b5db8` vs original lila-deep `#7569d6` = **mejora AA intencional** (5.41:1), no defecto.

## Patrón light dominante

Tres familias de fallo concentran casi toda la brecha:
1. **Micro-acentos que el original invierte a lila-deep/turquesa-deep y la reconstrucción deja en pistacho/verde:** LED, led-soft, typing-cursor, commit-hash, tag, nav-spark, focus-ring de input.
2. **Sintaxis en claro nunca implementada:** snippet de tabs (debe quedar oscuro) + paleta del cuerpo (`#af00db / #018a6c / #4a7d3e / #a8ba53 / #0451a5`).
3. **Ramas light de fondo ausentes:** hero 22%/18%, CTA 35% circle-bottom, services/collab radial+grid+glass.

Comando dominante para llevar light a paridad: **`/colorize`** (apoyo de `/layout` para shell glass y páginas de estado). Tras aplicarlo, light debería pasar de ~62% a ~95% como el dark.

---

> Puedes pedirme que ejecute estos comandos de uno en uno, todos a la vez, o en el orden que prefieras.
>
> Vuelve a ejecutar `/audit` tras los arreglos para ver subir la puntuación.

---

# Barrido Dark/Default — hallazgos nuevos (2026-06-14)

Verificación **declaración por declaración** del estado DEFAULT (oscuro) del tema CodeStudio original (`.var-cs` sin `.is-light`): bloque home `variants.css:14-433`, bloque subpáginas `variants.css:1700-2073`, shell compartido `styles.css:1136-1235` (`.v3-root`, `.v3-nav`, `.v3-skip`, `.v3-theme`, `.v3-cta`, `.v3-mobile`). El dark se reportó ~95% fiel; este barrido busca el ~5% restante.

**Cobertura:** se enumeraron ≈230 declaraciones default (no-`is-light`) a lo largo de ~75 reglas `.cs-*`/`.var-cs .v3-*`. Resultado del subconjunto NO documentado antes: **✅ ≈30 confirmadas correctas · ⚠️ ≈22 valor desviado (nuevas) · ❌ ≈14 ausentes (nuevas)**. La mayoría de la deriva dark se concentra en las cards de subpágina (`.cs-cat`, `.cs-pkg`, `.cs-member`, `.cs-form`, `.cs-doc`, `.cs-status`), cuyos valores oscuros NO se habían verificado declaración-por-declaración (el informe previo los marcó casi todos como light/layout). Los hallazgos de radio/padding ya catalogados como sistémicos en la pasada atómica NO se repiten aquí salvo que el valor exacto difiera de lo ya anotado.

> Nota de no-duplicación: la pasada atómica ya cubrió en dark: editor radius/shadow, commit radius/padding, social boxes 44px, footer divisor, stroke de iconos, nav CTA pill/lift, toggle rotate, flecha slide, hover-lifts de cards, `--kd-ease` intercambiado, marquee tile 144×64. Aquí solo se añaden declaraciones default no listadas o con cifra nueva.

## ❌ Declaraciones default del original sin equivalente alguno (nuevas)

- **[P1] `.cs-cat-num` chip de número (servicios) — pierde TODO el styling de píldora en dark** — `app/services/page.tsx:157`. Original `variants.css:1763-1768`: `font-mono 13px/600; padding:4px 10px; border-radius:6px; background:color-mix(var(--c) 15%, transparent); color:var(--c)`. Reconstruido: `font-mono text-2xl font-black text-{accent}` — número gigante sin fondo, sin radio, sin padding. Impacto: desaparece la estética "badge de índice" del catálogo. Fix: render como chip 13px con `background:color-mix(--c 15%)`. Comando: `/colorize` + `/layout`.
- **[P1] `.cs-pkg-cta` botón de paquete (pricing) no existe como botón en dark** — `app/pricing/page.tsx:220-222`. Original `variants.css:1893-1900`: `padding:14px 22px; border-radius:10px; background:var(--c); color:var(--kd-black); font-mono 13px/600; hover filter:brightness(1.1) translateY(-2px)`. Reconstruido: `font-mono text-sm font-bold` (enlace de texto). Impacto: el CTA por tier (lila/turquesa/pistacho) deja de existir como superficie rellena en dark. (El informe lo marcó como hallazgo light/layout; aquí se confirma que **el default dark también está roto**.) Fix: botón relleno con `background:var(--c)`. Comando: `/layout` + `/colorize`.
- **[P1] `.cs-section` (subpáginas internas) sin `border-top:1px dashed var(--cs-line)` ni padding `60px 0`** — `app/services/page.tsx:186` (`px-8 py-20`). Original `variants.css:1738-1741`. Impacto: se pierde el divisor punteado entre secciones internas en dark. Fix: añadir `border-top:1px dashed` + padding vertical 60px. Comando: `/layout`.
- **[P1] `.cs-editor.cs-editor-sm` box-shadow dark ausente en hero de subpágina** — `app/services/page.tsx:82-84` (sin shadow). Original `variants.css:1734`: `box-shadow:0 24px 60px rgba(0,0,0,.4)`. (Distinto del editor del home, ya catalogado: este es el `-sm` de subpáginas.) Impacto: tarjeta de código plana en /servicios y otras subpáginas. Fix: aplicar la sombra `-sm`. Comando: `/polish`.
- **[P1] `.cs-status-terminal` (404/gracias) ausente en dark — no solo en light** — `app/not-found.tsx`, `app/thank-you/page.tsx`. Original dark `variants.css:2043-2049`: `background:var(--cs-bg-card); border:1px solid var(--cs-line-strong); border-radius:14px; padding:32px 40px; box-shadow:0 16px 40px rgba(0,0,0,.3)` + líneas mono (`prompt` fg-soft, `success` pistacho, `error #ff9ec0`). Reconstruido: solo fondo SVG, sin card terminal ni líneas. Impacto: el lenguaje terminal del original desaparece también en dark (el informe lo enmarcó como rediseño/light; aquí se fija el box-shadow dark exacto `0 16px 40px rgba(0,0,0,.3)`). Fix: reconstruir card terminal. Comando: `/layout`.
- **[P1] `.cs-doc` prefijos markdown `::before` (`# `/`## `/`### `/`-`) ausentes en dark** — `app/cookies/page.tsx`, `app/privacy/page.tsx`. Original dark `variants.css:1996-1998,2006-2008,2016-2018,2031-2033`: pistacho mono (h1/h2/li) y fg-soft (h3). Impacto: se pierde la estética README en ambos modos. (El informe lo marcó light; aquí se confirma default dark.) Fix: pseudo-prefijos mono. Comando: `/layout`.
- **[P2] `.cs-doc li::before '-'` + `list-none` reemplazados por `list-disc` en dark** — `app/privacy/page.tsx:62-67`. Original `variants.css:2027-2034`: `ul{list-style:none;padding-left:0}` + `li{padding-left:20px}` + `li::before{content:'-';color:var(--kd-pistacho);font-mono 700}`. Reconstruido usa viñetas nativas. Impacto: bullets redondos genéricos en vez de guiones pistacho. Fix: lista custom. Comando: `/layout`.
- **[P2] `.cs-member-tag` borde ausente en dark** — `app/team/page.tsx:136-142`. Original `variants.css:1844`: `border:1px solid var(--cs-line)`. Reconstruido sin borde (+ posición/forma ya anotadas). Fix: añadir borde line. Comando: `/layout`.
- **[P2] `.cs-member-photo img { filter: saturate(.9) }` ausente en dark** — `app/team/page.tsx:129-143`. Original `variants.css:1837`. Impacto: retratos a saturación plena vs el desaturado sutil del original. Fix: aplicar `saturate(.9)`. Comando: `/polish`.
- **[P2] `.cs-field label::before '>'` color pistacho ausente en dark** — `app/contact/page.tsx:106,129,152`. Original dark `variants.css:1930`: `content:'>'; color:var(--kd-pistacho)`. Reconstruido: `> ` en el texto, hereda color de label (gris). Impacto: prompt de campo sin color de acento en dark. Fix: span pistacho. Comando: `/colorize`.
- **[P2] `.cs-field input:focus-visible` anillo brand ausente en dark** — `app/contact/page.tsx:74`. Original dark `variants.css:1941-1944`: `border-color:var(--kd-pistacho); outline:2px solid color-mix(var(--kd-pistacho) 35%); outline-offset:1px`. Reconstruido: solo `focus:border-kd-pistacho` (cae al focus-visible global morado 3px). (El informe documentó la rama light; el default dark también pierde el outline pistacho.) Fix: outline pistacho 35%. Comando: `/colorize`.
- **[P2] `.cs-field.has-error input { border-color: var(--kd-red) }` sin equivalente en dark** — `app/contact/page.tsx:74` (input no cambia de borde con error). Original `variants.css:1951-1952`. Impacto: campo inválido sin señal de borde en dark. Fix: borde rojo condicional. Comando: `/colorize`.
- **[P2] `.cs-submit:disabled` sin estado dark** — `app/contact/page.tsx:202-211`. Original `variants.css:1974-1977`: `background:color-mix(var(--kd-pistacho) 35%, var(--cs-bg-card)); color:var(--cs-fg-soft)`. Reconstruido: sin estilo disabled específico. Fix: estilo disabled atenuado. Comando: `/polish`.

## ⚠️ Declaraciones default presentes pero con valor desviado (nuevas)

- **[P1] Glow del hero default: forma y opacidad** — `app/page.tsx:44-55`. Original dark `variants.css:53-58`: dos radiales `circle at 30% 20%` (pistacho **8%**) y `circle at 80% 80%` (turquesa **8%**), fade `transparent 60%`. Reconstruido: `circle at 40% 50%`/`70% 40%`, ambos al **90%**, fade 60%. (El informe ya señaló posición+intensidad para light; aquí se fija que **el default dark también está al 90% en vez del 8%** y las posiciones no son 30%/20% ni 80%/80%.) Impacto: glow saturado en dark, no la bruma 8% del original. Fix: dos radiales 8% en 30/20 y 80/80. Comando: `/colorize`.
- **[P1] CTA glow default: forma elipse-centro vs `circle at 50% 100%` 16%** — `app/page.tsx:533-535`. Original dark `variants.css:399-400`: `radial-gradient(circle at 50% 100%, color-mix(var(--kd-pistacho) 16%, transparent), transparent 50%)`. Reconstruido: `ellipse 70% 60% at 50% 50%, rgba(210,233,104,0.16) 0%, transparent 70%`. Impacto: resplandor centrado en vez de emerger desde el borde inferior; fade 70% en vez de 50%. Fix: circle bottom 16% fade 50%. Comando: `/colorize`.
- **[P1] `.cs-services`/`.cs-collab` fondo default: pierde radiales lila/turquesa 10% + grid 32px** — `app/page.tsx:201,451`. Original dark `variants.css:188-197`: `background-color:color-mix(var(--cs-bg-2) 72%)` + 2 radiales `color-mix(var(--kd-lila/turquesa) 10%, transparent)` en 20/20 y 80/80 + grid `rgba(255,255,255,.04)` 32px. Reconstruido: Services `bg-cs-bg` plano (`:201`); Collab solo `color-mix(cs-bg-2 80%)` (`:452`) sin radiales ni grid. Impacto: ambas secciones planas en dark (el informe lo trató como light/layout; aquí se confirma que **el default dark también pierde los radiales+grid**, y que el valor base de Services es `72%`, no `80%` ni opaco). Fix: capa radial+grid dark. Comando: `/layout` + `/colorize`.
- **[P1] `.cs-services-shell` translucidez+blur default ausente** — `app/page.tsx:220-223`. Original dark `variants.css:207-216`: `background:color-mix(var(--cs-bg-2) 80%, transparent); border:1px solid var(--cs-line-strong); border-radius:16px; padding:16px; backdrop-filter:blur(8px)`; columnas `280px 1fr` gap 24px. Reconstruido: `rounded-lg border-cs-line lg:grid-cols-[240px_1fr]` sin bg translúcido, sin padding 16px, sin blur. (El informe lo señaló; aquí se fija que el **default dark** carece del shell glass — no es exclusivo del light — y radio debe ser **16px**, no `rounded-lg`/8px.) Fix: shell glass dark. Comando: `/layout`.
- **[P1] `.cs-pkg-price` 44px→`text-3xl` en dark + sin `letter-spacing -.025em` ni `margin 12px 0`** — `app/pricing/page.tsx:210`. Original `variants.css:1887-1891`: `font-size:44px; font-weight:900; letter-spacing:-.025em; margin:12px 0; line-height:1`. Reconstruido `font-display font-black text-3xl` (~30px). Impacto: precio infra-escalado ~14px en dark. Fix: 44px + ls + margen. Comando: `/typeset`.
- **[P1] `.cs-cat-card` superficie default `--cs-bg-2`→`--cs-bg` (capa equivocada)** — `app/services/page.tsx:169`. Original `variants.css:1782`: `background:var(--cs-bg-2)`. Reconstruido `bg-cs-bg` (fondo de página). Impacto: las sub-cards de categoría se funden con el fondo en dark en vez de elevarse a la capa bg-2. Fix: `bg-cs-bg-2`. Comando: `/colorize`.
- **[P1] `.cs-form` capa default `--cs-bg-2`→`--cs-bg-card`** — `app/contact/page.tsx:97-102`. Original `variants.css:1919-1920`: `background:var(--cs-bg-2)`. Reconstruido `bg-cs-bg-card`. (Misma inversión de capa señalada como patrón; aquí con la cifra: form debe vivir en bg-2 `#14151a`, no card `#1a1c22`.) Comando: `/colorize`.
- **[P1] `.cs-cat-num`/`.cs-cat-title`/`.cs-cat-card h3` tamaños default** — `app/services/page.tsx:157,159,171`. Original: cat-title **26px** (`:1775`) vs `text-xl`(20px); cat-card h3 **18px** (`:1790`) vs `text-base`(16px). Impacto: jerarquía del catálogo aplanada en dark. Comando: `/typeset`.
- **[P1] `.cs-extras-price` default debe ser pistacho, reconstruido turquesa** — `app/pricing/page.tsx:240`. Original dark `variants.css:1801-1803`: `color:var(--kd-pistacho)`. Reconstruido `text-kd-turquesa`. Impacto: precio de extras en color equivocado en dark (no es solo el desvío light ya anotado). Fix: pistacho en dark. Comando: `/colorize`.
- **[P1] `.v3-nav.is-scrolled` borde default `12%`→`8%` + opacidad fondo `55%`→`95%`** — `app/page.tsx:627`, `src/lib/PageNav.tsx:52`. Original `styles.css:1176-1179`: `background:color-mix(var(--v3-bg) 55%, transparent); border-bottom:1px solid color-mix(var(--v3-fg) 12%, transparent)`. Reconstruido: `bg-cs-bg/95 border-white/8`. (La opacidad 55→95 se infiere del informe que pedía `/55`; aquí se añade que **el borde es `white/8` cuando debería ser `--cs-fg 12%` ≈ `rgba(228,229,235,.12)`** — color y alpha distintos.) Comando: `/colorize`.
- **[P2] `.cs-member-name` peso default 800→900** — `app/team/page.tsx:147-149` (`font-black`). Original `variants.css:1847-1848`: `font-weight:800`. Impacto: nombre de miembro un grado más pesado en dark. Comando: `/typeset`.
- **[P2] `.cs-member-role` sin `font-weight:600` ni `letter-spacing:.04em` en dark** — `app/team/page.tsx:150-152`. Original `variants.css:1851-1853`. Reconstruido `font-mono text-xs` (400, sin tracking) y además color `text-syn-comment` (verde) en vez de `--cs-fg-soft`. Impacto: rol verde+ligero en dark, no gris con tracking. Comando: `/colorize` + `/typeset`.
- **[P2] `.cs-team-grid` gap default 16px→24px** — `app/team/page.tsx:122` (`gap-6`). Original `variants.css:1821`: `gap:16px`. Comando: `/layout`.
- **[P2] `.cs-pkg-body` mono/lh default ausentes** — `app/pricing/page.tsx:205`. Original `variants.css:1880`: `font-mono 14px; line-height:1.7; gap:14px; padding:28px`. Reconstruido `gap-3 p-6` (gap 12, padding 24) sin mono/lh explícitos. Comando: `/layout` + `/typeset`.
- **[P2] `.cs-pkg-bar` padding default `10px 16px`→`py-3` (px-4)** — `app/pricing/page.tsx:197`. Original `variants.css:1872`. Comando: `/layout`.
- **[P2] `.cs-doc` max-width default 760px→860px** — `app/cookies/page.tsx:20`, `app/privacy/page.tsx:22`. Original `variants.css:1982`. (Confirma que la desviación existe también en dark; el ritmo de lectura largo se ensancha en ambos modos.) Comando: `/layout`.
- **[P2] `.cs-doc h1` clamp default ausente** — `cookies:27-30`, `privacy:29-31` (`text-4xl` fijo). Original `variants.css:1991-1994`: `clamp(32px,5vw,56px)` + `margin:16px 0 12px` + ls `-.025em`. Comando: `/typeset`.
- **[P2] `.cs-doc h3` tamaño default 17px→`text-lg/text-xl`** — `cookies:46,54,62`, `privacy` varios. Original `variants.css:2011-2013`: `font-size:17px; font-weight:700; margin:24px 0 8px`. Comando: `/typeset`.
- **[P2] `.cs-doc p` default sin `margin:8px 0` ni `font-size:15px` ni `line-height:1.65`** — cookies/privacy. Original `variants.css:2020-2022`. Reconstruido `m-0 leading-relaxed`. Impacto: ritmo vertical del documento colapsado en dark. Comando: `/typeset`.
- **[P2] `.cs-status` contenedor default: max-width 760→720px, gap 20→`gap-5`(20px OK), padding `60px 0`→`py-[100px]`** — `not-found.tsx:58`, `thank-you:58`. Original `variants.css:2038-2041`. (max-width y padding desviados en dark.) Comando: `/layout`.
- **[P2] `.cs-status-code` default vw/max desviados 14vw/160px→16vw/200px** — `not-found:61-72`, `thank-you:60-72`. Original `variants.css:2057-2059`: `clamp(80px,14vw,160px)` + `letter-spacing:-.04em`. Reconstruido `clamp(80px,16vw,200px)` sin ls. Comando: `/typeset`.
- **[P2] `.cs-status h1` clamp default min 32→34px** — `not-found:74-80`, `thank-you:74-80`. Original `variants.css:2068-2069`: `clamp(32px,5vw,56px)`. Comando: `/typeset`.
- **[P3] `thank-you` status-code usa hex hardcodeados en vez de tokens** — `app/thank-you/page.tsx:60-72` (`#d2e968`/`#01c095`/`#a99df1`). Original usa `var(--kd-pistacho/turquesa/lila)` (`variants.css:2060`). Mismo color, fuente no-tokenizada. Comando: `/polish`.

## Áreas verificadas SIN nuevos hallazgos dark

- **Traffic lights** (`page.tsx:134-136`): `h-3 w-3` = 12×12px coincide exacto con `.cs-tlight` (`variants.css:133`); colores `#ff5f57/#febc2e/#28c840` coinciden vía tokens `--color-mac-*`. ✅ Sin hallazgo.
- **Tokens dark de marca y `--cs-*`** (`globals.css:5-25`): los 12 `--kd-*` y los 8 `--cs-*` dark coinciden hex a hex con `styles.css:8-19` y `variants.css:15-21`. ✅ Confirmado (ya positivo en el informe).
- **`.cs-led` / `.cs-led-soft` / `.cs-typing-cursor` en dark**: pistacho/lila correctos (las desviaciones son solo en light, ya documentadas). ✅
- **Marquee mask edge-fade**: el original `variants.css:370` usa `linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`; el reconstruido (`page.tsx:471-476`) **no aplica máscara** — pero esto ya está implícito en el hallazgo "marquee mask edge-fade" P2 del informe. Sin nuevo registro, solo confirmación del valor exacto (8%/92%).
- **z-index / backdrop por defecto**: nav `z-50`, mobile backdrop `z-40`, drawer `z-50` coinciden con el patrón original (`.v3-nav z-index:50`). No hay reglas `::selection`/scrollbar en ninguno (ya anotado). ✅
- **`.cs-snippet` default (tabs)**: en dark `background:var(--cs-bg)` — el reconstruido (`page.tsx:319-321`) usa `bg-cs-bg` correctamente en dark; la divergencia es solo en light (snippet debe quedar oscuro), ya documentada. ✅

## Patrón dark dominante (nuevo)

El ~5% restante del modo oscuro NO está en los tokens ni en el home shell (que son fieles), sino en **las cards de subpágina cuyo estado default nunca se verificó cifra-a-cifra**: `.cs-cat-num` (chip perdido), `.cs-pkg-cta` (botón→texto), `.cs-pkg-price` (44→30px), capas de superficie invertidas (`cs-cat-card`/`cs-form` usan la capa equivocada en dark), y los dos sistemas terminal/README (`.cs-status`, `.cs-doc`) que pierden estructura en AMBOS modos, no solo en light. Sumado a los dos glows ambientales del home (hero 90% vs 8%, CTA elipse vs circle-bottom) que también están mal en default, el dark real ronda **~90%** una vez auditado a este nivel, no el 95% estimado. Comandos dominantes: `/colorize` (glows + capas + chips) y `/layout` (botón pkg, shell glass, terminal, doc).

---

# Barrido Light 2ª Pasada — Hallazgos Nuevos (2026-06-14)

Segunda verificación light sobre áreas poco cubiertas (cards de subpágina, editor de servicios, páginas de estado). Solo nuevos. **Patrón común: micro-acentos que el original invierte a `lila-deep`/`turquesa-deep`/`#5a6b18` y que el rebuild deja en pistacho/lila/turquesa brillantes — varios FALLAN AA en claro.**

- **[P1] Sistema de acento `--c` de service cards SIN rama light** — `services/page.tsx:133-145,157,159`. Original light invierte `--c` a lila-deep/turquesa-deep/`#5a6b18` (`variants.css:1796-1798`) y deja el `h3` en foreground neutro. Rebuilt: num+h3 usan `text-kd-lila/turquesa/pistacho` planos sin variante light → pistacho `#d2e968` sobre `#f5f5f7` ≈ 1.9:1 (**FALLA AA**) y colorea el h3 (jerarquía invertida). El P2 previo solo cubría el chip de `cs-cat-num`. Fix: variante light `text-kd-lila-deep/turquesa-deep/#5a6b18` + h3 a `#1a1b1e`. → `/colorize`
- **[P1] Etiqueta `export <tag>` del editor de servicios ilegible en claro** — `services/page.tsx:110`. Editor se vuelve blanco en light (`:99`) pero la tag sigue pistacho brillante ≈ 1.4:1. Fix: mantener editor oscuro (recomendación dominante) o mapear a `-deep`. → `/colorize`
- **[P1] Subtítulo H2 de 404/gracias pistacho fijo — FALLA AA en claro** — `not-found.tsx:82-83`, `thank-you/page.tsx:82-83`. `text-kd-pistacho` `#d2e968` sobre `#f5f5f7` ≈ 1.4:1. Original `cs-status-success` light = `#5a6b18` (`variants.css:2055`). Fix: `#5a6b18` o lila-deep en claro. → `/colorize`
- **[P2] Mantenimiento + "COOKIES DE FUNCIONALIDAD" usan `#a8ba53` — FALLA AA en claro** — `pricing/page.tsx:256`, `cookies/page.tsx:62`. `pistacho-deep #a8ba53` sobre blanco = 2.14:1. Original olive `#5a6b18` (`variants.css:1798,1907`) ≈ 5.3:1. Fix: introducir token **`--color-kd-olive #5a6b18`** y usarlo en acentos pistacho light. → `/colorize`
- **[P2] Borde izquierdo `border-l-2` de filas pistacho mantenimiento brillante en claro** — `pricing/page.tsx:299`. `#d2e968` brillante, inconsistente con su texto. Fix: `#5a6b18`. → `/colorize`
- **[P2] Borde de service card pintado con acento brillante /30 en reposo** — `services/page.tsx:132,137,142`. Original neutro en reposo, acento -deep solo en hover. Fix: `border-black/10` reposo. → `/colorize`+`/animate`
- **[P2] Gradiente del glifo 404/✓ sin rama light** — `not-found.tsx:63-68`, `thank-you/page.tsx:63-68`. Original light `linear-gradient(135deg, lila-deep, turquesa-deep 50%, #5a6b18)` (`variants.css:2063-2065`). Fix: rama light. → `/colorize`
- **[P3] `thank-you` hardcodea colores del SVG vs `not-found` tokenizado** — `thank-you/page.tsx:35-36,64`. Tokenizar. → `/polish`

## Conclusión del barrido completo (dark + light)

- **Dark real ≈ 90%** (no 95%): brecha en cards de subpágina default + 2 glows del home.
- **Light real ≈ 60%**: además de lo ya documentado, **3 fallos AA nuevos en claro** (números/títulos de service cards, subtítulos de 404/gracias, acentos pistacho de mantenimiento/cookies), todos por la misma causa raíz: ramas light de acento inexistentes.
- **Acción única más rentable:** crear token `--color-kd-olive #5a6b18` + añadir ramas light de acento (lila-deep/turquesa-deep/olive) y mantener editor/snippet/terminal oscuros en claro. Eso, vía `/colorize` (+ `/layout` para glass/terminal/doc), sube light de ~60% a ~95% y cierra los fallos AA.

---

> Puedes pedirme que ejecute estos comandos de uno en uno, todos a la vez, o en el orden que prefieras.
>
> Vuelve a ejecutar `/audit` tras los arreglos para ver subir la puntuación.
