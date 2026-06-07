# Plan de Actuación — knistdigital.es-rev Auditoría Consolidada

**Fecha:** 2026-06-03  
**Estado:** 5 de 5 auditorías completas (ver sección VISUAL AUDIT al final)  
**Objetivo:** Llevar el proyecto a 100% fidelidad vs template + eliminar código legacy

---

## 📊 Consolidación de Hallazgos

### 🔴 HIGH PRIORITY (crítico — rompe template fidelity)

| ID | Categoría | Problema | Archivo | Líneas | Impacto |
|----|-----------|---------|---------|---------| --------|
| **T1** | Template | Footer incompleto (solo 1 línea) | `app/page.tsx` | 741-750 | Falta 90% del footer (brand, columnas nav, social, tagline) |
| **T2** | Template | Services: snippet estático (sin typewriter) | `app/page.tsx` | 295-325 | Feature perdida (animación por-tab) |
| **L1** | Legacy | `src/components/` dead code | `src/components/*.tsx` + `*.module.css` | 1,420 líneas | 8 componentes + 8 CSS modules no usados |
| **TW1** | Tailwind | 14 instancias de hex que duplican tokens | `app/page.tsx` + global | múltiples | `#14151a`, `#c586c0`, `#569cd6`, `#0c0d10`, `#e4e5eb`, `#d2e968` (violación single-source-of-truth) |

---

### 🟠 MEDIUM PRIORITY (reduce fidelity, afecta UX/A11y)

| ID | Categoría | Problema | Archivo | Impacto |
|----|-----------|---------|---------|---------|
| **T3** | Template | Scroll-reveal ausente (Services + Manifesto) | `app/page.tsx` | Secciones aparecen estáticas, token `v3-rise` YA existe sin usar |
| **T4** | Template | Nav sin estado de scroll (transparente → blur) | `app/page.tsx` | Header no cambia en scroll, afecta UX |
| **T5** | Template | Emojis en lugar de SVG (♿ Manifesto, ▶/⏸ Collab) | `app/page.tsx` | Visualmente incorrecto, 3 iconos idénticos |
| **T6** | Template | `prefers-reduced-motion` no respetado | `app/page.tsx` | Regresión A11y (Hero tipea siempre, marquee siempre corre) |
| **T7** | Template | CTA: tarjeta con borde vs sección con glow radial | `app/page.tsx` | Layout incorrecto |
| **T8** | Template | Hero: falta glow radial `cs-hero-bg` | `app/page.tsx` | Fondo ambiental falta |
| **T9** | Template | Hero: gradiente light-mode incorrecto | `app/page.tsx` | Debe ser lila-deep→turquesa-deep en light |
| **TW2** | Tailwind | Paleta light-mode completa hardcodeada | `app/page.tsx` + todas las páginas | 80+ literales (should be 6 tokens) → mantenibilidad |
| **TW3** | Tailwind | Animaciones redeclaradas en lugar de usar tokens | `app/page.tsx` | `animate-[cs-pulse_1.6s...]` debería ser `animate-cs-pulse` |

---

### 🟢 LOW PRIORITY (asuntos menor, o aceptables en contexto)

| ID | Categoría | Problema | Archivo | Impacto |
|----|-----------|---------|---------|---------|
| **T10** | Template | Editor: función `knitsdigital()` sin color turquesa | `app/page.tsx` | Detalle visual menor |
| **T11** | Template | Services: h3 sin color por servicio | `app/page.tsx` | Panels should be lila/turquesa/pistacho |
| **T12** | Template | Collab: logos 40px vs 70px (too small) | `app/page.tsx` | Tamaño menor |
| **T13** | Template | Nav desktop sin `aria-current` (page activa) | `app/page.tsx` | Solo importa en subpáginas |
| **TW4** | Tailwind | globals.css .skip-link y .gradient-text usan hex en lugar de var() | `app/globals.css` | LOW (funcional) |

---

## 🎯 Plan de Ejecución Paso a Paso

### **Fase 0: Reconstruir sub-páginas (Portar template)** [estimado: 90 min]

⚠️ **CRÍTICO:** Ejecutar ANTES de Fase 1 (legacy cleanup). El visual audit revela que `/servicios`, `/precios`, `/equipo`, `/contacto`, `/privacidad`, `/cookies` son **stubs incompletos**. Deben reconstruirse desde el template.

Referencia: `~/Downloads/knitsdigital/project/{servicios,precios,equipo,contacto,privacidad,cookies}.jsx` + `data.jsx`.

**0a. `/servicios` — Reconstruir página completa**

Estructura esperada:
1. Hero "Tejiendo el *futuro* de tu empresa" (ídem home, con editor)
2. Sección "¿Qué tejemos en KnitsDigital?" 
3. **5 categorías** con tarjetas (cada una con icono coloreado):
   - Diseño UX/UI (3 features: Investigación/Prototipado/Accesibilidad)
   - Desarrollo web (3 features: Desarrollo/SEO inclusivo/Mantenimiento)
   - Apps móviles (3 features: Multiplataforma/Usabilidad/Funcionalidad)
   - **Inteligencia artificial** (3 features: Automatización/Análisis/Personalización)
   - **Auditoría de accesibilidad** (3 features: Diagnóstico/Informe/Próximos pasos)
