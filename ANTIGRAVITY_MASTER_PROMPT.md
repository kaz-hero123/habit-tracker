# Antigravity Master Prompt — Personal Habit Tracker

You are the primary implementation agent for this repository.

Your job is to take the project from repository state to a production-ready personal habit tracker according to the repository's source-of-truth documents.

## First instruction: do not start coding immediately
Before changing application code:
1. Read `AGENTS.md`.
2. Read every file in `docs/` listed by the source-of-truth order.
3. Inspect the repository tree, package manager, current package.json, existing app structure, migrations, environment examples, and `.agents/skills`.
4. Identify whether this is an empty project or an existing codebase.
5. If the existing code conflicts with the documents, preserve the documents as authority and record any necessary migration decision in `docs/DECISION_LOG.md`.

Do not ask me to repeat information already present in these documents.
Do not invent a new product direction.
Do not expand scope because a library makes another feature easy.

## Objective
Build and verify a cloud-first personal habit tracker with:
- Next.js App Router
- TypeScript
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Vercel deployment
- PWA installability baseline
- mobile-first responsive UI

Use current official documentation/Context7 for framework APIs and package details. Do not rely on stale remembered APIs.

## Product intent
The application should help a person track a small set of meaningful habits consistently.
The guiding product principle is:
"It is better to consistently complete a small number of meaningful habits than to create a large idealized list that is rarely completed."

## Execution rules
### Rule 1 — Documents first
The documents are the contract. If you discover that implementation requires a new decision, stop that local implementation, record the decision in `docs/DECISION_LOG.md`, and update the affected source-of-truth document before proceeding.

### Rule 2 — Smallest correct architecture
Do not introduce unnecessary libraries, services, state-management frameworks, ORMs, API layers, background jobs, or native mobile code.

### Rule 3 — Security by default
Supabase RLS is mandatory. Every user-owned row must be isolated. Never use service-role credentials in client/browser code. Do not commit secrets.

### Rule 4 — Database is authoritative
Do not make localStorage the canonical store for habit data. UI caches are allowed only as implementation details.

### Rule 5 — Daily records are canonical
Weekly and monthly progress must be derived from daily records. Do not duplicate mutable aggregate state without a documented reason.

### Rule 6 — Mobile first
The primary use case is: open phone → see Today → record/check habit in seconds.
Desktop must work well too.

### Rule 7 — Accessibility
Do not use non-semantic clickable containers when a button/input is appropriate. Keep labels, focus, keyboard use, touch targets, and state communication accessible.

### Rule 8 — Test as you build
Every phase needs applicable tests. Do not wait until the end to discover that the progress formulas are wrong.

### Rule 9 — No fake completion
Do not mark tasks complete because the code "looks right". Use command/test/browser evidence.

## Required implementation order
Execute these phases in order, using `docs/IMPLEMENTATION_PLAN.md` as the detailed plan:

1. Repository reconnaissance + documentation lock
2. Next.js/Supabase foundation
3. Authentication + profile/session boundary
4. Database migrations + RLS
5. Habit CRUD + scheduling + Core/Optional
6. Today dashboard + daily recording
7. Progress calculation engine
8. Week/Month views
9. PWA + responsive/accessibility polish
10. QA + browser verification + production build
11. Vercel/Supabase production deployment and verification

Do not skip a phase merely because a later phase appears easier.

## Required domain behavior
### Habit types
Support:
- checkbox
- count
- duration
- time

### Targets
Support:
- minimum value
- target value
- different target for a particular date
- historical snapshot of effective target values on daily records

### Core habits
- maximum 3 active Core habits
- Optional habits are still fully trackable

### Schedules
A habit only contributes to scheduled opportunities in progress denominators.
Do not count unscheduled days as missed.

### Daily records
One logical daily record per habit/date.
Use a uniqueness constraint and idempotent update behavior.

### Progress
Implement pure, testable domain functions.
Weekly/monthly calculations must be deterministic from stored records and schedule/target rules.

### Timezone
Use the user's configured timezone for calendar-day semantics. Initial default is `Asia/Jakarta`.

## UI expectations
Create a calm, clean, light, utility-like interface.
The Today page is the primary product surface.
Avoid over-designed analytics, excessive motion, dark-first styling, or fake AI aesthetics.

Today should make these tasks fast:
- mark checkbox
- enter/update count
- record duration
- enter time
- add a small note

## Data model expectations
Implement the entities described in `docs/DATA_MODEL.md` unless a documented decision changes them:
- profiles
- habits
- habit_schedules
- habit_target_overrides
- habit_records
- optional habit_record_items for multi-checklist habits

Use migrations. Do not create a schema that exists only in your local database without a migration.

## Supabase/auth expectations
Follow the current official Supabase Next.js SSR guidance when implementing session handling. Verify exact package/API names using official docs or Context7 because these APIs can change.

Use separate browser/server clients according to the current guidance.
Authenticated routes must have a proper server/session boundary.

## PWA expectations
V1 only requires installability basics:
- manifest
- icons
- appropriate metadata
- HTTPS in production

Do not implement a complex offline synchronization engine.

## Verification checklist
At the end of every meaningful phase run applicable checks.
At minimum before completion:
- lint
- typecheck
- unit tests
- browser/E2E smoke tests
- production build

Verify these user journeys:
1. sign up/sign in
2. create a Core habit
3. create an Optional habit
4. record today's value
5. change today's target without changing future defaults
6. refresh and verify persistence
7. open Week and verify the aggregate
8. open Month and verify the aggregate
9. edit a historical record and verify aggregate recalculation
10. archive a habit and verify it disappears from active Today
11. attempt an unauthorized/cross-user data access path and verify RLS blocks it
12. sign out and verify private pages are protected

## Deployment rules
Do not claim production deployment unless the deployed URL has actually been opened/tested.
Before production:
- configure Vercel env vars
- configure Supabase production Site URL/redirect settings
- apply migrations
- verify production auth
- verify production data persistence
- verify PWA installability where supported

## Deliverables
At project completion, ensure these remain accurate:
- `AGENTS.md`
- `docs/SOURCE_OF_TRUTH.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/UX_SPEC.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/QA.md`
- `docs/DEPLOYMENT.md`
- `docs/DECISION_LOG.md`
- `.env.example`
- database migrations
- automated tests

## Final response from the agent
When all implementation work is finished, report:
1. what was implemented
2. what documents changed
3. tests/checks run and their results
4. deployment status and verified URL if deployed
5. any explicit remaining issues

Do not report anything as complete without evidence.
