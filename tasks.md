# Tasks

> Una tarea = la unidad más chica que produce algo verificable. Implementar de a una, en orden.
> TDD: Red (test primero) → Green (implementación mínima) → Refactor.

## Fase 1: Setup & Configuración Base

### T-001: Scaffold final del proyecto
- **Depende de:** ninguna
- **Done cuando:** `npm run dev`, `npm test`, `npm run lint`, `npm run typecheck` corren en verde. Estructura de carpetas domain/ application/ infrastructure/ creada.
- **Test (TDD):** Smoke test — `App` renderiza sin crashear.
- **Estado:** [x]

### T-002: Configurar PWA baseline (manifest + SW vacío)
- **Depende de:** T-001
- **Done cuando:** `vite-plugin-pwa` instalado, `manifest.json` con nombre "Media Us", theme_color, icons 192/512. SW se registra sin errores en consola.
- **Test (TDD):** Manifest tiene `display: standalone`, name, icons.
- **Estado:** [x]

### T-003: Configurar Firebase + Firestore offline persistence
- **Depende de:** T-001
- **Done cuando:** Firebase inicializado con Auth y Firestore. `enableIndexedDbPersistence` configurado. Conexión verificada con smoke test.
- **Test (TDD):** `initializeFirebase()` resuelve sin error. `getFirestore()` devuelve instancia.
- **Estado:** [x]

## Fase 2: Capa de Dominio

### T-004: Model Service + ServiceType
- **Depende de:** T-001
- **Done cuando:** Tipos `Service` (id, date, time, typeId, notes, status) definidos en `domain/models/`. Factory `createService` con validaciones.
- **Test (TDD):** `createService` valida fecha requerida, typeId existente, status por defecto "draft". Falla con datos inválidos.
- **Estado:** [x]

### T-005: Model Team + Role + Person
- **Depende de:** T-001
- **Done cuando:** Tipos `Team` (id, name, roles[]), `Role` (id, name), `Person` (id, name, email, teamRoles[]) definidos. Factory `createTeam`, `createPerson`.
- **Test (TDD):** `createTeam` requiere name no vacío. `createPerson` requiere email válido. `assignRoleToPerson` asocia persona con rol en equipo.
- **Estado:** [x]

### T-006: Model Invitation + ServiceOrder
- **Depende de:** T-004
- **Done cuando:** Tipos `Invitation` (id, personId, serviceId, status: pending|accepted|declined) y `ServiceOrder` (id, serviceId, items[]) definidos. Item types: song, space, header, media.
- **Test (TDD):** `createInvitation` setea status "pending". `ServiceOrder` acepta items con order index. `reorderItems` actualiza posiciones.
- **Estado:** [x]

### T-007: Reglas de negocio — Conflictos de scheduling
- **Depende de:** T-005, T-006
- **Done cuando:** `canAssignPerson(service, person, existingAssignments)` implementado. Una persona no puede estar en 2 servicios a la misma hora.
- **Test (TDD):** Asignar misma persona a 2 servicios mismo horario → false. Distinto horario → true.
- **Estado:** [x]

### T-008: Reglas de negocio — Invitaciones válidas
- **Depende de:** T-005, T-006
- **Done cuando:** `canSendInvitation(personId, serviceId, teamMembers)` — solo se puede invitar a miembros del equipo asignado al servicio.
- **Test (TDD):** Invitar a miembro del equipo → true. Invitar a no-miembro → false.
- **Estado:** [x]

## Fase 3: Infraestructura

### T-009: FirebaseAuthAdapter
- **Depende de:** T-003
- **Done cuando:** `AuthAdapter` implementa `IAuthService` con `signInWithGoogle()`, `signInWithApple()`, `signInWithEmail()`, `signOut()`, `onAuthStateChanged()`.
- **Test (TDD):** Mock de Firebase Auth. `signInWithGoogle` llama a `signInWithPopup`. `signOut` llama a `signOut`. `onAuthStateChanged` emite usuario o null.
- **Estado:** [x]

