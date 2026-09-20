# Personal Habit Tracker — Source of Truth

## 1. Product identity
Working name: Personal Habit Tracker
Product type: private, cloud-first personal web application / PWA
Primary user: one personal user initially
Primary devices: smartphone and laptop/desktop
Primary goal: make daily behavior visible and sustainable without turning the app into an overwhelming checklist.

## 2. Product principle
> It is better to consistently complete a small number of meaningful habits than to create a large idealized list that is rarely completed.

The product measures behavior over time. It does not punish imperfect days and does not optimize for streaks at the expense of sustainable routines.

## 3. Core product rules
- A habit may have a minimum threshold and a target threshold.
- Daily targets may differ by date.
- Some habits are checklist-based; others are quantitative or duration-based.
- A habit can optionally contain multiple daily checklist items.
- Weekly and monthly progress are derived from daily records.
- Up to 3 habits may be marked as Core at once in the initial version.
- Optional habits may be tracked without being Core.
- The user's data is stored in Supabase, not only on the device.
- The app is usable on the web and installable as a PWA.
- Authentication is required so data is associated with the correct user.

## 4. Initial scope
### Must have
- Authentication
- Today dashboard
- Create/edit/archive habit
- Habit types: checkbox, count, duration, time target
- Minimum and target values where applicable
- Per-day target override
- Schedule/repeat configuration
- Daily completion/record entry
- Weekly progress view
- Monthly progress view
- Notes on a daily record
- Core vs Optional habit distinction
- Responsive mobile-first UI
- Supabase PostgreSQL persistence
- Supabase Auth
- Row Level Security
- Vercel deployment
- PWA manifest/installability baseline
- Validation, empty/loading/error states
- Automated tests for progress calculations and important user flows

### Explicitly out of scope for V1
- AI coaching
- Social accounts/following
- Public profiles
- Leaderboards
- Complex gamification
- Paid subscriptions
- Native mobile apps
- Smartwatch integration
- Calendar integrations
- Push notifications
- Offline conflict-resolution engine
- Multi-tenant teams/workspaces

## 5. Success criteria
The user can:
1. Sign in from a phone or laptop.
2. Create a habit with an appropriate tracking type.
3. Set minimum/target values and a schedule.
4. Override today's target without changing future defaults.
5. Record today's progress quickly.
6. See daily completion clearly.
7. See weekly and monthly aggregate progress derived from daily data.
8. Open the same account on another device and see the same data.
9. Install the web app to a compatible phone home screen.
10. Deploy the application on Vercel with production environment variables configured safely.

## 6. Product invariants
- One user's records must never be visible to another user.
- `habit_records` is the canonical source for historical performance.
- Derived progress must be deterministic from stored daily records.
- Future target defaults must not be rewritten by editing a single historical day's target.
- Archived habits remain in historical data but stop appearing in active daily tracking.
- Time-based logic must use an explicit user timezone; initial default is the user's configured timezone, with Asia/Jakarta as the default for the first personal deployment.

## 7. Change control
Any change to scope, entity relationships, progress formulas, authentication model, deployment model, or major UI navigation must be documented in `docs/DECISION_LOG.md` before implementation.
