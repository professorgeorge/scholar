# Babu George — Research & Scholarship

A React/TypeScript academic profile with four connected research themes, a CV-based searchable publication catalog, selected works, an accessible research map, academic background, and teaching resources. Light and dark themes and responsive mobile navigation are included.

## Develop and validate

```sh
npm ci
npm run dev
npm test
npm run check
npm run build
```

The production build is `dist/`. Node 22 is used in CI. Site content is in `src/data/profile.json`; research framing is in `src/data/themes.ts`.

## Update from a CV

See [the CV update guide](docs/CV-UPDATES.md). The local route works with Codex without an additional API key. An optional API-backed watcher and GitHub workflow can produce review proposals. Updates preserve editorial choices and never delete omitted publications. Citation metrics are not inferred from a CV.

## Publish

Repository: https://github.com/professorgeorge/scholar

Cloudflare Pages should use production branch `main`, build command `npm run build`, output directory `dist`, and repository root as the build root. Pushes to the connected branch trigger deployment when the Git integration is enabled. The existing Pages project configuration is retained; this repository does not create a separate hosting service.

The production Cloudflare project may have a different name than the historical `wrangler.toml` project name. Use the existing connected Pages project in the Cloudflare dashboard as the source of truth before any CLI deployment.

## Content provenance

The initial CV import is dated 2026-11-06 and uses the author-supplied CV dated 2026-07-31. Publication counts include books, chapters, conferences and future-dated works. Original citations are retained, and publisher metadata is not independently verified. See Google Scholar for current citation metrics. No private source CV or API credentials are included in the deployment.
