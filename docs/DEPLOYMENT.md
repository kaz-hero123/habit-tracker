# Deployment — Vercel + Supabase

## 1. Production target
Frontend/application: Vercel.
Database/Auth: Supabase.
Repository: GitHub.

## 2. Environment variables
The exact current variable names must follow the current Supabase/Next.js documentation and project setup.
Document required public variables in `.env.example`.
Never commit:
- `.env.local`
- service-role keys
- database passwords
- OAuth secrets
- personal access tokens

## 3. Vercel
Recommended deployment flow:
1. push repository to GitHub
2. import repository into Vercel
3. configure environment variables for Preview/Production as appropriate
4. deploy preview
5. verify preview
6. deploy production
7. verify production URL

## 4. Supabase Auth production settings
Configure production Site URL and redirect URLs to the deployed Vercel domain/custom domain as applicable.
Never leave production redirects broader than necessary.

## 5. Database migrations
Treat migrations as version-controlled source of truth.
Do not make undocumented production-only schema changes through the dashboard.

## 6. Production smoke test
- sign in
- open Today
- create/edit a habit
- record a daily result
- refresh
- open Week
- open Month
- sign out
- open again and verify auth boundary

## 7. Rollback posture
Git history is the first rollback mechanism for application code.
Database schema changes must be written as migrations with a documented rollback/recovery strategy where practical.
