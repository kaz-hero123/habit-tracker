# Architecture — Personal Habit Tracker

## 1. Architecture style
Cloud-first monolith.

Frontend and server-side application layer: Next.js App Router.
Database/Auth: Supabase.
Deployment: Vercel.
Client installation: PWA baseline.

Reference principles:
- Next.js App Router is the primary application router.
- Supabase Auth uses cookie-based SSR integration appropriate for Next.js.
- Supabase RLS is mandatory for user-owned tables.
- Vercel is the production host.

## 2. Logical architecture
```text
Browser / Installed PWA
        |
        v
Next.js App Router
  |       |       |
  |       |       +--> UI / Client Components
  |       +----------> Server Components / Actions / Route Handlers
  +------------------> Auth/session boundary
        |
        v
Supabase client layer
        |
        +--> Auth
        +--> Postgres + RLS
```

## 3. Application layers
### Presentation
`app/`, `components/`
- routes
- layouts
- UI primitives
- feature-specific UI

### Domain/application logic
`lib/` or `src/lib/`
- habit rules
- progress calculation
- validation
- date/time utilities
- use-case services

### Data access
`lib/supabase/` and focused repositories/query modules when needed.
Keep database access out of purely presentational components.

### Database
Supabase PostgreSQL with migrations and RLS policies.

## 4. Recommended project structure
Adapt only when the actual starter/project structure demands it.

```text
app/
  (auth)/
  (dashboard)/
  api/                 # only if route handlers are actually needed
  layout.tsx
  manifest.ts          # or equivalent Next.js metadata route
components/
  ui/
  habits/
  dashboard/
  progress/
lib/
  supabase/
  habits/
  progress/
  dates/
  validations/
supabase/
  migrations/
docs/
public/
tests/
```

## 5. Supabase client strategy
Use the current official Supabase guidance for Next.js SSR. At the time this document was written, Supabase documents `@supabase/ssr` for cookie-based sessions in SSR frameworks and distinguishes browser/server clients. Verify the exact current API against official docs/Context7 before implementation.

Never hard-code URLs, keys, service-role secrets, or tokens.

## 6. Authentication boundary
Authenticated pages must have access to the current user through the server/session boundary.
Do not rely only on client-side route guards for authorization.

## 7. RLS strategy
All user-owned tables include `user_id` directly or derive ownership through a trusted relationship.
Policies must enforce `auth.uid() = user_id` or the equivalent owner relationship.

Never use the Supabase service-role key in browser code.

## 8. Data ownership
The database is the system of record.
Client state is for interaction; server/database state is authoritative.

## 9. Caching
Avoid caching personalized authenticated responses in a way that can leak a user's session/data to another user.
Follow the current Supabase + Next.js guidance for authenticated routes and session refresh.

## 10. Error handling
- Validate user input before mutation.
- Return typed/domain-level errors where practical.
- Log actionable server errors without secrets.
- Show user-safe messages.
- Do not leak database internals to the UI.

## 11. Date/time policy
Store timestamps in database-native timestamp formats and treat habit record dates as calendar dates in the user's configured timezone.
Do not mix UTC calendar date logic with local calendar-day semantics.

Default personal timezone: `Asia/Jakarta`.

## 12. Performance posture
This is a small personal application.
Optimize for correctness and maintainability before micro-optimizations.
Avoid premature caching layers, state managers, or background jobs.

## 13. PWA posture
V1 includes installability basics:
- manifest
- app icons
- metadata
- HTTPS in production

Offline mutation synchronization is explicitly out of scope for V1.
A service worker may be added only when its behavior is clearly defined and tested.

## 14. Deployment topology
```text
GitHub repository
      |
      v
Vercel build/deploy
      |
      v
Production Next.js app
      |
      v
Supabase project
```

## 15. Technology selection constraints
Prefer the smallest dependency set that solves the requirement.
Do not add Redux, Zustand, Prisma, Drizzle, tRPC, GraphQL, a separate backend server, or a native app layer unless a documented requirement appears that cannot be handled cleanly without it.
