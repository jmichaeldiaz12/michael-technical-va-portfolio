# Deployment guide

Order of work: Supabase, Resend (optional), GitHub, Vercel. Keep a scratch note of the values you collect; you will paste them into Vercel.

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com), or use an existing one. The current project is in `ap-southeast-1` (Singapore); `vercel.json` pins functions to `sin1` (Singapore) to stay close to it.
2. Open **SQL Editor**, paste the contents of `supabase/migrations/0001_contact_inquiries.sql`, and run it. This creates the `contact_inquiries` table, enables RLS with no policies, and creates the `submit_contact_inquiry` function. (Already applied to the current project; do not run it again there.)
3. Get the credentials:
   - **Project URL** (`SUPABASE_URL`): Project Settings, API (also shown on the project home page).
   - **Secret key** (`SUPABASE_SECRET_KEY`): Project Settings, API Keys, **Secret keys** (starts with `sb_secret_`). Keep it private.
4. Read inquiries: **Table Editor**, `contact_inquiries`.

## 2. Resend (optional email notifications)

Without Resend, messages are still saved in Supabase; you just are not emailed.

1. Sign up at [resend.com](https://resend.com) and create an API key (`RESEND_API_KEY`).
2. Free-tier limitation: the default sender `onboarding@resend.dev` can only send to the email address of your own Resend account until you verify a domain. Set `CONTACT_NOTIFICATION_EMAIL` to that address for now.
3. To send from your own address later: in Resend, open **Domains**, add your domain, add the DNS records it shows at your DNS provider, and wait for verification. Then set `RESEND_FROM_EMAIL` (for example `Portfolio Contact <contact@yourdomain.com>`) and redeploy.

## 3. GitHub

Create an empty repository named `michael-technical-va-portfolio` under your account (`jmichaeldiaz12`). Do not add a README or license there.

**Option A: git commands**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jmichaeldiaz12/michael-technical-va-portfolio.git
git push -u origin main
```

**Option B: GitHub CLI** (after `gh auth login`; creates the repo and pushes in one step)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
gh repo create michael-technical-va-portfolio --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you want a public repo. Before committing, confirm `git status` does not list `.env.local`.

## 4. Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. The framework is detected as Next.js; keep the defaults.
3. Under **Environment Variables**, add the variables below for **Production** and **Preview**:

   | Name | Notes |
   | --- | --- |
   | `SUPABASE_URL` | Required |
   | `SUPABASE_SECRET_KEY` | Required |
   | `RATE_LIMIT_SALT` | Required, at least 32 characters |
   | `RESEND_API_KEY` | Optional |
   | `RESEND_FROM_EMAIL` | Optional |
   | `CONTACT_NOTIFICATION_EMAIL` | Optional |
   | `NEXT_PUBLIC_SITE_URL` | Optional; leave unset until you have a custom domain |

   Generate the salt with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. Click **Deploy**.
5. After it finishes:
   - Open the site and click through every page.
   - Submit a test message on `/contact`.
   - Check **Table Editor**, `contact_inquiries` in Supabase for the row (and your inbox if Resend is configured).
6. Every push to `main` deploys to production automatically; other branches and pull requests get preview deployments.
7. Custom domain (later): Vercel project, **Settings**, **Domains**, add the domain and follow the DNS instructions. Then set `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` (no trailing slash) and redeploy.

## Post-deploy checklist

- [ ] Run Lighthouse (Chrome DevTools) on the home page and contact page.
- [ ] Check the Open Graph preview with a social card validator (for example the LinkedIn Post Inspector or opengraph.xyz).
- [ ] Open `/sitemap.xml` and confirm it lists your real domain.
- [ ] Open `/robots.txt`.
- [ ] Add the site in Google Search Console and submit `/sitemap.xml`.
- [ ] Set `linkedinUrl` in `src/content/site.ts` if not done yet.

## Troubleshooting

**"The contact form is temporarily unavailable"**
`SUPABASE_URL` or `SUPABASE_SECRET_KEY` is missing, or `RATE_LIMIT_SALT` is shorter than 32 characters. Check the function logs (Vercel project, **Logs**) for the exact message, fix the variable, and redeploy.

**"Your message could not be sent. Please make sure JavaScript is enabled"**
The form's timer value did not arrive, which usually means JavaScript is disabled or blocked in the browser. Enable it and retry.

**Rate limited while testing**
The limit is 3 messages per hour per visitor. Wait an hour, or delete your test rows in Supabase (Table Editor, `contact_inquiries`).

**No notification email**
Check that `RESEND_API_KEY` and `CONTACT_NOTIFICATION_EMAIL` are both set. If you use `onboarding@resend.dev`, the recipient must be your own Resend account email. Check the Vercel function logs for "Contact notification email failed". The message is still saved in Supabase either way.

**Build fails**
Use Node.js 20.9 or newer (Vercel project, **Settings**, **General**, Node.js Version). Run `npm run build` locally to reproduce and read the error.

**Changed an environment variable but nothing changed**
Environment variable changes apply only to new deployments. Redeploy from the Vercel **Deployments** tab.

**Sitemap shows the wrong domain**
Set `NEXT_PUBLIC_SITE_URL` to your real URL and redeploy.