### T-010: FirestoreServiceRepository
- **Depende de:** T-003, T-004
- **Done cuando:** `ServiceRepository` implementa `IServiceRepository` con `create`, `update`, `delete`, `getById`, `listByDateRange`.
- **Test (TDD):** Mock de Firestore. `create` persiste y devuelve Service. `listByDateRange` filtra por mes. `update` modifica campos parciales.
- **Estado:** [x]

### T-011: FirestoreTeamRepository + FirestorePersonRepository
- **Depende de:** T-003, T-005
- **Done cuando:** `TeamRepository` con CRUD de equipos. `PersonRepository` con CRUD de personas y búsqueda por nombre/email.
- **Test (TDD):** `create` persiste Team con roles. `listAll` devuelve todos los equipos. `searchByName("mar")` devuelve matches parciales.
- **Estado:** [x]

### T-012: FirestoreInvitationRepository + FirestoreServiceOrderRepository
- **Depende de:** T-003, T-006
- **Done cuando:** `InvitationRepository` con `create`, `updateStatus`, `listByService`. `ServiceOrderRepository` con `getByService`, `save`.
- **Test (TDD):** `listByService` devuelve solo invitaciones del servicio. `updateStatus` cambia pending→accepted. `save` persiste orden con items.
- **Estado:** [x]

## Arquitectura generada

```
src/
├── domain/models/       Service, Team, Person, Invitation, ServiceOrder
├── domain/rules/        scheduling, invitations
├── application/ports/   IAuthService, repositories
├── application/use-cases/ CreateService, SendInvitations, GetServiceMatrix, ReorderServiceItems
├── infrastructure/firebase/ firebase, auth, service-repo, team-repo, person-repo, invitation-repo, service-order-repo
└── infrastructure/ui/   AppLayout, AuthScreen, CalendarView, MatrixView, ServicesListView, ServiceDetailView, PeopleView, TeamManagementView, ThemeToggle, ui-states, useAuth
```

## Fase 4: Casos de Uso (Application Layer)

### T-013: CreateService + UpdateService + DeleteService
- **Depende de:** T-010
- **Done cuando:** `CreateService` valida, persiste y devuelve Service. `UpdateService` modifica campos. `DeleteService` elimina y limpia invitaciones asociadas.
- **Test (TDD):** `CreateService` con datos válidos → retorna Service con id. Sin fecha → lanza error. `DeleteService` elimina servicio e invitaciones asociadas.
- **Estado:** [x]

### T-014: SendInvitations + RespondToInvitation
- **Depende de:** T-012, T-008
- **Done cuando:** `SendInvitations` crea invitaciones para miembros de equipos asignados. `RespondToInvitation` cambia estado a accepted/declined.
- **Test (TDD):** Enviar invitaciones a 3 miembros → 3 invitaciones creadas con status pending. Responder accepted → status cambia. Responder a invitación inexistente → error.
- **Estado:** [x]

### T-015: GetServiceMatrix
- **Depende de:** T-011, T-012
- **Done cuando:** `GetServiceMatrix(month, year)` devuelve estructura { teams, dates, cells: { personId, personName, status } } para la matriz.
- **Test (TDD):** Para 3 equipos y 4 domingos, devuelve 3×4 celdas. Celda con persona asignada → datos completos. Celda vacía → null.
- **Estado:** [x]

### T-016: ReorderServiceItems + AddServiceItem + RemoveServiceItem
- **Depende de:** T-012
- **Done cuando:** `ReorderServiceItems` actualiza orden de items. `AddServiceItem` agrega al final con tipo válido. `RemoveServiceItem` elimina por índice.
- **Test (TDD):** Reordenar [A,B,C] → [C,A,B] persiste nuevo orden. Agregar song → item agregado al final. Eliminar índice 0 → item removido.
- **Estado:** [x]

## Fase 5: UI — Layout, Auth, Navegación

### T-017: AppLayout con bottom tabs + navegación
- **Depende de:** T-001, T-002
- **Done cuando:** Layout con header (logo, avatar, menú hamburguesa), 4 bottom tabs (Calendario, Matriz, Servicios, Personas), drawer lateral con animación. React Router configurado.
- **Test (TDD):** Renderiza 4 tabs. Click en tab → navega a ruta correcta. Drawer abre/cierra con animación. Avatar muestra iniciales.
- **Estado:** [x]