4. CTA "Invierte en el futuro de tu negocio, con muy buen rollo"
5. Footer completo (3 columnas, brand, tagline, social)

Datos: `data.services` debe tener 5 items con `color` y `features[]`.
Imágenes: `public/assets/services/*.webp` existen, usarlas si aplica.

**0b. `/precios` — Reconstruir modelo de precios**

Estructura:
1. Hero "Tecnología que *suma*" (con editor)
2. Plan "Tu web profesional desde **79 €/mes**" (descripción escueta)
3. "Elige tu opción de landing" → 2 cards (**Desde 600 €** / **Desde 800 €**) con tabla comparativa
4. "Planes de mantenimiento" → 3 tiers (Basic 50€ / Pro 150€ / Premium 220€) con features
5. CTA "¿No encuentras lo que buscas?"
6. Footer completo

Datos: reemplazar los 3 actuales (Auditoría 500€ / Web 3000€ / App) con estructura de template.

**0c. `/equipo` — Agregar fotos + valores**

1. Hero "El *hilo* que nos une" (con editor)
2. Sección "El ovillo" → grid de **6 personas CON FOTOS** (usar `public/assets/team/*.webp`):
   - Ale, Arantxa, Lau, Oli, Paloma, Samu
   - Cada uno con foto + nombre + rol + descripción breve
3. Sección "¿Por qué KnitsDigital?" → 3 valores en tarjetas (Conexiones genuinas / Jerarquía horizontal / Sentirse a gusto)
4. Footer completo

**0d. `/contacto` — Layout 2-columnas + checkbox privacidad**

1. Layout **2 columnas**:
   - Izquierda: "¡Engánchate a *nuestro hilo*!" + subtítulo + info contacto (email, teléfono si aplica)
   - Derecha: formulario en tarjeta gris/oscura con:
     - **Labels estilo terminal:** `> nombre *`, `> email *`, `> mensaje *`
     - **Checkbox obligatorio:** "He leído y acepto los términos y condiciones de privacidad *"
     - Botón: `$ send --message` (código-like)
2. Footer completo

⚠️ **Riesgo legal:** Sin checkbox de privacidad, violación GDPR. Agregar es crítico.

**0e. `/privacidad` — Expandir contenido legal**

Reemplazar 5 secciones breves con documento completo (estilo markdown, como template):
- Título: "# Página de privacidad" 
- Secciones: Responsable del tratamiento / Finalidades / Base legal / Conservación / Destinatarios / Ejercicio de derechos / AVISO LEGAL (si aplica)
- Texto: usar template como referencia.

**0f. `/cookies` — Cambiar tono a lúdico + estructura**

Tono: voz de marca → "# **Nuestras cookies** 🍪✨"
Secciones:
- ¿CÓMO LAS USAMOS? (intro)
- NUESTRO SURTIDO (tabla de cookies por tipo: Esenciales/Rendimiento/Funcionalidad) con descripciones con personalidad
- ¿QUIERES SABER MÁS? (link a más info)

**Validación Fase 0:**
- [ ] Todas las 6 páginas cargan sin console errors
- [ ] Footer renderiza en todas (3 columnas, brand, tagline, social)
- [ ] `/equipo` muestra 6 fotos (carga desde `/public/assets/team/*.webp`)
- [ ] `/contacto` muestra checkbox de privacidad + es requerido
- [ ] `/precios` muestra modelo completo (3 tiers + planes landing)
- [ ] `/servicios` muestra 5 categorías con features
- [ ] `pnpm build` pass

---

### **Fase 1: Eliminar código legacy** [estimado: 5 min]

Decisión: **BORRAR completamente** `src/components/` porque:
- No se importan ni usan en `app/`
- Contienen estilos viejos (colores no coinciden con Code Studio)
- Los 17 keyframes `--animate-*` no usados contaminan `globals.css`

**Pasos:**
1. Eliminar directorio: `rm -rf src/components/`
2. Verificar imports: `grep -r "from.*src/components" app/` → debe estar vacío
3. Limpiar `globals.css`: eliminar 17 keyframes no usados:
   - `v1-draw`, `v1-pulse`, `v1-line-in`, `v1-bob`
   - Todos los `v3-*` excepto `v3-rise`
   - Todos los `au-float-*`, `st-*`
   - Mantener: `cs-blink`, `cs-pulse`, `cs-marquee`, `v1-fadeup`, `v3-rise`
4. Build test: `pnpm build` → debe pasar sin errores

---

### **Fase 2: Fixes Tailwind HIGH — Eliminar hex duplicados** [estimado: 15 min] (HOME)

Target: Reemplazar 14 instancias de hex hardcodeados con tokens.

