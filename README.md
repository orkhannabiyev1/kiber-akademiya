# Kiber Akademiya

Azerbaijani-language cybersecurity education platform. React + Vite + TypeScript + Tailwind + React Router + Supabase Auth.

## Local development
```
npm install
cp .env.example .env.local   # then fill in the two public Supabase values
npm run dev
npm run typecheck && npm run build
```
Without Supabase variables the public site still works; sign-in and sign-up show a "not available" message.

## Environment variables (all public, browser-safe)
| Variable | Purpose |
|---|---|
| `VITE_BASE_PATH` | Base path: `/<repo-name>/` on GitHub Pages, `/` locally or on a custom domain |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/publishable key (protected by Row Level Security) |

Everything named `VITE_*` is compiled into public JavaScript. **Never** add a `service_role` key, a database password or any other secret. `.env`, `.env.local` and `.env.*.local` are git-ignored; commit only `.env.example`.

## GitHub Pages deployment
1. Repo → Settings → Secrets and variables → Actions → **Variables**: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Settings → Pages → Source: GitHub Actions. Push to `main`.

## Supabase setup (manual dashboard steps)
1. Run the migrations in order (SQL editor or Supabase CLI): `0001_profiles.sql` (profiles: 1:1 with `auth.users`, RLS, own-row select/update, created by trigger) and `0002_lesson_progress.sql` (lesson progress, see below). Both are safe to re-run.
2. Authentication → URL Configuration: set **Site URL** to the production URL (`https://<user>.github.io/<repo>/`). Add to **Redirect URLs** the same URL with `login` appended, plus your local dev URL with `login` appended.
3. Authentication → Providers → Email: keep "Confirm email" on (recommended). Set the minimum password length to at least 8 (the client requires 8) and consider enabling leaked-password protection.
4. Authentication → Rate Limits: review the defaults. Brute-force and abuse protection is enforced by Supabase, not by this frontend.

## Security notes
- Client-side route protection is UX only. Data access must be protected by Row Level Security on every table.
- Sessions are managed entirely by the official Supabase client (PKCE flow). The SDK keeps its session in browser storage, so any XSS would expose it. The app renders no raw HTML, and React escapes all text.
- Login errors are generic. Sign-up shows the same "check your email" message whether or not the address is already registered (when email confirmation is on).
- PKCE confirmation links only complete in the browser that started sign-up; opened elsewhere, the user simply logs in.
- GitHub Pages cannot set HTTP headers. On a host that can (Cloudflare, Netlify, Vercel), add `Content-Security-Policy` (allow `self` and the Supabase project origin), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` and `Permissions-Policy`.

## Lesson progress (Phase 5B)
- **What is stored:** one row per user and lesson in `public.lesson_progress`: `lesson_id` (the stable id from the static lesson registry), `last_page`, `completed`, `completed_at` and timestamps. No lesson content is stored in the database.
- **Ownership / RLS:** RLS is on. `select`, `insert`, `update` and `delete` policies all require `user_id = auth.uid()` (update also has `WITH CHECK`). `anon` has no access. `user_id` defaults to `auth.uid()` and the client never sends it. A trigger keeps `updated_at`, `completed_at` (consistent with `completed`), `id`, `user_id` and `created_at` server-owned.
- **Derived data:** module and path progress are computed in the app from lesson rows and the static curriculum. They are never stored.
- **No service-role key:** the app only uses the public anon key; RLS is the authorization boundary.
- **Completion is not an entitlement:** completion is set by the client and is fine for showing progress. Do not use it to unlock paid content, certificates, exams or privileges without server-side validation.
- **Content is static:** lessons live in the frontend bundle. Changing a lesson's page count is handled safely (an out-of-range saved page falls back to page 1).
