# KnitsDigital — Code Studio

Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.

## Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Package Manager**: pnpm
- **Testing**: Jest + @testing-library/react
- **E2E Testing**: Playwright
- **Fonts**: Nunito, Red Hat Display, JetBrains Mono

## Requisitos

- Node.js 20+
- pnpm 10+

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Build

```bash
pnpm build
pnpm start
```

## Testing

### Unit Tests (Jest)

```bash
pnpm test              # Run tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report
```

### E2E Tests (Playwright)

```bash
pnpm e2e              # Run E2E tests
pnpm e2e:ui           # Run in UI mode
```

## Estructura de Carpetas

```
app/
├── page.tsx           # Home page
├── servicios/         # Services page
├── equipo/            # Team page
├── precios/           # Pricing page
├── contacto/          # Contact page
├── privacidad/        # Privacy policy
├── cookies/           # Cookie policy
├── layout.tsx         # Root layout
└── globals.css        # Global styles

src/
├── components/        # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   └── __tests__/     # Component tests
└── lib/
    └── data.ts        # Constants and data

e2e/
└── home.spec.ts       # E2E tests
```

## Accesibilidad

- WCAG 2.2 Level AA compliant
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Reduced motion support

## Security

- Next.js built-in security features
- CSP headers (to be configured)
- No known critical vulnerabilities

**Note**: PostCSS has a moderate XSS vulnerability (GHSA-qx2v-qp2m-jg93) in versions < 8.5.10. This is a transitive dependency via Next.js and has low exploitability for static sites.

## Deployment

El proyecto está configurado para desplegarse en Vercel:

```bash
pnpm run build
```

## Contributing

Este proyecto sigue las mejores prácticas de desarrollo con:
- Commits pequeños y descriptivos en inglés
- Tests unitarios e E2E
- Código limpio y mantenible
- Documentación clara

## License

© 2026 KnitsDigital
