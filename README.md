# Personal Habit Tracker — Source of Truth Package

This folder contains the project contract intended to be copied into the root of the Antigravity project.

## Recommended copy layout
```text
project-root/
  AGENTS.md
  ANTIGRAVITY_MASTER_PROMPT.md   # optional; paste into the Antigravity session
  docs/
    SOURCE_OF_TRUTH.md
    PRD.md
    ARCHITECTURE.md
    DATA_MODEL.md
    UX_SPEC.md
    IMPLEMENTATION_PLAN.md
    QA.md
    DEPLOYMENT.md
    DECISION_LOG.md
```

## How to use
1. Copy the files into the repository root.
2. Open the repository in Antigravity.
3. Ensure the project-specific skills you want are installed/available under `.agents/skills`.
4. Give Antigravity the content of `ANTIGRAVITY_MASTER_PROMPT.md` as its primary execution instruction.
5. Let the agent inspect the repository and documents before implementation.
6. Review `docs/DECISION_LOG.md` whenever a major architectural/product decision appears.

The docs deliberately avoid pinning exact dependency versions because framework/package APIs evolve. Exact versions and setup commands should be verified against current official documentation or Context7 at implementation time.
