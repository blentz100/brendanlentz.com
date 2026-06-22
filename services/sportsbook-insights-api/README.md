# Sportsbook Insights API

AWS Lambda backend for PW-95 Sportsbook Insights. This is a standalone Node.js/TypeScript project, separate from the Next.js app's build — it has its own `package.json` and `tsconfig.json`.

```sh
npm install
npm run build
```

`src/handler.ts` calls The Odds API, normalizes the response, and calculates consensus metrics across sportsbooks. See `src/oddsApi/client.ts`, `src/normalize.ts`, and `src/consensus.ts`.

Local development requires an `ODDS_API_KEY`. Copy `.env.example` to `.env` and fill in a key from https://the-odds-api.com/, then run:

```sh
npm run dev               # uses the default sport (americanfootball_nfl)
npm run dev -- basketball_nba
npm test                  # unit tests against fixture data, no API key needed
```
