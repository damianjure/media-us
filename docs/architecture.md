# Arquitectura

## Patrón

Clean / Hexagonal. Regla de dependencia: las capas internas no conocen a las externas.

```
src/
├── domain/          # Entidades y reglas de negocio puras. No importa React, Firebase ni Vite.
│   ├── models/      # Service, Team, Person, ServiceOrder, Invitation, ServiceType
│   └── rules/       # Lógica de negocio pura (ej. no se puede asignar una persona 2 veces el mismo día)
├── application/     # Casos de uso. Orquesta el dominio. Define puertos (interfaces).
│   ├── use-cases/   # CreateService, SendInvitation, AssignPersonToTeam, ReorderServiceItems
│   └── ports/       # IServiceRepository, ITeamRepository, IAuthService
└── infrastructure/  # Adapters concretos — implementan los puertos.
    ├── firebase/    # FirebaseAuthAdapter, FirestoreServiceRepository, FirestoreTeamRepository
    ├── ui/          # React components, páginas, layouts, hooks, stores
    └── pwa/         # Service Worker registration, manifest, cache strategies
```

- **domain/**: `Service` (fecha, hora, tipo, notas, estado), `Team` (nombre, roles[]), `Person` (nombre, email, equipos[], roles[]), `ServiceOrder` (items[] con orden, tipo), `Invitation` (personId, serviceId, status). Reglas: una persona no puede estar en 2 servicios a la misma hora, invitación solo a miembros del equipo asignado.
- **application/**: `CreateService`, `UpdateService`, `DeleteService`, `AssignPersonToTeam`, `SendInvitations`, `RespondToInvitation`, `ReorderServiceItems`, `GetServiceMatrix`. Puertos: `IServiceRepository`, `ITeamRepository`, `IPersonRepository`, `IAuthService`.
- **infrastructure/firebase/**: `FirebaseAuthAdapter` (signInWithGoogle, signInWithApple, signInWithEmail), `FirestoreServiceRepository`, `FirestoreTeamRepository`, `FirestorePersonRepository`. Todos usan `enableIndexedDbPersistence` para offline.
- **infrastructure/ui/**: Componentes React organizados por feature (calendar/, matrix/, services/, people/, teams/, auth/), más shared/ (Button, Card, Modal, Toast, Skeleton).
- **infrastructure/pwa/**: `registerSW.ts`, `manifest.json`, workbox config en `vite.config.ts`.

## PWA Strategy (vite-plugin-pwa + Workbox)

- **Manifest:** `name: "Media Us"`, `short_name: "MediaUs"`, `theme_color: "#0f172a"` (slate-900), `background_color: "#ffffff"`, `display: standalone`, íconos 192x192 y 512x512.
- **Service Worker:** registro en `main.tsx` con `registerSW({ onNeedRefresh, onOfflineReady })`. Estrategia: prompt al usuario cuando hay update disponible.
- **Caché:**
  - **cache-first:** assets estáticos (JS/CSS bundles de Vite, fuentes, íconos).
  - **network-first:** Firebase Auth tokens (siempre fresco).
  - **stale-while-revalidate:** datos de Firestore (offline persistence de Firebase maneja el cache de datos automaticamente).
  - **offline fallback:** página offline custom con mensaje + datos cacheados visibles.

## Mobile UX

- **Navegación:** Bottom tab bar con 4 tabs principales: Calendario, Matriz, Servicios, Personas. Header con avatar + menú hamburguesa para: Equipos, Tipos de Servicio, Configuración, Cerrar sesión.
- **Estados por vista:**
  - **Loading:** Skeleton cards con shimmer (Framer Motion `layout` + Tailwind `animate-pulse`).
  - **Empty:** Ilustración + texto guía + CTA (ej. "No tenés servicios. Creá tu primer servicio").
  - **Error:** Toast no intrusivo + opción de retry (Firestore reconnection automático, solo mostrar si persiste > 5s).
- **Feedback visual:**
  - Optimistic UI en drag & drop y envío de invitaciones (la UI se actualiza antes de la confirmación del server, rollback si falla).
  - Toast notifications para confirmaciones (servicio creado, invitación enviada).
  - AnimatePresence para transiciones entre vistas y mount/unmount de componentes.
  - Haptic feedback en mobile para drag & drop y acciones táctiles (vía `navigator.vibrate` con fallback silencioso).

## Performance (Core Web Vitals objetivo)

- **LCP:** < 2.5s (3G). Vite code-splitting por ruta, lazy loading de vistas vía `React.lazy` + `Suspense`.
- **INP:** < 200ms. Firestore queries con índices compuestos, `useMemo`/`useCallback` en listas grandes, virtualización para calendario y matriz (react-virtuoso si es necesario).
- **CLS:** < 0.1. Tailwind con tamaños fijos para imágenes y skeletons, `aspect-ratio` en cards, evitar layout shift en carga de fuentes con `font-display: swap`.

## Decisiones (ADR liviano)

- **Zustand sobre Redux/Context** — Menos boilerplate, soporta subscribes selectivos, funciona fuera de React (útil para lógica de dominio), no requiere providers. Alternativa descartada: Redux Toolkit (overkill para este tamaño de app), Context (re-renders innecesarios).
- **Firestore offline persistence sobre IndexedDB manual** — Firebase maneja sync, conflict resolution, y cache transparente. No reinventar la rueda. Alternativa descartada: IndexedDB manual + sync engine propio (complejidad injustificada).
- **shadcn/ui sobre Material UI** — Menos bundle size (tree-shakeable), mejor integración con Tailwind, componentes copiados al repo (customizables). Alternativa descartada: MUI (pesado), Chakra (menos flexible con Tailwind).
- **Framer Motion sobre CSS transitions** — Necesitamos AnimatePresence para exit animations, gesture support para drag & drop, y layout animations. CSS solo no cubre estos casos. Alternativa descartada: react-spring (API más verbosa), CSS transitions (sin exit animations).
- **Vite sobre Next.js** — CSR puro evita hydration issues con animaciones, no hay SEO necesario (app auth-gated), build más rápido. Decisión documentada en Engram `media-us/stack`.
