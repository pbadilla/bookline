# Tests (Vitest)
```markdown
# Bookline — Next.js eCommerce Starter

An opinionated starter for an e-commerce storefront built with Next.js, React and Tailwind CSS — focused on DX (TypeScript, Vitest, Playwright) and modern UI primitives.

This README summarizes how to run, test and contribute to the project.

---

## Features

- Next.js (app/pages compatible)
- TypeScript-ready
- Tailwind CSS for utility-first styling
- Unit/component testing with Vitest + Testing Library
- End-to-end tests with Playwright
- Opinionated dev scripts for dev/build/test and CI

## Tech stack

- Next.js
- React 18
- TypeScript
- Tailwind CSS + PostCSS + Autoprefixer
- Vitest + @testing-library/react
- Playwright for E2E

## Quick start

Clone and install dependencies (pnpm recommended):

```zsh
pnpm install
```

Start the dev server:

```zsh
pnpm dev
```

Build for production:

```zsh
pnpm build && pnpm start
```

## Useful npm scripts

The `package.json` ships convenient scripts:

- `pnpm dev` — start Next.js in development
- `pnpm build` — create an optimized production build
- `pnpm start` — run the production server
- `pnpm test` — run unit tests (Vitest)
- `pnpm test:watch` — interactive test watch mode
- `pnpm test:ci` — run tests with coverage for CI
- `pnpm e2e` — run Playwright E2E tests
- `pnpm e2e:install-browsers` — install Playwright browsers

Run the script that suits your workflow. Replace `pnpm` with `npm` or `yarn` if you prefer.

## Tailwind CSS

Tailwind is configured via `tailwind.config.js` and PostCSS is enabled by `postcss.config.js`.
Global Tailwind directives are included in `src/styles/global.css` (or `src/styles` path depending on layout). If you don't see Tailwind utilities in the browser:

1. Ensure `tailwind.config.js` `content` globs include `./src/**/*.{js,ts,jsx,tsx}`.
2. Restart the dev server after changing Tailwind/PostCSS configuration.

## Testing

Unit & component tests use Vitest + Testing Library. The repository contains configuration in `vitest.config.ts` and test-setup files under `src/`.

Run tests:

```zsh
pnpm test
pnpm test:watch
pnpm test:ci
```

## End-to-end (E2E)

Playwright is included for E2E tests. To run the test suite locally:

```zsh
pnpm e2e:install-browsers
pnpm e2e
```

Playwright config lives in `playwright.config.ts` and uses the project-specific test files under `tests/`.

## TypeScript

Type information lives under `src/types`. `tsconfig.json` is set up for Next.js. If you experience missing `@types/*` during local development, run `pnpm install` to ensure devDependencies are installed.

## Contributing

- Fork the repo and create feature branches for work.
- Keep changes small and add tests for new behavior.
- Use `pnpm test` and `pnpm lint` (if available) before submitting a PR.

## Project layout (top-level)

- `src/` — app source (pages, components, styles, types)
- `tests/` — E2E or integration tests (Playwright)
- `vitest.config.ts` — unit test config
- `postcss.config.js`, `tailwind.config.js` — styling tooling

## Troubleshooting

- If Tailwind classes are missing, check `tailwind.config.js` `content` paths and restart dev server.
- If TypeScript complains about missing `@types`, run `pnpm install` and re-open your editor.

## License & authors

This project uses the same license and authorship as the repository owner. Add a license file if you want to explicitly set terms.

---

If you want, I can:

- Add badges (CI, tests, coverage)
- Create a `CONTRIBUTING.md` and PR template
- Add quick screenshots or a demo GIF to the README

Tell me which extras to add and I will update the README accordingly.
``` 
