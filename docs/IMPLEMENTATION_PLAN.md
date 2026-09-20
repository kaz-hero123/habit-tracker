# Implementation Plan — Personal Habit Tracker

## Phase 0 — Repository reconnaissance and documentation lock
### Tasks
- inspect repository state
- inspect package manager and existing dependencies
- inspect `.agents/skills`
- inspect current project structure
- create/update source-of-truth docs
- identify whether project is empty or existing
- record technical assumptions in decision log

### Exit criteria
- documents exist
- repository strategy is understood
- no code is changed for product features yet

## Phase 1 — Foundation
### Tasks
- initialize/align Next.js App Router project
- configure TypeScript and linting
- configure Tailwind or the chosen styling system already approved by the project
- configure Supabase browser/server clients following current official guidance
- configure environment variables
- create minimal app shell
- establish base UI primitives

### Exit criteria
- local app starts cleanly
- typecheck/lint/build pass
- Supabase client configuration is valid
- no secrets committed

## Phase 2 — Authentication and user boundary
### Tasks
- sign-up
- sign-in
- sign-out
- auth error handling
- session handling
- protected dashboard route
- profile creation/initialization
- RLS verification

### Exit criteria
- authenticated user can access tracker
- unauthenticated user is redirected/rejected appropriately
- database policies prevent cross-user access

## Phase 3 — Database migrations and domain model
### Tasks
- create migrations for profile/habit/schedule/override/record entities
- create enums/check constraints where useful
- add ownership indexes
- create RLS policies
- seed only development-safe data when useful

### Exit criteria
- schema applies from a clean database
- RLS passes tests/manual verification
- data model matches `docs/DATA_MODEL.md`

## Phase 4 — Habit management
### Tasks
- create habit
- edit habit
- archive habit
- Core/Optional assignment
- enforce max 3 active Core habits
- schedule management
- default minimum/target management
- per-date target override

### Exit criteria
- habit lifecycle works end-to-end
- invalid target combinations are rejected
- archived habits disappear from active lists

## Phase 5 — Today dashboard
### Tasks
- daily habit query based on user timezone/date
- effective target calculation
- Core/Optional grouping
- direct record input
- checkbox/count/duration/time controls
- note input
- loading/empty/error states

### Exit criteria
- daily actions are fast on mobile
- reopening page reflects saved data
- record uniqueness is enforced

## Phase 6 — Progress engine
### Tasks
- implement pure domain functions for daily status
- weekly aggregate calculation
- monthly aggregate calculation
- scheduled-day denominator handling
- multi-item checklist aggregation where enabled
- unit tests for boundary cases

### Exit criteria
- progress formulas are covered by tests
- calculations are deterministic and timezone-aware
- UI consumes domain functions rather than reimplementing formulas ad hoc

## Phase 7 — Week and Month views
### Tasks
- weekly summary
- per-habit progress
- calendar/grid if helpful
- monthly summary
- trend comparison only if already specified
- historical drill-down

### Exit criteria
- values reconcile with raw daily records
- historical edits update aggregates correctly

## Phase 8 — PWA and responsive polish
### Tasks
- manifest
- icons
- mobile layout refinement
- installability verification
- accessibility review

### Exit criteria
- install prompt/installation is available on a supported browser in production/HTTPS
- core mobile actions are usable
- accessibility smoke checks pass

## Phase 9 — QA and hardening
### Tasks
- unit tests
- integration tests where valuable
- Playwright/browser smoke tests
- auth flow tests
- CRUD flow tests
- cross-device/data persistence verification
- error/loading state review
- security review of RLS and env handling

### Exit criteria
- lint/typecheck/unit/E2E/build pass
- no known blocking defects

## Phase 10 — Production deployment
### Tasks
- connect GitHub repository to Vercel
- configure production environment variables
- configure Supabase production URL/site/auth redirect settings
- deploy preview
- run smoke test on preview
- deploy production
- verify production URL
- record deployment details in docs

### Exit criteria
- production URL works
- auth works in production
- data persistence works
- PWA installability verified where supported

## Phase 11 — Post-launch stabilization
### Tasks
- use the app for real personal tracking
- collect only clearly observed defects/friction
- update PRD before expanding scope

### Exit criteria
- any new feature request is converted into a documented change before implementation