**2a. `app/page.tsx` línea 349, 418 — `#14151a` → `var(--color-cs-bg-2)`**
```tsx
// ANTES:
style={{ background: 'color-mix(in srgb, #14151a 72%, transparent)' }}

// DESPUÉS:
style={{ background: 'color-mix(in srgb, var(--color-cs-bg-2) 72%, transparent)' }}
```

**2b. `app/page.tsx` línea 671 — `bg-[#14151a]` → `bg-cs-bg-2`**
```tsx
// ANTES:
className="bg-[#14151a]"

// DESPUÉS:
className="bg-cs-bg-2"
```

**2c. `app/page.tsx` líneas 149, 305, 307, 309, 314 — `text-[#c586c0]` → `text-syn-keyword`**

**2d. `app/page.tsx` líneas 155, 316 — `text-[#569cd6]` → `text-syn-bool`**

**2e. `app/page.tsx` líneas 53 — `shadow-[0_0_8px_#d2e968]` → `shadow-[0_0_8px_var(--color-kd-pistacho)]`**

**2f. TODAS las páginas (7 archivos) — Dark bg/fg inline styles → tokens**
```tsx
// ANTES:
style={{ backgroundColor: light ? '#f5f5f7' : '#0c0d10', color: light ? '#1a1b1e' : '#e4e5eb' }}

// DESPUÉS:
style={{ backgroundColor: light ? 'var(--color-cs-bg-light)' : 'var(--color-cs-bg)', color: light ? 'var(--color-cs-fg-light)' : 'var(--color-cs-fg)' }}
```
> ⚠️ **Nota:** Primero define tokens light-mode en `globals.css @theme` (ver Fase 4).

**Validación:**
- `grep -r "#14151a" app/` → 0 resultados
- `grep -r "#c586c0" app/` → 0 resultados
- `grep -r "#569cd6" app/` → 0 resultados
- `grep -r "#d2e968" app/` → 0 resultados (excepto en variables)
- Build: `pnpm build`

---

### **Fase 3: Fixes Template HIGH — Footer + Typewriter** [estimado: 30 min]

**3a. Reconstruir Footer (`app/page.tsx` líneas 741-750)**

Estructura esperada:
```tsx
<footer className="...">
  {/* Top section: brand + isotipo + tagline */}
  <div className="flex items-center gap-4 mb-12">
    <Icon name="logo" size={48} />
    <div>
      <h2>knitsdigital</h2>
      <p>Donde la tecnología, la <em>creatividad</em> y las personas <em>se entrelazan</em>.</p>
    </div>
  </div>

  {/* 3-column grid: Navega | Legal | Síguenos */}
  <div className="grid grid-cols-3 gap-12 mb-12">
    {/* Navega */}
    <div>
      <h3 className="text-sm font-600 mb-6">Navega</h3>
      <ul className="space-y-2">
        {['Servicios', 'Equipo', 'Precios', 'Contacto'].map(item => (
          <li key={item}>
            <a href={...}>{item}</a>
          </li>
        ))}
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h3 className="text-sm font-600 mb-6">Legal</h3>
      <ul className="space-y-2">
        {footerLegal.map(item => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>

    {/* Síguenos */}
    <div>
      <h3 className="text-sm font-600 mb-6">Síguenos</h3>
      <div className="flex gap-4">
        <a href="https://instagram.com/..." aria-label="Instagram">
          <Icon name="instagram" size={20} />
        </a>
        <a href="https://linkedin.com/..." aria-label="LinkedIn">
          <Icon name="linkedin" size={20} />
        </a>
      </div>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="border-t pt-6 text-sm text-cs-fg-soft flex justify-between">
    <p>© KnitsDigital {new Date().getFullYear()}</p>
    <p>Hecho con accesibilidad como hilo conductor.</p>
  </div>
</footer>
```

**Datos requeridos:** Usar `src/lib/data.ts` → `footerLegal`, `nav` array.

---

**3b. Implementar Typewriter por-tab en Services (`app/page.tsx` líneas 295-325)**

Extraer en componente `<ServiceCodeSnippet tag={s.tag} />`:
```tsx
export function ServiceCodeSnippet({ tag }: { tag: string }) {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const snippet = getSnippetForTag(tag);

  useEffect(() => {
    setText(''); // Reset on tag change
    let i = 0;
    const interval = setInterval(() => {
      if (i < snippet.length) {
        setText(snippet.slice(0, ++i));
      } else {
        clearInterval(interval);
      }
    }, 220); // 220ms per line (template value)
    return () => clearInterval(interval);
  }, [tag, snippet]);

  useEffect(() => {
    const toggle = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(toggle);
  }, []);

  return (
    <pre className="text-sm">
      <code>{text}</code>
      {cursorVisible && <span className="animate-pulse">▍</span>}
    </pre>
  );
}
```

**Validación:**
- Cambiar de pestaña → snippet se reinicia y retipea
- Cursor parpadeante visible

---

### **Fase 4: Fixes Tailwind MEDIUM — Paleta light-mode + tokenizar animaciones** [estimado: 20 min]

**4a. Definir 6 tokens light-mode en `app/globals.css @theme`**

