# Sportsbook Insights API

AWS Lambda backend for PW-95 Sportsbook Insights. This is a standalone Node.js/TypeScript project, separate from the Next.js app's build — it has its own `package.json` and `tsconfig.json`.

```sh
npm install
npm run build
```

`src/handler.ts` currently returns a hardcoded mock response. Phase 2 will replace this with a real call to the external sportsbook data API, normalization, and consensus metric calculation.
