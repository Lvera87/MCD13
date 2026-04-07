# MCD Design Portfolio

Portfolio de diseño de Miguel Camacho — 14 proyectos de branding, identidad corporativa y diseño digital.

## Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript (strict mode)
- **Estilos**: Tailwind CSS v4
- **Animaciones**: GSAP 3 + @gsap/react
- **Fuentes**: Outfit, Playfair Display, Space Grotesk (Google Fonts)
- **Tests**: Vitest + @testing-library/react

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Root layout con workaround para extensiones de browser
│   ├── page.tsx            # Página principal — orquesta la navegación
│   └── globals.css         # Design tokens y estilos globales
├── components/
│   ├── ProjectShowcase.tsx # Visor de proyecto con galería y fullscreen
│   ├── ProjectSidebar.tsx  # Navegación lateral (desktop)
│   ├── MobileNavBar.tsx    # Drawer de navegación (mobile)
│   ├── NavItem.tsx         # Botón de navegación compartido entre sidebar y mobile
│   ├── HomeCover.tsx       # Pantalla de inicio del portfolio
│   ├── ThemeToggle.tsx     # Toggle light/dark
│   └── StatusBar.tsx       # Indicador de disponibilidad
├── hooks/
│   ├── useProjectNavigation.ts  # Estado y lógica de navegación entre proyectos
│   └── useSwipeDetection.ts     # Detección de gestos táctiles reutilizable
├── data/
│   └── projects.ts         # Datos de los 14 proyectos del portfolio
├── lib/
│   └── gsap.ts             # Configuración y registro de GSAP
└── tests/
    ├── setup.ts
    ├── useSwipeDetection.test.ts
    └── useProjectNavigation.test.ts
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu browser.

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (escribe cambios) |
| `npm run format:check` | Prettier (solo verifica) |
| `npm run test` | Tests con Vitest |
| `npm run test:watch` | Tests en modo watch |

## Nota técnica

El layout usa `suppressHydrationWarning` en los contenedores principales como workaround necesario para extensiones de browser como Bitdefender, que inyectan el atributo `bis_skin_checked` en el DOM antes del hydration de React. El IIFE en `layout.tsx` limpia este atributo activamente con un `MutationObserver`.
