# Decision Log

Use this file for decisions that materially change architecture, scope, data model, UX navigation, security, or deployment.

## Status values
- proposed
- accepted
- superseded
- rejected

## Template
```md
## DEC-XXX — Title
Date: YYYY-MM-DD
Status: accepted

### Context
Why the decision was needed.

### Decision
What we chose.

### Alternatives considered
Short list.

### Consequences
What this makes easier/harder.

### Documents affected
List affected docs.
```

## DEC-001 — Cloud-first personal architecture
Date: 2026-09-19
Status: accepted

### Context
The application must be accessible from multiple devices and must persist data without requiring a local server.

### Decision
Use Next.js App Router + Supabase PostgreSQL/Auth + Vercel + PWA baseline.

### Consequences
The database is remote and persistent. Development requires Supabase environment configuration. Local-only storage is not authoritative.

### Documents affected
SOURCE_OF_TRUTH, ARCHITECTURE, DATA_MODEL, DEPLOYMENT.

## DEC-002 — Daily records are canonical
Date: 2026-09-19
Status: accepted

### Context
Weekly/monthly progress must remain consistent when historical daily entries change.

### Decision
Store daily records as canonical history and derive weekly/monthly statistics from them.

### Consequences
No mutable weekly/monthly snapshot tables are required in V1.

### Documents affected
SOURCE_OF_TRUTH, PRD, DATA_MODEL, IMPLEMENTATION_PLAN.

## DEC-003 — Minimum + Target model
Date: 2026-09-19
Status: accepted

### Context
A rigid pass/fail target can discourage behavior when daily capacity changes.

### Decision
Quantitative habits support a minimum floor and a target goal. Daily targets can be overridden.

### Consequences
The data model needs effective target resolution and historical target snapshots.

### Documents affected
PRD, DATA_MODEL, UX_SPEC.

## DEC-004 — Core habit cap
Date: 2026-09-19
Status: accepted

### Context
The product should prevent the user from turning every intention into a mandatory daily obligation.

### Decision
Maximum 3 active Core habits in V1.

### Consequences
Core/Optional must be visible and the limit must be enforced in domain/application logic.

### Documents affected
SOURCE_OF_TRUTH, PRD, DATA_MODEL.

## DEC-005 — Auth Proxy Pattern
Date: 2026-09-20
Status: accepted

### Context
Next.js 16 deprecated standard `middleware.ts` relying on edge runtimes. Supabase auth requires token verification on protected routes.

### Decision
Use `proxy.ts` pattern with `@supabase/ssr` at the project root for centralized, un-bypassable auth protection for all private routes. Use Server Actions for auth workflows.

### Consequences
Eliminates Edge runtime constraints for auth verification. Provides reliable route protection before Server Components execute.

### Documents affected
ARCHITECTURE, IMPLEMENTATION_PLAN.