Añadir tras `--color-cs-fg-soft`:
```css
@theme {
  /* ... existing tokens ... */
  
  /* Light mode equivalents */
  --color-cs-bg-light: #f5f5f7;
  --color-cs-bg-2-light: #ebebed;
  --color-cs-fg-light: #1a1b1e;
  --color-cs-fg-soft-light: #6e6f75;
  --color-kd-pistacho-light: #e5fc7a;
  /* --color-cs-bg-card-light: #f0f0f2; */ /* si es necesario */
}
```

**4b. Eliminar redeclaraciones de animaciones en `app/page.tsx`**

Reemplazar todos:
```tsx
// ANTES:
animate-[cs-pulse_1.6s_ease-in-out_infinite]
animate-[cs-blink_1s_steps(1)_infinite]
style={{ animation: 'v1-fadeup 0.2s ease forwards' }}

// DESPUÉS:
animate-cs-pulse
animate-cs-blink
animate-v1-fadeup
```

Lugares: líneas 53, 87, 167, 518, 659 (equipo, servicios, precios también).

**4c. Limpiar globals.css `.skip-link` y `.gradient-text`**
```css
/* ANTES */
.skip-link {
  background: #d2e968;
  color: #2b2b2b;
}

/* DESPUÉS */
.skip-link {
  background: var(--color-kd-pistacho);
  color: var(--color-kd-black);
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-kd-pistacho), var(--color-kd-turquesa));
}
```

---

### **Fase 5: Fixes Template MEDIUM — Scroll-reveal, nav state, reduced-motion** [estimado: 40 min]

**5a. Hook `useReveal` — scroll-triggered reveal**

Crear `src/lib/useReveal.ts`:
```typescript
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed, className: revealed ? 'is-in' : '' };
}
```

Aplicar en:
- Services `<section>` → `animate-v3-rise`
- Manifesto `<section>` → `animate-v3-rise`, cada commit con `style={{'--i': i}}`

**5b. Hook `useReducedMotion` — respetar preferencia**

```typescript
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    mq.addEventListener('change', e => setPrefersReduced(e.matches));
    return () => mq.removeEventListener('change', () => {});
  }, []);

  return prefersReduced;
}
```

Usar en:
- Hero: `const shouldType = !prefersReduced` → skipear typewriter
- Collab marquee: `paused = paused || prefersReduced`

**5c. Nav scroll state (`app/page.tsx` Header component)**

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 24);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Aplicar clases condicionales:
className={scrolled ? 'is-scrolled' : 'is-scrolling-top'}
```

Estilos en globals.css:
```css
.is-scrolled {
  @apply border-b border-cs-fg/10 backdrop-blur-xl bg-cs-bg/90;
}

.is-scrolling-top {
  @apply bg-transparent backdrop-blur-0;
}
```

**5d. Emojis → SVG (`app/page.tsx`)**

Manifesto (línea ~399):
```tsx
// ANTES: <span>♿ {m.icon}</span>
// DESPUÉS:
<Icon name={m.icon} size={14} />
```

Collab pause (línea ~481):
```tsx
// ANTES: {paused ? '▶' : '⏸'}
// DESPUÉS:
<Icon name={paused ? 'play' : 'pause'} size={20} />
```

**5e. CTA: quitar tarjeta, añadir glow**

```tsx
{/* ANTES: */}
<div className="border rounded-xl bg-card p-12 max-w-900">

{/* DESPUÉS: */}
<div className="relative">
  {/* Glow radial */}
  <div className="absolute inset-0 bg-gradient-radial from-[rgba(210,233,104,0.16)] to-transparent rounded-full blur-3xl" />
  <div className="relative text-center">
    {/* content */}
  </div>
