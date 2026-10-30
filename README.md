# tendu

A personal ballet workout web app: a Vaganova glossary of steps (organised by category, with variants,
terms, and relationships between steps) and, next, a workout builder that assembles a class from it.

## Stack

- Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4
- SQLite via Drizzle ORM (`better-sqlite3`); the database file lives in `data/tendu.db`

All glossary content — categories, steps, variants, terms, relationships, key positions, and diagram
data — is stored in the database. The initial content is in `src/db/seed-data.ts`; every entry starts
as a draft ("needs review").

## Development

```bash
npm install
npm run db:setup   # create tables and load the glossary seed
npm run dev
```

After changing `src/db/seed-data.ts`, run `npm run db:seed` and restart the dev server (glossary
queries are cached for an hour).

## Tests

```bash
npm test                                     # unit tests (Node's test runner)
npx playwright install chromium              # once, for the browser tests
npm run build && npm run test:e2e            # browser tests against the production build
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, both test suites and the build on every push to
`main` and on pull requests, on a Namespace runner.

## Docker

```bash
docker build -t tendu . && docker run -p 3000:3000 tendu
```

The image bundles the seeded glossary database, so data written at runtime is lost when the container
is replaced. CI pushes the image for every commit on `main` to the workspace's private registry,
`nscr.io/<workspace-id>/tendu`, tagged with the commit SHA and `latest`.

## GitHub Pages

`.github/workflows/pages.yml` publishes `main` as a static site on GitHub Pages (free for public
repositories) on every push. It builds with `PAGES_BASE_PATH` set, which switches `next.config.ts`
to a static export in `out/` under the repository's path. Pages has no server, so the glossary is
frozen at build time and Build my class runs in the browser. To enable it once, set **Settings →
Pages → Source** to **GitHub Actions**.

```bash
PAGES_BASE_PATH= npm run build && npx serve out   # preview the static site at the root path
```

## Structure

- `src/db/schema.ts` — tables
- `src/db/seed-data.ts`, `src/db/seed.ts` — glossary content and loader
- `src/lib/glossary.ts` — read-only glossary queries
- `src/app/glossary` — glossary, category, step, variant, and term pages
- `src/components/diagrams.tsx` — feet, studio square, and turn diagrams drawn from diagram data
