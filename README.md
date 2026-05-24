# LearnOS — Student Dashboard

A futuristic, animated learning dashboard built with Next.js 14, Supabase, Tailwind CSS, and Framer Motion.

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd learning-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/seed.sql`
3. Copy your project URL and publishable key from **Project Settings -> API**

### 3. Configure environment

```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Architecture

### Routes

The app uses student-specific routes so the dashboard can be embedded later as a feature inside a larger product.

| Route | Purpose |
|---|---|
| `/dashboard/[student]` | Main Bento dashboard, e.g. `/dashboard/alex` |
| `/courses/[student]` | Student-specific courses |
| `/analytics/[student]` | Learning analytics and progress signals |
| `/setting/[student]` | Account/preferences overview |

### Server / Client Component Split

| Component | Type | Why |
|---|---|---|
| `app/**/[student]/page.tsx` | **Server** | Fetches Supabase data at request time from route params |
| `components/dashboard/CourseGrid.tsx` | **Server** | Pure rendering, no interactivity |
| `components/dashboard/CourseCard.tsx` | **Client** | Uses Framer Motion (`useInView`, `motion`) |
| `components/dashboard/HeroTile.tsx` | **Client** | `getGreeting()` depends on `new Date()` |
| `components/dashboard/ActivityTile.tsx` | **Client** | Contribution graph mock data + Framer Motion |
| `components/ui/Bento.tsx` | **Client** | Shared animated Bento primitives |
| `components/layout/Sidebar.tsx` | **Client** | Active state, collapse toggle |
| `components/layout/BottomNav.tsx` | **Client** | Active state |

### Data Fetching

- `lib/supabase.ts` — Creates a server-side Supabase client using `@supabase/ssr` and Next.js `cookies()`
- `lib/data.ts` — Fetches `students` and student-specific `courses`, typed via `types/index.ts`
- `courses.student_slug` connects each course row to `/dashboard/[student]`
- `app/dashboard/[student]/page.tsx` fetches course and student data in a Server Component and passes it into the Bento grid
- `app/dashboard/loading.tsx` provides route-level skeletons for the entire page while the dashboard route loads
- `components/dashboard/CourseGrid.tsx` renders a graceful error state if the database request fails

### Database

Run `supabase/seed.sql` in the Supabase SQL Editor. It creates:

- `students`: `id`, `name`, `slug`, `streak`, `avatar_url`, `created_at`
- `courses`: `id`, `student_slug`, `title`, `progress`, `icon_name`, `created_at`

The seed includes sample data for `alex`, `maya`, `jordan`, and `priya`.

### Animation Strategy

All animations use `transform` and `opacity` only — zero layout shifts.

- **Staggered entrance**: `fadeUpVariants` with a `custom` index per tile
- **Hover**: `whileHover` with spring physics (`stiffness: 300, damping: 20`) and transform-only elevation
- **Progress bars**: `useInView` triggers the bar animation once visible
- **Sidebar active indicator**: `layoutId="sidebar-active"` for smooth layout-animated highlight
- **Sidebar behavior**: Tablet is icons-only; desktop supports manual collapse with label fade

### Portability Notes

The dashboard feature is intentionally split into reusable layers:

- `lib/data.ts` contains the Supabase data access boundary.
- `lib/analytics.ts` contains derived metrics and chart data helpers.
- `components/ui/Bento.tsx` contains reusable animated cards/metric tiles.
- `components/layout/AppShell.tsx` contains the dashboard shell.

In a larger application, replace `student_slug` with your authenticated user/profile ID and keep the same UI components.

### Responsive Breakpoints

| Viewport | Layout |
|---|---|
| Mobile `< 768px` | Single column grid, bottom nav bar |
| Tablet `768–1024px` | 2-column grid, sidebar collapsed (icons only) |
| Desktop `> 1024px` | 3-column bento grid, full sidebar |

---

## Deployment

1. Push to a public GitHub repo
2. Import into [Vercel](https://vercel.com)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy ✓

Never commit `.env` or `.env.local` — both are in `.gitignore`.
