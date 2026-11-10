# Michael Technical VA Portfolio

Portfolio site for John Michael Diaz, Technical Virtual Assistant | IT Support Specialist (Philippines, part-time evening shift, PHT). Built with Next.js, with a secure contact form backed by Supabase.

Live site: _add your Vercel URL after deploying_

## Features

- **Pages:** Home, About, Services, Skills, Projects (with a detail page per project), Contact, and a custom 404.
- **Shift timeline:** a 24-hour bar that shows the evening shift (6:00 PM – 12:00 AM PHT) in the visitor's own time zone, with the current time and whether the shift is on.
- **Honest demo projects:** each project carries a status (`planned`, `in-progress`, `completed`) shown on the site, so nothing is presented as finished before it is.
- **Secure contact form:** server-side validation, honeypot and fill-timer spam checks, atomic rate limiting, storage in Supabase, optional email notification via Resend.
- **SEO:** page metadata, generated Open Graph and Twitter images, `sitemap.xml`, `robots.txt`, JSON-LD structured data.
- **Accessibility:** semantic markup and keyboard-friendly navigation, including a mobile nav.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Cache Components enabled) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Validation | Zod |
| Database | Supabase (Postgres) |
| Email (optional) | Resend |
| Hosting | Vercel |

## Project structure

```text
src/
  app/                   Routes (App Router)
    page.tsx               Home
    about/ services/ skills/ projects/ contact/
    projects/[slug]/       Project detail pages
    contact/actions.ts     Contact form server action (validation, rate limit, storage, email)
    sitemap.ts robots.ts   Generated sitemap.xml and robots.txt
    opengraph-image.tsx    Open Graph image (also twitter-image.tsx, icon.svg, apple-icon.tsx)
    layout.tsx             Root layout and site-wide metadata
  content/               EDIT TEXT HERE: all site copy and data
    site.ts                Name, title, email, links, shift hours
    services.ts            Services list
    projects.ts            Demo projects
    skills.ts              Skill categories
    navigation.ts          Nav links
    process.ts             "Support process" steps
  components/            UI components
    layout/ sections/ services/ projects/ contact/ ui/
  lib/
    supabase/server.ts     Server-only Supabase client
    validation/contact.ts  Zod schema for the contact form
  types/index.ts         Shared TypeScript types
supabase/migrations/     SQL for the contact_inquiries table and RPC
docs/DEPLOYMENT.md       Deployment guide
vercel.json              Vercel config (functions run in Singapore, sin1)
```

## Updating content

Most changes need only edits in `src/content/`. Each file has a "HOW TO EDIT" comment at the top.

**`site.ts`**
- `email`: contact email shown on the site and in form error messages.
- `linkedinUrl`: set to your profile URL (for example `"https://www.linkedin.com/in/your-name"`). While it is `null`, the link is hidden.
- `shift`: `timezone`, `startHour`, `endHour` (24-hour clock) drive the shift timeline on the home page; `label` is the text shown. Also update `availability` if the schedule changes.

**`services.ts`**
- Each entry has a `level` of `"core"` (no badge) or `"advanced"` (shown with an "Advanced" badge). Change it per service as appropriate.
- Keep `slug` stable; it is the anchor (`/services#slug`).

**`projects.ts`**
- To add a project, append an object to the `projects` array with the fields defined by `Project` in `src/types/index.ts`: `slug`, `title`, `category`, `summary`, `description`, `objectives`, `features`, `technologies`, `screenshots`, `status`.
- When a project is published, add `githubUrl` and/or `liveUrl`.
- Screenshots: put images in `public/projects/<slug>/` and reference them as `screenshots: [{ src: "/projects/<slug>/home.png", alt: "Describe what the image shows" }]`.
- Only set `status: "completed"` once the project is really built.

**`skills.ts`**
- Edit the `skills` array of a category, or add a category with a `name`, a lucide-react `icon`, and `skills`. Skills are listed without ratings on purpose.

## Local development

Prerequisites: Node.js 20.9 or newer and npm.

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
# fill in the values in .env.local (see below)
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npm run build    # production build
npm start        # serve the production build
```

The site renders without Supabase configured, but the contact form will show "temporarily unavailable" until `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `RATE_LIMIT_SALT` are set.

## Environment variables

Set these in `.env.local` locally and in Vercel project settings for deployment.

| Name | Required | Server-only | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | No | Public site URL used for metadata, sitemap, and OG tags. Auto-detected on Vercel; set it once you have a custom domain. |
| `SUPABASE_URL` | Yes | Yes | Supabase project URL. |
| `SUPABASE_SECRET_KEY` | Yes | Yes | Supabase secret key (`sb_secret_...`). Bypasses RLS; never expose it. |
| `RATE_LIMIT_SALT` | Yes | Yes | Secret salt for hashing visitor IPs, at least 32 characters. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `RESEND_API_KEY` | No | Yes | Resend API key. Enables email notifications for new inquiries. |
| `RESEND_FROM_EMAIL` | No | Yes | Sender, for example `Portfolio Contact <onboarding@resend.dev>`. Defaults to that value. |
| `CONTACT_NOTIFICATION_EMAIL` | No | Yes | Address that receives notifications. Sent only if this and `RESEND_API_KEY` are both set. |
| `CRON_SECRET` | Yes (production) | Yes | Secret that Vercel Cron sends to `/api/keep-alive`. The daily job runs a tiny query so the Supabase free plan does not pause the project after 7 idle days. At least 16 characters. |

## Security notes

- `SUPABASE_SECRET_KEY` is used only in server code (`src/lib/supabase/server.ts` imports `server-only`). Never give it, or any secret, a `NEXT_PUBLIC_` prefix.
- The `contact_inquiries` table has Row Level Security enabled with no policies, and table privileges are revoked from `anon` and `authenticated`. Only the server's secret key can read or write.
- Submissions go through the `submit_contact_inquiry` database function, which applies the rate limit and insert atomically: 3 messages per hour per visitor and a global cap of 100 per 24 hours.
- Visitor IPs are stored only as an HMAC hash (keyed with `RATE_LIMIT_SALT`), never raw.
- Spam checks: a hidden honeypot field and a minimum fill time. Input is validated with Zod on the server and again by database constraints.
- `.env*` files are git-ignored (only `.env.example` is committed). Never commit `.env.local`.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Supabase, Resend, GitHub, and Vercel setup, a post-deploy checklist, and troubleshooting.

## License

All rights reserved. No open-source license has been chosen.
