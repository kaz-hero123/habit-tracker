# UX Specification — Personal Habit Tracker

## 1. UX direction
Clean, light, calm, practical, mobile-first.

The interface should feel like a personal utility rather than a gamified productivity dashboard.
Avoid visual noise, excessive gradients, fake “AI dashboard” aesthetics, and dense analytics on the primary screen.

## 2. Navigation
Primary navigation for mobile:
- Today
- Week
- Month
- More

Desktop may use a sidebar/top navigation if it improves readability without diverging from the mobile information architecture.

## 3. Today screen
Order:
1. greeting/date
2. overall daily progress
3. Core habits
4. Optional habits
5. quick add/manage controls

Each habit card should expose its relevant input directly.

Examples:
- checkbox: one-tap completion
- count: plus/minus or direct numeric input
- duration: simple duration input
- time: time selector/input

Do not force a modal for every tiny interaction unless necessary.

## 4. Habit creation flow
Minimum required information:
- name
- tracking type
- minimum/target where relevant
- schedule
- Core or Optional

Advanced options may be progressively disclosed.

## 5. Progress visualizations
V1 should prioritize:
- percentages
- totals
- simple bars
- compact calendar/grid where useful

Avoid heavy charting libraries unless a real chart requirement exists.

## 6. Status language
Use neutral/productive wording.
Examples:
- Not started
- In progress
- Minimum reached
- Target reached
- Above target

Avoid shame-based language.

## 7. Mobile behavior
Touch targets should be comfortably tappable.
Important actions should remain reachable with one hand where practical.
Avoid horizontal scrolling for core daily interactions.

## 8. Responsive layout
Breakpoint behavior should be documented by behavior rather than arbitrary device names.

Mobile:
- single-column
- fixed/simple bottom navigation if used
- compact habit cards

Desktop:
- wider content area
- optional two-column progress layout
- more breathing room

## 9. Accessibility
- label every form control
- use semantic button/input/select elements
- do not make a clickable `div` when a button is appropriate
- preserve focus states
- avoid color-only state communication

## 10. Feedback
For mutation actions:
- optimistic UI only when rollback is straightforward and safe
- otherwise use a clear pending state
- success feedback should be subtle
- errors should identify what can be fixed

## 11. PWA
The web app should have an installable manifest and appropriate icons.
The app should remain fully usable as a normal website.
Do not block core functionality on service-worker/offline support in V1.
