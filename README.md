# Tests (Vitest)

This project uses Vitest + Testing Library for unit and component tests.

Install dependencies (pnpm is used in this repo):

```zsh
pnpm install
```

Run tests (interactive watch mode):

```zsh
pnpm test:watch
```

Run tests once (CI-friendly):

```zsh
pnpm test -- --run
```

Run tests with coverage:

```zsh
pnpm test:ci
```

Notes:

- The Vitest configuration is in `vitest.config.ts` and uses `jsdom` as the test environment.
- `src/setupTests.ts` sets up `@testing-library/jest-dom` and React act environment flag.
- If you use a different package manager or monorepo layout, you may prefer to remove `react`/`react-dom` from this repo's `package.json` and rely on the workspace root.
