# AGENTS.md — Habit Tracker Engineering Contract

## Mission
Build a personal, cloud-first habit and progress tracker that works across laptop and phone. The product prioritizes realistic consistency over quantity of habits.

## Non-negotiable source-of-truth order
When documents conflict, resolve in this order:
1. `docs/SOURCE_OF_TRUTH.md`
2. `docs/PRD.md`
3. `docs/ARCHITECTURE.md`
4. `docs/DATA_MODEL.md`
5. `docs/UX_SPEC.md`
6. `docs/IMPLEMENTATION_PLAN.md`
7. `docs/QA.md`
8. `docs/DEPLOYMENT.md`
9. `docs/DECISION_LOG.md` for recorded exceptions/decisions
10. Existing code

Existing code is NOT authoritative when it conflicts with the documents.

## Agent operating rules
1. Read all source-of-truth documents before modifying code.
2. Inspect the repository and installed project skills before implementation.
3. Prefer existing skills in `.agents/skills` when they are relevant, especially spec-driven development, planning/task breakdown, UI/design review, browser testing, and Git workflows.
4. Do not add product features that are not in the current PRD or explicitly recorded in `docs/DECISION_LOG.md`.
5. If an implementation choice is required and not specified, choose the smallest maintainable option that preserves the PRD, then record the decision before coding the affected area.
6. Do not rewrite project structure, architecture, or data models casually. Any structural change must be documented first.
7. Do not replace a working approach merely because another library/framework is fashionable.
8. Use official documentation and Context7/current project documentation for framework/library questions instead of guessing APIs.
9. Never expose secrets in source code. Keep environment variables in `.env.local` and document required variables in `.env.example`.
10. Database access must respect Supabase Row Level Security. A user must only be able to access their own data.
11. Do not use localStorage as the source of truth for habit records. Local state/cache may exist for UX, but Supabase is authoritative in online mode.
12. Keep daily records as the canonical source for weekly/monthly progress calculations.
13. Do not duplicate derived statistics as mutable database state unless a documented performance reason appears.
14. Prefer Server Components by default in Next.js App Router. Use Client Components only when interactivity/browser APIs require them.
15. Keep authenticated routes protected and avoid accidental caching of personalized authenticated responses.
16. Build mobile-first because daily checklist usage is expected primarily on phones.
17. Accessibility is part of done: semantic HTML, keyboard operation, visible focus, labels, sensible contrast, and touch-friendly controls.
18. Tests are part of implementation, not an afterthought.
19. Before declaring a phase complete, run the applicable lint/typecheck/tests/build and fix failures.
20. Do not claim deployment success unless the deployed URL/build has actually been verified.

## Execution behavior
Work phase-by-phase according to `docs/IMPLEMENTATION_PLAN.md`.
For each phase:
- state the intended outcome in the task notes;
- inspect the relevant documents;
- implement only that phase;
- verify with tests/build/browser checks;
- update the decision log if anything changed materially;
- mark acceptance criteria complete only when evidence exists.

## Definition of done
A feature is not done when the code exists. It is done when:
- documented behavior is implemented;
- data access is secure;
- errors/loading/empty states exist where relevant;
- responsive behavior is verified;
- tests cover the important logic;
- lint/typecheck/build pass;
- browser smoke/E2E checks pass for affected flows;
- source-of-truth documents match the implementation.