</div>
```

---

### **Fase 6: Fixes Template LOW + Hero details** [estimado: 15 min]

**6a. Hero: agregar glow radial `cs-hero-bg`**

```tsx
<section className="relative ...">
  {/* Glow radial */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-radial from-[rgba(210,233,104,0.08)] via-transparent to-transparent" style={{ backgroundPosition: '30% 20%' }} />
    <div className="absolute inset-0 bg-gradient-radial from-[rgba(1,192,149,0.08)] via-transparent to-transparent" style={{ backgroundPosition: '80% 80%' }} />
  </div>
  {/* content */}
</section>
```

**6b. Hero: gradiente light-mode correcto**

```css
.is-light .gradient-text {
  background: linear-gradient(135deg, var(--color-kd-lila-deep), var(--color-kd-turquesa-deep));
}
```

Primero define los tokens `-deep` en `@theme`:
```css
--color-kd-lila-deep: #7569d6;
--color-kd-turquesa-deep: #018a6c;
```

**6c. Hero: ajustar tamaños/espaciado**

```tsx
{/* Título */}
className="text-[clamp(48px,7vw,92px)] tracking-[-0.035em] mb-6"

{/* Subtítulo */}
className="max-w-[50ch] text-lg"

{/* Badge */}
className="text-sm"

{/* Grid */}
className="grid grid-cols-[1fr_1.1fr] gap-16"
```

**6d. Editor: función `knitsdigital()` → turquesa**

```tsx
{/* ANTES: */}
<span className="text-syn-keyword">knitsdigital</span>

{/* DESPUÉS: */}
<span className="text-kd-turquesa">knitsdigital</span>
```

**6e. Services: colorear h3 por servicio**

```tsx
{/* ANTES: */}
<h3 className="text-cs-fg">

{/* DESPUÉS: */}
<h3 className={`text-${s.color || 'kd-pistacho'}`}>
```

Requiere que `data.services` tenga propiedad `color`: `['kd-lila', 'kd-turquesa', 'kd-pistacho']`.

**6f. Collab: logos → 70px (max-h-[70px])**

**6g. Nav desktop: aria-current (low prio, subpáginas)**

---

## 📋 Checklist de Validación

### Post-Fase 0 (Sub-páginas reconstruidas)
- [ ] `/servicios` carga sin errores, muestra hero + 5 categorías (IA/Auditoría presentes)
- [ ] `/precios` carga, muestra 3 tiers correctos (79€/mes web, 600€/800€ landing, 50/150/220€ mantenimiento)
- [ ] `/equipo` carga, muestra 6 fotos desde `/public/assets/team/*.webp`
- [ ] `/contacto` carga, **formulario incluye checkbox de privacidad obligatorio**
- [ ] `/privacidad` y `/cookies` tienen contenido completo (no abreviado)
- [ ] Footer renderiza en TODAS las 6 sub-páginas (3 columnas, brand, tagline, social icons)
- [ ] `pnpm build` pass

### Post-Fase 1 (Legacy cleanup)
- [ ] `rm -rf src/components/` ejecutado
- [ ] `grep -r "from.*src/components" app/` = vacío
- [ ] `globals.css`: 17 keyframes no usados eliminados
- [ ] `pnpm build` pass

### Post-Fase 2 (Tailwind HIGH)
- [ ] `grep -r "#14151a" app/` = 0
- [ ] `grep -r "#c586c0" app/` = 0
- [ ] `grep -r "#569cd6" app/` = 0
- [ ] `grep -r "#d2e968" app/` = 1 (solo en @theme)
- [ ] Todas las 7 páginas usan `var(--color-cs-bg/fg)` en dark
- [ ] `pnpm build` pass

### Post-Fase 3 (Template HIGH)
- [ ] Footer: 3 columnas + brand + tagline + social icons visible
- [ ] Services: cambiar tab → snippet retipea (no estático)
- [ ] `pnpm build` pass
- [ ] Navegar a `/contacto`, `/servicios` etc. → footer visible en todas

### Post-Fase 4 (Tailwind MEDIUM)
- [ ] `globals.css` tiene 6 tokens light-mode (`--color-cs-*-light`, `--color-kd-pistacho-light`)
- [ ] `app/page.tsx`: cero `animate-[...inline...]`, solo `animate-cs-pulse`, etc.
- [ ] `.skip-link`, `.gradient-text` usan `var()`
- [ ] `pnpm build` pass

### Post-Fase 5 (Template MEDIUM)
- [ ] Services section: aparece con animación on-scroll (fade-up)
- [ ] Manifesto commits: aparecen escalonados on-scroll
- [ ] Nav: cambia estilo (borde/fondo) al scroll > 24px
- [ ] Collab paused con `prefers-reduced-motion: reduce` (dev tools toggle)
- [ ] Manifesto: 3 iconos SVG distintos (no ♿ repetido)
- [ ] Collab: Play/Pause son SVG (no ▶/⏸)
- [ ] CTA: sección con glow radial, sin tarjeta con borde
- [ ] `pnpm build` pass

### Post-Fase 6 (LOW + Hero)
- [ ] Hero: glow radial visible (pistacho + turquesa)
- [ ] Hero light-mode: gradiente lila-deep→turquesa-deep
- [ ] Hero: título `clamp(48px,7vw,92px)`, tracking `-0.035em`
- [ ] Services h3: coloreados (lila/turquesa/pistacho)
- [ ] Collab logos: visualmente más grandes (70px)
- [ ] `pnpm build` pass
- [ ] Screenshot vs template: match visual

### Post-Fase 7 (Validación visual final)
- [ ] Todas las 7 páginas cargadas en `pnpm dev`
- [ ] Visual audit final: screenshot vs template (`/`, `/servicios`, `/precios`, `/equipo`, `/contacto`)
- [ ] Dark mode: colores coinciden con template (pistacho, turquesa, lila, gris)
- [ ] Light mode: acento lila (no pistacho verde), fondos aurora presentes
- [ ] Animaciones: Hero typewriter, Services reveal on-scroll, Collab marquee, Manifesto stagger
- [ ] Accesibilidad: prefers-reduced-motion funciona (dev tools toggle)
- [ ] Mobile (375px): drawer, nav, footer legibles, sin overflow

### Final Validation (pre-PR)
- [ ] `pnpm build` = SUCCESS
- [ ] `pnpm dev` = sin errores en consola
- [ ] Todos los links funcionan (nav, footer, 7 páginas)
- [ ] Theme toggle: light ↔ dark sin saltos visuales
- [ ] Mobile (375px viewport): drawer abre/cierra, no scroll overflow
- [ ] Lighthouse: sin warnings de accesibilidad relacionados a reduced-motion
- [ ] Branch limpio: `git status` = nada por commitear

---

## 📝 Notas de Ejecución

1. **Orden:** Ejecutar Fases 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 (secuencial, cada una depende de la anterior).
   - **Fase 0 es CRÍTICA:** Si se salta, Fase 1 (rm -rf src/components/) puede perder contenido de footer/equipo ricos.
2. **Branching:** Crear rama `fix/audit-consolidation` desde `main`.
3. **Commits:** Un commit por Fase (limpio y trazable).
4. **Testing:** 
   - Post-Fase 0: navegar a todas las páginas, verificar footer en todas
   - Post-Fase 3 y post-Fase 5: correr `pnpm dev` y hacer screenshot vs template
   - Post-Fase 7: visual audit final
5. **PR:** Abrir al final de Fase 7, con checklist completa.
6. **Data:** Asegurar que `src/lib/data.ts` tiene:
   - `footerLegal` array (links privacidad, cookies)
   - `nav` array con rutas
   - `services` (5 items) con `color`, `icon`, `features[]`
   - `pricing` (3 tiers) con planes
   - `team` (6 personas) con fotos (`public/assets/team/*.webp`)

---

## 🚀 Delegación

Una vez aprobado este plan:
1. Crear rama `fix/audit-consolidation` desde `main`
2. Delegar a **software-engineer** (worktree isolation) con este markdown
3. Pasos: 
   - Fase 0 (reconstruir sub-páginas) → commit
   - Fase 1 (legacy cleanup) → commit
   - Fases 2–6 (fixes home) → commit por fase
   - Fase 7 (validación visual) → push + PR
4. QA: correr visual audit final (screenshot vs template) post-merge
5. Mergear a `main` solo tras validación completa

---
---

# 🔍 VISUAL AUDIT — Comparación página-a-página vs template (visual-auditor)

**Fecha:** 2026-06-03 11:36  
**Método:** Screenshots fullPage 1440×900, dark + light, app (`localhost:3000`) vs template original (`Downloads/knitsdigital/project/*.html` servido en `localhost:8080`), comparación lado-a-lado.  
**Páginas:** `/` ↔ index.html · `/servicios` ↔ servicios.html · `/precios` ↔ precios.html · `/equipo` ↔ equipo.html · `/contacto` ↔ contacto.html · `/privacidad` ↔ privacidad.html · `/cookies` ↔ cookies.html

## ⚠️ Hallazgo de arquitectura (causa raíz)

El plan de 6 fases de arriba asume que el único problema serio es el **footer del home + tokens**. **Esto subestima gravemente el estado real.** La auditoría visual revela que **solo el home (`app/page.tsx`) se parece al template.** Las **6 sub-páginas restantes son stubs simplificados** que NO replican el template: les falta el hero, secciones enteras de contenido, imágenes, y usan datos placeholder incorrectos. Cada `app/<ruta>/page.tsx` reimplementa nav + footer minimal inline y un fragmento de contenido reducido.

> Los componentes ricos en `src/components/` (`Footer.tsx` con 3 columnas, etc.) **existen pero no se usan en ninguna página** — confirmado. El plan los marca para BORRAR (L1); antes de borrar, **revisar si su contenido/estructura debe portarse** a las páginas (footer, equipo).

---

## 🔴 HIGH — Discrepancias estructurales (rompen fidelity por completo)

### V1 · Footer minimal en TODAS las páginas
- **Página:** todas (7) — **Elemento:** `<footer>` — **Modo:** dark + light
- **Problema:** cada página renderiza footer inline de 1 línea.
- **Template:** footer completo → isotipo + wordmark "knitsdigital", tagline gradiente "Donde la tecnología, la *creatividad* y las personas *se entrelazan*.", divisor, 3 columnas (NAVEGA: Servicios/Equipo/Precios/Contacto · LEGAL: Uso de cookies/Política de privacidad · SÍGUENOS: iconos Instagram + LinkedIn), barra inferior "© KnitsDigital 2026 | Hecho con accesibilidad como hilo conductor".
- **Actual:** solo texto centrado "KnitsDigital © 2026". Nada más.
- **Severidad:** HIGH _(amplía T1: no es solo el home — son las 7 páginas)_

### V2 · `/servicios` es un stub (≈50% de altura del template)
- **Página:** servicios — **Elemento:** página completa — **Modo:** dark + light
- **Problema:** falta hero y la mayoría del contenido. Altura app 1637px vs template 3429px.
- **Template:** (1) Hero "Tejiendo el *futuro* de tu empresa" + subtítulo + editor de código + botón. (2) Sección "¿Qué tejemos en KnitsDigital?". (3) **5 categorías** con icono de color cada una — Diseño de productos digitales, Desarrollo web, Aplicaciones móviles, **Inteligencia artificial**, **Auditoría de accesibilidad** — cada una con **sub-grid de 3 tarjetas de features** (~15 tarjetas: Investigación/Prototipado/Accesibilidad, Desarrollo/SEO inclusivo/Mantenimiento, Multiplataforma/Usabilidad/Funcionalidad, Automatización/Análisis/Personalización, Diagnóstico rápido/Informe accionable/Próximos pasos). (4) CTA "Invierte en el futuro de tu negocio, con muy buen rollo". (5) Footer completo.
- **Actual:** sin hero; solo **3 tarjetas apiladas** (Diseño UX/UI, Desarrollo web, Apps móviles) con bloque de código — es la mini-sección "Servicios" del home reusada. Faltan categorías IA y Auditoría, faltan los 15 sub-features, faltan iconos (`public/assets/services/*.webp` sin usar). CTA "¿Cuál es tu proyecto?".
- **Severidad:** HIGH

### V3 · `/precios` — modelo de precios totalmente distinto
- **Página:** precios — **Elemento:** página completa — **Modo:** dark + light
- **Problema:** sin hero; estructura y números de precio no coinciden.
- **Template:** Hero "Tecnología que *suma*" + editor. Plan "Tu web profesional desde **79 €/mes**". "Elige tu opción de landing" → 2 cards (**Desde 600 €** / **Desde 800 €**) con tabla comparativa (Copywriting / Diseño una página / Integraciones avanzadas). "Planes de mantenimiento" → 3 tiers (**Basic 50€/mes · Pro 150€/mes · Premium 220€/mes**) con listas de features. CTA "¿No encuentras lo que buscas?". Footer completo.
- **Actual:** sin hero; 3 cards genéricas (**Auditoría Desde €500 · Proyecto web Desde €3000 · App móvil Presupuesto personalizado**) con checklist simple. CTA "¿Necesitas un presupuesto?".
- **Severidad:** HIGH

### V4 · `/equipo` — datos placeholder y sin fotos
- **Página:** equipo — **Elemento:** grid de equipo — **Modo:** dark + light
- **Problema:** sin hero, sin fotos, datos genéricos, falta sección de valores.
- **Template:** Hero "El *hilo* que nos une" + editor. Sección "El ovillo" → grid de tarjetas de personas reales **con foto** (Ale, Arantxa, Lau, Paloma…) nombre + rol + descripción. Sección "¿Por qué KnitsDigital?" → 3 valores (Conexiones genuinas / Jerarquía horizontal / Sentirse a gusto). Footer completo.
- **Actual:** sin hero; 3 tarjetas placeholder (Samuel Romero Arbelo / "Diseñador/a UX" / "Developer/a Junior") **sin foto** y con datos genéricos. Las fotos `public/assets/team/*.webp` (ale, arantxa, lau, oli, paloma, samu) **existen pero no se usan.** Falta sección de valores.
- **Severidad:** HIGH

### V5 · `/contacto` — layout, labels y checkbox de privacidad
- **Página:** contacto — **Elemento:** hero + formulario — **Modo:** dark + light
- **Problema:** layout de 1 columna (vs 2), labels distintas, **falta checkbox de consentimiento de privacidad** (riesgo legal/funcional).
- **Template:** 2 columnas → izq titular "¡Engánchate a *nuestro hilo*!" + subtítulo; der formulario en tarjeta con labels estilo terminal (`> name *`, `> email *`, `> message *`), **checkbox obligatorio "He leído y acepto los términos y condiciones de privacidad *"**, botón `$ send --message`. Footer completo.
- **Actual:** 1 columna centrada; titular "Empecemos a tejer juntas"; labels planas (Nombre / Email / ¿Cuál es tu proyecto?); **sin checkbox de privacidad**; botón "Enviar propuesta _"; link "O directo por email".
- **Severidad:** HIGH (checkbox = legal; layout = visual)

### V6 · "Casos de éxito" — logos invisibles (sin tarjetas, grayscale + opacity)
- **Página:** home — **Elemento:** marquee de clientes — **Modo:** dark + light
- **Problema:** los logos van directos sobre fondo oscuro con `grayscale opacity-50` → casi invisibles; sin contenedor de tarjeta clara.
- **Template:** cada logo en **tarjeta clara/blanca redondeada**, a color, totalmente legibles, en marquee horizontal.
- **Actual:** logos desnudos, en gris al 50% sobre fondo oscuro; la mayoría no se ven (`app/page.tsx` Collab `className="...opacity-50 grayscale..."`, sin card light). Las imágenes cargan (200 OK) — es problema de estilo, no de assets.
- **Severidad:** HIGH

---

## 🟠 MEDIUM — Color, fondo y contenido

### V7 · Acento light-mode: lila/púrpura (template) vs verde/negro (app)
- **Página:** todas — **Elemento:** CTAs nav + hero, gradient-text — **Modo:** light
- **Template:** en light mode el acento primario es **lila/púrpura** (botón nav "Contactar" púrpura, CTA hero púrpura) y el gradiente de "accesible" va azul→turquesa.
- **Actual:** mantiene **verde pistacho** en hero CTA y **negro** en nav CTA; gradiente verde. _(relacionado con T9/6b del plan, pero aplica a botones, no solo gradient-text)_
- **Severidad:** MEDIUM

### V8 · Fondos aurora/gradiente ausentes
- **Página:** home + sub-páginas — **Elemento:** fondo de hero/CTA — **Modo:** light (notable) y dark
- **Template:** fondos aurora/gradiente suaves (hero, CTA, footer) — verdes/púrpuras difuminados.
- **Actual:** fondo gris/oscuro plano con grid; sin aurora. _(relacionado T8 hero glow, pero también CTA y light-mode)_
- **Severidad:** MEDIUM

### V9 · Tag de sección: mayúsculas verde (app) vs minúsculas gris (template)
- **Página:** todas — **Elemento:** etiqueta `/* … */` sobre cada título — **Modo:** dark + light
- **Template:** minúsculas, monospace, gris apagado: `/* clientes */`, `/* servicios */`.
- **Actual:** MAYÚSCULAS, verde pistacho, tracking ancho: `/* CLIENTES */`, `/* SERVICIOS */`.
- **Severidad:** MEDIUM

### V10 · `/privacidad` — contenido legal abreviado
- **Página:** privacidad — **Modo:** dark + light
- **Template:** documento legal extenso estilo markdown (`# Página de privacidad`, "POLÍTICA DE PRIVACIDAD Y AVISO LEGAL") con muchas secciones detalladas (responsable, finalidades, conservación, AVISO LEGAL, ejercicio de derechos…).
- **Actual:** solo 5 secciones breves (Responsable / Datos / Uso / Tus derechos / Contacto), título display (no markdown), "Última actualización: 3 de junio de 2026".
- **Severidad:** MEDIUM

### V11 · `/cookies` — tono y estructura distintos
- **Página:** cookies — **Modo:** dark + light
- **Template:** voz de marca lúdica → "# **Nuestras cookies** 🍪✨", secciones "¿CÓMO LAS USAMOS?", "NUESTRO SURTIDO" (COOKIES ESENCIALES/RENDIMIENTO/FUNCIONALIDAD con descripciones con personalidad), "¿QUIERES SABER MÁS?".
- **Actual:** formal genérico → "Política de Cookies", secciones estándar (¿Qué son?/Cookies que utilizamos/Gestión/Más información).
- **Severidad:** MEDIUM

### V12 · Tipografía del H1 del hero (home) más pequeña
- **Página:** home — **Elemento:** H1 hero — **Modo:** dark + light
- **Template:** H1 muy grande, rompe en 3 líneas (Tejemos / código / accesible.), peso black.
- **Actual:** más pequeño, "Tejemos código" en una línea + "accesible." debajo. _(coincide con 6c del plan)_
- **Severidad:** MEDIUM

---

## 🟢 LOW — Detalles

### V13 · Nav omite el enlace de la página actual
- **Página:** sub-páginas — **Elemento:** nav desktop — **Modo:** ambos
- **Template:** muestra los 3 enlaces (Servicios/Equipo/Precios) y resalta el actual.
- **Actual:** omite el enlace de la página en la que estás (p.ej. en `/servicios` el nav solo muestra Equipo/Precios). _(relacionado T13 aria-current)_
- **Severidad:** LOW

### V14 · Botón CTA del nav cambia de texto por página
- **Página:** contacto — **Elemento:** botón nav — **Modo:** ambos
- **Actual:** en `/contacto` el botón del nav dice "Email →" en vez de "Contactar →". Verificar si es intencional vs template.
- **Severidad:** LOW

---

## 📌 Recomendación para el plan de ejecución

El plan de 6 fases cubre bien el **home** y la **arquitectura de código**, pero **falta una fase para reconstruir las sub-páginas** (servicios, precios, equipo, contacto, privacidad, cookies) a partir de sus `.jsx`/`data.jsx` del template. Sugerido:

- **Fase 0 (nueva, HIGH):** Portar contenido y estructura de cada sub-página desde `Downloads/knitsdigital/project/{servicios,precios,equipo,contacto,privacidad,cookies}.jsx` + `data.jsx` (incluye los 5 servicios con features, los planes de precio reales, el equipo con fotos, el form con checkbox de privacidad, los textos legales completos). Reutilizar Hero + Footer como componentes compartidos.
- Integrar V1 (footer en todas) y V6 (logos en tarjetas) aquí, no solo en el home.
- ⚠️ **Antes de `rm -rf src/components/` (Fase 1/L1):** confirmar que footer/equipo ricos se han portado a las páginas, o reutilizar esos componentes en lugar de borrarlos.

**Artefactos:** 28 screenshots en `/tmp/audit/` (`{tpl,app}-<página>-<dark|light>.png`) + recortes de footer/collab (`e-*.png`).

