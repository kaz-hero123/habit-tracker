# Data Model — Personal Habit Tracker

## 1. Design principle
Daily records are the historical source of truth. Weekly/monthly progress is derived.

## 2. Entities
### profiles
Purpose: application-level profile tied to Supabase Auth.

Suggested fields:
- `id` UUID PK, references `auth.users.id`
- `display_name` text nullable
- `timezone` text not null, default `Asia/Jakarta`
- `created_at`
- `updated_at`

### habits
Purpose: defines a recurring behavior.

Suggested fields:
- `id` UUID PK
- `user_id` UUID FK -> profiles.id
- `name` text not null
- `description` text nullable
- `tracking_type` enum/text: `checkbox | count | duration | time`
- `minimum_value` numeric nullable
- `target_value` numeric nullable
- `unit` text nullable
- `is_core` boolean not null default false
- `is_active` boolean not null default true
- `archived_at` timestamp nullable
- `created_at`
- `updated_at`

Constraints:
- validation must prevent nonsensical target combinations.
- core count cannot exceed 3 active habits per user.

### habit_schedules
Purpose: recurring appearance/default target rules.

Suggested fields:
- `id` UUID PK
- `habit_id` UUID FK
- `day_of_week` smallint (0-6 or 1-7; pick one convention and use it everywhere)
- `target_value` numeric nullable
- `minimum_value` numeric nullable
- `is_active` boolean
- `created_at`
- `updated_at`

### habit_target_overrides
Purpose: target/minimum changes for one calendar date.

Suggested fields:
- `id` UUID PK
- `habit_id` UUID FK
- `target_date` date
- `minimum_value` numeric nullable
- `target_value` numeric nullable
- `created_at`
- `updated_at`

Unique constraint:
`(habit_id, target_date)`

### habit_records
Purpose: actual result for a habit on a calendar date.

Suggested fields:
- `id` UUID PK
- `habit_id` UUID FK
- `record_date` date
- `minimum_value_snapshot` numeric nullable
- `target_value_snapshot` numeric nullable
- `actual_value` numeric nullable
- `status` enum/text appropriate to tracking model
- `note` text nullable
- `created_at`
- `updated_at`

Unique constraint:
`(habit_id, record_date)`

The snapshot fields exist so historical interpretation remains stable even if future default targets change.

### habit_record_items (optional for V1 checklist sub-items)
Purpose: independent completion of sub-items belonging to one daily habit record.

Suggested fields:
- `id` UUID PK
- `habit_record_id` UUID FK
- `label` text not null
- `is_completed` boolean not null default false
- `position` integer not null
- `created_at`
- `updated_at`

This keeps multi-checklist behavior generic rather than hard-coding one specific use case.

## 3. Relationship diagram
```text
profiles
  |
  +----< habits
           |
           +----< habit_schedules
           |
           +----< habit_target_overrides
           |
           +----< habit_records
                    |
                    +----< habit_record_items
```

## 4. RLS requirements
For every user-owned path, enforce ownership through `auth.uid()` and trusted foreign-key relationships.

Required checks:
- user can select own profile
- user can insert/update/delete own habits
- user can manage schedules for own habits
- user can manage overrides for own habits
- user can manage records for own habits
- user can manage sub-items for own records

Add indexes supporting common queries:
- `habits(user_id, is_active)`
- `habit_records(habit_id, record_date)`
- `habit_records(record_date)` only if query planner/data size makes it useful

## 5. Progress formulas
### Checkbox
`actual_value = 1` when completed, otherwise `0`.

### Count / Duration
Daily target achievement:
- target percentage = `actual_value / target_value` when target > 0.

Minimum threshold:
- minimum achieved when `actual_value >= minimum_value`.

Target achieved:
- target achieved when `actual_value >= target_value`.

For checkbox, achieved/failed is sufficient unless product design introduces partial state.

### Weekly/monthly aggregate
For quantitative habits:
`completion_ratio = sum(actual_value) / sum(target_value)` for applicable scheduled records.

For checkbox/sub-item habits:
Use completed opportunities divided by scheduled opportunities.

Do not silently mix unscheduled days into the denominator.

## 6. Historical target rule
When a daily record is first created, save the effective minimum/target into snapshot fields.
Editing future defaults must not mutate old record snapshots.

## 7. Archive rule
Archived habits remain queryable for historical progress but do not appear in active daily tracking.