### T-018: AuthScreen + flujo de login
- **Depende de:** T-009, T-017
- **Done cuando:** Pantalla de login con Google, Apple, Email. Flujo completo: login → redirect al dashboard. Sesión persiste en recarga.
- **Test (TDD):** AuthScreen renderiza 3 botones. Click Google → llama a `signInWithGoogle`. Usuario autenticado → redirige a /app. Usuario no autenticado → ve AuthScreen.
- **Estado:** [x]

### T-019: ProtectedRoute + AuthGuard
- **Depende de:** T-018
- **Done cuando:** `ProtectedRoute` redirige a / si no hay sesión. `useAuth` hook expone user, loading, error.
- **Test (TDD):** Sin usuario → redirige a /. Con usuario → renderiza children. Loading → muestra spinner.
- **Estado:** [x]

## Fase 6: UI — Vistas Core

### T-020: CalendarView con datos reales
- **Depende de:** T-010, T-017
- **Done cuando:** Calendario mensual muestra servicios desde Firestore. Navegación entre meses. Días con servicio tienen indicador visual.
- **Test (TDD):** Renderiza 30/31 días según mes. Días con servicio muestran dot. Click en día → abre modal/form de creación. Navegación mes anterior/siguiente actualiza grid.
- **Estado:** [x]

### T-021: ServiceForm (crear/editar servicio)
- **Depende de:** T-013, T-020
- **Done cuando:** Formulario con campos: fecha, hora, tipo de servicio (select), notas. Validación client-side. Submit crea/actualiza vía use case.
- **Test (TDD):** Form inválido (sin fecha) → muestra error y no submittea. Form válido → llama a CreateService. Modo edición → precarga datos existentes.
- **Estado:** [x]

### T-022: ServicesListView con estados y contadores
- **Depende de:** T-010, T-012, T-017
- **Done cuando:** Lista de servicios ordenados por fecha. Cada card muestra: tipo, fecha, hora, estado (confirmado/pendiente/borrador), contadores accept/decline/pending.
- **Test (TDD):** Renderiza servicios en orden cronológico inverso. Contadores reflejan datos reales de invitaciones. Estado visual correcto por status.
- **Estado:** [x]

### T-023: ServiceDetailView — info + orden del servicio drag & drop
- **Depende de:** T-016, T-022
- **Done cuando:** Vista de detalle con: info del servicio, contadores de invitaciones, orden del servicio con Reorder.Group (drag & drop funcional), botón agregar item (song/space/header/media).
- **Test (TDD):** Contadores muestran valores reales. Drag item de posición 0 a 2 → `ReorderServiceItems` llamado con nuevo orden. Agregar item → `AddServiceItem` llamado.
- **Estado:** [x]

### T-024: MatrixView con datos reales
- **Depende de:** T-011, T-015, T-017
- **Done cuando:** Matriz equipos × fechas con datos de Firestore. Celdas muestran persona asignada o "Asignar" vacío. Scroll horizontal.
- **Test (TDD):** Renderiza filas = cantidad de equipos. Columnas = domingos del mes. Celda con persona → nombre visible. Click en celda vacía → abre modal de asignación.
- **Estado:** [x]

### T-025: AssignPersonModal
- **Depende de:** T-011, T-024
- **Done cuando:** Modal para asignar/desasignar persona a celda de matriz. Lista miembros del equipo. Validación de conflictos vía `canAssignPerson`.
- **Test (TDD):** Abre con miembros del equipo. Seleccionar persona → asigna. Conflicto de horario → muestra warning. Desasignar → limpia celda.
- **Estado:** [x]

### T-026: PeopleView con búsqueda
- **Depende de:** T-011, T-017
- **Done cuando:** Lista de personas con búsqueda en tiempo real. Cada item: avatar (iniciales), nombre, rol, equipo. Botón agregar persona.
- **Test (TDD):** Búsqueda "mar" → filtra personas que contienen "mar". Lista vacía → muestra empty state. Click en persona → navega a detalle.
- **Estado:** [x]

