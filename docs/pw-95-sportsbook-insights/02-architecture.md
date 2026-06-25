## High-Level Architecture

Sportsbook Insights uses a serverless backend hosted on AWS and a frontend page hosted within the existing brendanlentz.com Next.js website.

The frontend requests aggregated game insights from an AWS API Gateway endpoint. API Gateway invokes a single AWS Lambda function written in Node.js and TypeScript. The Lambda retrieves sportsbook market data from an external API, normalizes and aggregates the response, calculates analytics-focused metrics, and returns a simplified response model to the frontend.

```text
User
  -> brendanlentz.com /sportsbook-insights
  -> AWS API Gateway
  -> AWS Lambda
  -> External Sportsbook Data API
  ```

## System Components

### Frontend

The frontend will live inside the existing brendanlentz.com Next.js application.

It is responsible for presenting the Sportsbook Insights page, loading game insights from the backend, handling loading and error states, and displaying the returned analytics data.

### API Gateway

AWS API Gateway will expose a public HTTP endpoint for the frontend to call.

It is responsible for routing frontend requests to the Lambda function.

### Lambda Function

AWS Lambda will serve as the backend application layer.

It is responsible for calling the external sportsbook data API, normalizing the returned data, calculating consensus metrics, and returning a simplified analytics-focused response model.

### External Sportsbook Data API

The application will use The Odds API as its external sportsbook data provider.

Documentation:
https://the-odds-api.com/

API Reference:
https://the-odds-api.com/liveapi/guides/v4/

The Odds API is responsible for supplying upcoming game and sportsbook market data. The application is responsible for normalizing that data, calculating consensus metrics, and presenting analytics-focused insights to the user.

For V1, the Lambda will request the `us` region and `american` odds format (`regions=us`, `oddsFormat=american`) from The Odds API. This determines which bookmakers appear in the response and ensures odds values match the American format assumed by the response model. Other regions and odds formats are out of scope for V1.


## Repository Structure

Sportsbook Insights will be developed within the existing brendanlentz.com repository.

The project will use a monorepo-style structure that keeps the frontend, backend, infrastructure, and documentation together while maintaining clear separation between concerns.

pages/
  sportsbook-insights.tsx

components/
  sportsbook-insights/

lib/
  sportsbook-insights/

services/
  sportsbook-insights-api/

infra/
  sportsbook-insights/

docs/
  pw-95-sportsbook-insights/

types/
  sportsbook-insights.d.ts

Folder Responsibilities
- pages/sportsbook-insights.tsx contains the route for the demo page.
- components/sportsbook-insights/ contains React components specific to the demo.
- lib/sportsbook-insights/ contains frontend helper functions and API client code.
- services/sportsbook-insights-api/ contains the Node.js and TypeScript Lambda
backend.
- infra/sportsbook-insights/ contains Terraform configuration for AWS
infrastructure.
- docs/pw-95-sportsbook-insights/ contains project documentation, specifications,
architecture notes, and implementation planning.
- types/sportsbook-insights.d.ts contains the response model shared by the
frontend and the Lambda backend. It is a type-only declaration file, so
importing it does not couple the two projects' build or runtime behavior.


## Key Architectural Decisions

### AD-1: Single Lambda Function

The application will use a single AWS Lambda function for V1.

The Lambda will be implemented as an independent Node.js and TypeScript service within the repository. It will be responsible for retrieving sportsbook data from the external API, normalizing the response, calculating analytics-focused metrics, and returning a simplified response model to the frontend.

A single Lambda was selected to keep the initial implementation small and focused while providing hands-on experience with AWS Lambda development.

### AD-2: Frontend Communicates Through API Gateway

The frontend will communicate with the Lambda through AWS API Gateway.

The request flow will be:

Next.js Frontend
  -> API Gateway
  -> AWS Lambda
  -> External Sportsbook Data API

The frontend will not call the Lambda directly, and the project will not use a Next.js API route as a backend proxy for V1.

### AD-3: Monorepo Repository Structure

The project will be developed within the existing brendanlentz.com repository.

Frontend, backend, infrastructure, and project documentation will be maintained in a single repository while remaining separated by folder structure and responsibility.

### AD-4: No Database in V1

The application will not use a database during the initial release.

All game and sportsbook data will be retrieved from the external API on demand and transformed within the Lambda function before being returned to the frontend.



