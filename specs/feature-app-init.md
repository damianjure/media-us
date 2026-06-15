# Spec — Inicialización de App: Cronograma de Servicios

> Stack: React 18 + Vite + TypeScript strict + Tailwind + shadcn/ui + Framer Motion + Firebase (Auth, Firestore offline) + vite-plugin-pwa (Workbox) + Vitest + Testing Library.

## Outcomes

- [ ] La app es instalable como PWA en Android, iOS y desktop, con manifest, iconos y splash screen.
- [ ] El usuario puede autenticarse con Google, Apple o email/contraseña (Firebase Auth) y mantener sesión entre recargas.
- [ ] El usuario puede crear, editar y eliminar servicios con fecha, hora, tipo de servicio y notas.
- [ ] Existe una vista de calendario (mes/semana) que muestra todos los servicios programados.
- [ ] La matriz de servicios muestra equipos (filas) × fechas (columnas) con asignaciones de personas.
- [ ] El usuario puede crear equipos, asignar roles y agregar personas a equipos.
- [ ] El sistema de invitaciones permite enviar invitaciones por servicio a miembros de equipo, con estados: Aceptado, Declinado, Pendiente — visibles con contadores por equipo.
- [ ] El orden del servicio es un builder drag & drop con items tipados (canción, espacio, encabezado, media).
- [ ] Las vistas core (calendario, matriz, servicios, personas) funcionan offline con datos cacheados vía Firestore offline persistence.
- [ ] Las transiciones entre vistas y micro-interacciones usan Framer Motion con fluidez (60fps).

## Scope In

- PWA completa con Service Worker, manifest, instalación
- Autenticación con Google, Apple y email/contraseña (Firebase Auth)
- CRUD de servicios (fecha, hora, tipo, notas, estado)
- Vista de calendario mensual y semanal
- Matriz de servicios (cruce equipos × fechas)
- CRUD de equipos con roles configurables
- CRUD de personas con asignación a equipos y roles
- Sistema de invitaciones (enviar, accept, decline, pending) con notificaciones visuales
- Builder de orden del servicio drag & drop con tipos: canción, espacio, encabezado, media
- Firestore offline persistence para vistas core
- Animaciones y transiciones con Framer Motion
- Tipos de servicio (Domingo, Especial, etc.) como templates
- Tema claro/oscuro (Tailwind dark mode)

## Scope Out

- Notificaciones push (fase 2 — requiere backend/FCM)
- Biblioteca de canciones completa con metadatos (fase 2)
- Mensajería/chat interno entre miembros (fase 2)
- Adjuntos de archivos por servicio (fase 2)
- Impresión/exportación PDF (fase 3)
- Múltiples organizaciones/iglesias (single-org en MVP)
- Roles de usuario (admin, líder, miembro) — solo propietario en MVP
- Integración con ProPresenter u otras herramientas externas
- Stripe/suscripciones (fase 3)
- Modo multi-idioma (solo español en MVP)
- Tests E2E con Playwright (solo unitarios + integración en MVP)

## Criterios de aceptación (BDD)

### CA-1: Instalación PWA
- **Given** que el usuario abre la app en Chrome/Safari en Android/iOS o desktop
- **When** navega a la URL y el navegador detecta el manifest
- **Then** el navegador ofrece instalar la app y, al aceptar, se agrega al home screen con ícono y nombre "Media Us"

### CA-2: Offline funcional
- **Given** que el usuario está autenticado y ha visitado las vistas core al menos una vez
- **When** pierde conexión a internet
- **Then** puede navegar calendario, matriz, servicios y personas con los datos cacheados, y ve un indicador "Offline" no intrusivo

### CA-3: Login con Google, Apple y email
- **Given** que un usuario no autenticado abre la app
- **When** elige "Google", "Apple" o "Email" y completa el flujo de autenticación
- **Then** es redirigido al dashboard, su perfil se crea en Firestore, y la sesión persiste tras recargar

### CA-4: CRUD de servicios
- **Given** que el usuario está autenticado y en la vista de calendario
- **When** hace clic en un día, completa el formulario (fecha, hora, tipo, notas) y guarda
- **Then** el servicio aparece en el calendario y en la lista de servicios

### CA-5: Matriz de servicios
- **Given** que existen equipos con miembros y servicios programados
- **When** el usuario navega a la vista de matriz
- **Then** ve una grilla con equipos como filas, fechas como columnas, y celdas que muestran las personas asignadas (o vacías si nadie asignado)

### CA-6: Invitaciones con estados
- **Given** que un servicio tiene equipos asignados con miembros
- **When** el usuario envía invitaciones desde el panel del servicio
- **Then** cada miembro ve la invitación con opciones Accept/Decline, y el líder ve contadores por equipo (Aceptado: N, Declinado: N, Pendiente: N)

### CA-7: Orden del servicio drag & drop
- **Given** que el usuario está en el editor de orden del servicio
- **When** arrastra un item (canción, espacio, encabezado) y lo suelta en otra posición
- **Then** el orden se reordena visualmente con animación y se persiste en Firestore

### CA-8: Animaciones y transiciones
- **Given** que el usuario navega entre vistas o interactúa con elementos
- **When** cambia de calendario a matriz, expande un servicio, o arrastra un item
- **Then** las transiciones son fluidas (AnimatePresence de Framer Motion), sin saltos ni lag perceptible