### T-027: PersonForm (crear/editar persona)
- **Depende de:** T-026
- **Done cuando:** Formulario: nombre, email, asignación a equipos y roles. Validación. Submit crea/actualiza persona.
- **Test (TDD):** Email inválido → error. Sin equipos asignados → permite crear. Con equipos → persiste asignaciones.
- **Estado:** [x]

### T-028: TeamManagementView
- **Depende de:** T-011, T-017
- **Done cuando:** Lista de equipos con: nombre, cantidad miembros, chips de roles. Botón crear equipo. Click → expande miembros.
- **Test (TDD):** Renderiza todos los equipos. Crear equipo → aparece en lista. Chip de rol muestra nombre del rol.
- **Estado:** [x]

### T-029: TeamForm con roles dinámicos
- **Depende de:** T-028
- **Done cuando:** Formulario de equipo con nombre y lista de roles (agregar/quitar dinámicamente). Submit crea/actualiza equipo.
- **Test (TDD):** Agregar 3 roles → persisten. Quitar rol → se elimina. Nombre vacío → error de validación.
- **Estado:** [x]

### T-030: InvitationPanel (enviar/gestionar invitaciones)
- **Depende de:** T-014, T-023
- **Done cuando:** Panel en ServiceDetail que muestra equipos con contadores, botón "Enviar invitaciones", lista de invitados con status y opción de cambiar estado.
- **Test (TDD):** Enviar invitaciones → llama a SendInvitations. Cambiar estado → llama a RespondToInvitation. Contadores se actualizan en tiempo real.
- **Estado:** [x]

## Fase 7: Animaciones, Estados Visuales, PWA

### T-031: Estados loading/empty/error globales
- **Depende de:** T-019
- **Done cuando:** Skeleton components para cards, tabla y lista. Empty states con ilustración + CTA. Error state con retry. Indicador "Offline" cuando Firestore pierde conexión.
- **Test (TDD):** Loading → muestra skeletons. Datos vacíos → muestra empty state. Firestore desconectado → muestra badge "Offline".
- **Estado:** [x]

### T-032: Animaciones de transición y micro-interacciones
- **Depende de:** T-017
- **Done cuando:** AnimatePresence en cambio de rutas. Layout animations en lista (servicios, personas). Gesture feedback en drag & drop. Toast notifications.
- **Test (TDD):** Navegar entre tabs → AnimatePresence ejecuta exit de vista anterior. Crear servicio → toast "Servicio creado". Drag item → haptic feedback (mock).
- **Estado:** [x]

### T-033: Tema claro/oscuro
- **Depende de:** T-017
- **Done cuando:** Toggle en header/drawer. Preferencia guardada en localStorage. Tailwind dark mode aplicado.
- **Test (TDD):** Toggle cambia clase `dark` en `<html>`. Preferencia persiste en localStorage. Sistema operativo en dark → tema oscuro por defecto.
- **Estado:** [x]

### T-034: Offline fallback + actualización SW
- **Depende de:** T-002, T-003
- **Done cuando:** Página offline cuando no hay conexión y no hay datos cacheados. Prompt "Nueva versión disponible" cuando SW detecta update.
- **Test (TDD):** Sin conexión + sin cache → muestra página offline. SW update disponible → muestra toast con botón "Actualizar".
- **Estado:** [x]

## Fase 8: Integración & Polish

### T-035: Integración end-to-end de flujos core
- **Depende de:** T-020 a T-034
- **Done cuando:** Flujo completo verificable: crear iglesia → crear equipos → crear personas → asignar a equipos → crear tipo servicio → crear servicio → enviar invitaciones → responder → ver matriz actualizada → editar orden → todo offline.
- **Test (TDD):** Integration test que cubre el happy path completo con Firestore emulator.
- **Estado:** [x]

### T-036: Accesibilidad y performance
- **Depende de:** T-035
- **Done cuando:** Lighthouse score > 90 PWA + > 90 Accessibility. LCP < 2.5s, CLS < 0.1. Navegación por teclado en componentes clave. Roles ARIA en tabs, modales, listas.
- **Test (TDD):** Lighthouse audit en CI. `axe-core` accessibility scan sin violations críticas. `userEvent.tab()` navega por tabs correctamente.
- **Estado:** [x]
