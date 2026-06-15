# AGENTS.md

Proyecto de cronograma de servicios, manejo de equipos y calendario para iglesias. En etapa de planificación (SDD pendiente).

## Stack

React 18 + Vite + TypeScript strict + Tailwind CSS + shadcn/ui + Framer Motion + Firebase (Auth, Firestore con offline persistence) + vite-plugin-pwa (Workbox) + Vitest + Testing Library.

## Convenciones

- TypeScript estricto (`strict: true`).
- TDD: Red–Green–Refactor obligatorio para código de producción.
- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Nombres: `camelCase` variables, `PascalCase` tipos, `kebab-case` archivos.

## Referencia de features

Análisis comparativo de herramientas de referencia (Tecnoiglesia One, OnStage, WorshipTools Planning, Planning Center Services) en memoria de sesión (Engram). Features priorizadas: calendario, matriz de servicios (equipos × fechas), invitaciones con accept/decline, orden del servicio drag & drop, directorio de personas, tipos de servicio.
