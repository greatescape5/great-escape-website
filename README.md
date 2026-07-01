# Great Escape — Website (Next.js + Supabase)

This is your real website, wired to your Supabase database. It has the home page,
the city SEO pages (`/website-development/[city]`), Our Clients, Trackd, pricing,
testimonials, the in-store video, and a working contact form that saves leads.

The admin dashboard is the next piece we'll add.

---

## To run it on your own computer (optional)

1. Install Node.js (nodejs.org) if you don't have it.
2. In this folder, open a terminal and run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

---

## To put it live (GitHub + Vercel)

**Step 1 — Make sure you ran the database script.**
In Supabase → SQL Editor, you should have already run `supabase_schema.sql`.

**Step 2 — Put this project on GitHub.**
Create a new repository at github.com and upload this whole folder
(everything EXCEPT the `node_modules` folder — it's not needed and is huge).

**Step 3 — Import it into Vercel.**
- Go to vercel.com → Add New → Project → import your GitHub repo.
- Before you click Deploy, open **Environment Variables** and add these two:

  | Name | Value |
  |------|-------|
  | `NEXT_PUBLIC_SUPABASE_URL` | `https://dzryaxxioerjzzzajkyd.supabase.co` |
  | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(your anon key — the long one from Supabase → Settings → API)* |

  ⚠️ These are required. The `.env.local` file on your computer is NOT uploaded to
  GitHub (on purpose), so Vercel needs its own copy here.

- Click **Deploy**.

**Step 4 — Point your domain.**
In Vercel → your project → Settings → Domains, add
`greatescapewebservices.com`. Vercel shows you the DNS records to set at your
registrar.

---

## Notes

- Old Wix URLs are 301-redirected in `next.config.js`. We'll finalize that list
  from your live sitemap before launch.
- After launch, resubmit your sitemap (`/sitemap.xml`) in Google Search Console.
- To add a city, project, testimonial, etc. right now, add a row in the Supabase
  table editor — the site picks it up within a minute. The admin dashboard (coming
  next) will make this point-and-click.
