# PRD — Personal Habit Tracker

## 1. Problem
A person can have many intentions—study, prayer, exercise, reading, sleep discipline—but intention alone is difficult to evaluate. A useful tracker needs to record what was actually planned and what actually happened, while allowing daily targets to vary.

## 2. Product goals
1. Reduce friction to recording daily behavior.
2. Support realistic minimum + target thresholds.
3. Make daily behavior roll up naturally into weekly/monthly progress.
4. Work reliably across devices.
5. Keep the first version simple enough to use every day.

## 3. Users
Initial user: a single personal user.
Future user model: multiple independent users, each isolated by RLS.

## 4. Core concepts
### Habit
A recurring behavior being tracked.

Examples:
- Study
- Prayer
- Push-up
- Reading
- Sleep target

### Schedule
Defines when a habit normally appears. It may be every day, selected weekdays, or a custom repeat rule supported by V1.

### Daily target
The intended value for a specific day. It inherits from the habit default unless overridden.

### Daily record
The actual result for a specific habit on a specific date. This is the historical source of truth.

### Core habit
A habit intentionally prioritized by the user. Maximum 3 active Core habits in V1.

### Optional habit
Tracked without occupying one of the 3 Core slots.

## 5. Habit tracking types
### Checkbox
Binary completion.
Example: Sleep before 23:00.

### Count
Integer quantity.
Example: Push-up target 30 reps.

### Duration
Minutes/seconds spent.
Example: Study 60 minutes.

### Time target
Stores a target or actual time value.
Example: bedtime before 23:00.

The implementation should use a small, explicit type system rather than a generic unvalidated number/string field.

## 6. Minimum vs target
For quantitative habits:
- Minimum = acceptable floor.
- Target = intended result.

Example:
- Study minimum: 30 min
- Study target: 60 min

Progress states should distinguish:
- not completed / failed
- minimum achieved
- target achieved
- above target / bonus where meaningful

The exact UI wording can be decided during design but must not turn the system into a punitive experience.

## 7. Daily target override
A habit has a default target configuration. A specific date may override it.

Example:
- Monday default: 60 min
- Tuesday override: 120 min
- Wednesday default: 60 min

Editing Tuesday must not silently change Wednesday.

## 8. Daily dashboard requirements
The Today page is the primary screen.
It should show:
- date
- overall daily progress summary
- Core habits first
- Optional habits second
- direct controls for recording progress
- habit-specific target information
- clear completion state
- quick path to add/edit habits

The most frequent action should require very few interactions.

## 9. Prayer-style multi-checklist use case
The data model must support a habit with sub-items where each sub-item can be completed independently.
Example:
- Fajr
- Dhuhr
- Asr
- Maghrib
- Isha

The product should not hard-code prayer as a special entity. It should be represented through a generic parent habit + daily checklist items model if this capability is included in V1 implementation.

## 10. Weekly progress
Weekly view must aggregate daily records over a defined week in the user's timezone.

Examples of metrics:
- completed days
- target achievement ratio
- total actual vs total target
- per-habit completion

Do not produce a single “winner” or ranking; this is a personal progress tool.

## 11. Monthly progress
Monthly view aggregates daily records for the selected month.
It should expose trends and totals without duplicating daily data.

## 12. Notes
A daily record may have a short note such as:
“Had a long campus day, but still studied for 45 minutes.”
Notes are optional and belong to the date/habit record.

## 13. Empty/error/loading states
Every data-driven screen needs:
- initial loading state
- empty state when no data exists
- actionable error state
- disabled/submitting state for mutating controls

## 14. Accessibility requirements
- semantic buttons/inputs
- form labels
- keyboard navigation
- visible focus
- touch-friendly hit areas
- status changes announced appropriately where needed
- sufficient contrast

## 15. Functional acceptance criteria
### Auth
- User can sign up/sign in/sign out.
- An unauthenticated user cannot access private tracker data.

### Habit creation
- User can create a valid habit.
- Validation prevents invalid type/target combinations.
- Core limit is enforced.

### Daily tracking
- User can record today's result.
- Reopening today shows the stored result.
- Editing a record updates the same logical record rather than creating uncontrolled duplicates.

### Historical tracking
- Previous dates can be viewed/edited according to the product's historical-edit policy.
- Weekly/monthly totals change deterministically when historical records change.

### Cross-device
- Data created on device A is visible on device B after authentication and refresh.

### Deployment
- Production build succeeds.
- Production environment variables are configured.
- Basic smoke flow succeeds against production.
