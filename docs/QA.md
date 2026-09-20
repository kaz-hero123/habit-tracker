# QA Strategy — Personal Habit Tracker

## 1. Test pyramid
### Unit tests
Cover pure logic:
- target resolution
- daily status classification
- weekly aggregation
- monthly aggregation
- schedule inclusion/exclusion
- timezone/date boundaries

### Integration tests
Cover:
- habit CRUD against a test database/project strategy
- RLS ownership checks
- auth/session behavior where practical

### E2E/browser tests
Use Playwright or the project's approved browser testing skill.
Minimum smoke flows:
1. open app
2. sign in
3. create habit
4. record today's progress
5. refresh and verify persistence
6. open Week and verify aggregate
7. edit historical record
8. verify aggregate changed
9. sign out

## 2. Critical cases
- target = 0
- minimum > target
- null target for checkbox
- unscheduled day
- historical record on month boundary
- timezone crossing midnight
- duplicate daily record mutation
- archived habit
- more than 3 active Core habits
- another user trying to access IDs they do not own

## 3. Browser checks
At minimum verify:
- mobile viewport
- desktop viewport
- keyboard-only interaction for forms
- visible focus
- network/server error feedback

## 4. Definition of release-ready
All required commands pass:
- lint
- typecheck
- unit tests
- integration tests when configured
- E2E smoke tests
- production build

And manual smoke test succeeds against the deployed environment.
