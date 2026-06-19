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

The external sportsbook data API will provide upcoming game and odds data.

It is responsible for supplying raw market data. The application is responsible for transforming that data into useful insights.


Repository Structure

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

Folder Responsibilities
- pages/sportsbook-insights.tsx contains the route for the demo page.
- components/sportsbook-insights/ contains React components specific to the demo.
- lib/sportsbook-insights/ contains frontend helper functions, API client code,
and shared frontend types.
- services/sportsbook-insights-api/ contains the Node.js and TypeScript Lambda
backend.
- infra/sportsbook-insights/ contains Terraform configuration for AWS
infrastructure.
- docs/pw-95-sportsbook-insights/ contains project documentation, specifications,
architecture notes, and implementation planning.


## Key Architectural Decisions

### AD-1: Single Lambda Function

The application will use a single AWS Lambda function for V1.

The Lambda will be responsible for retrieving sportsbook data from the external API, normalizing the response, calculating analytics-focused metrics, and returning a simplified response model to the frontend.

A single Lambda was selected to keep the initial implementation small and focused while maximizing hands-on experience with AWS Lambda development.

AD-2: Frontend Communicates Through API Gateway

The frontend will communicate with the Lambda through AWS API Gateway.

The request flow will be:

Next.js Frontend
  -> API Gateway
  -> AWS Lambda
  -> External Sportsbook Data API

The frontend will not call the Lambda directly, and the project will not use a Next.js API route as a backend proxy for V1.

This keeps the backend architecture focused on AWS serverless services and provides experience with the standard API Gateway-to-Lambda integration pattern.
