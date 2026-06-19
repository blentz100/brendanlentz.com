## Project Overview

Sportsbook Insights is a project that explores serverless application development using AWS Lambda, Node.js, TypeScript, API Gateway, and Terraform.

The application consumes sportsbook market data from a third-party API, normalizes and aggregates that data, calculates analytics-focused metrics, and presents the results through a web interface hosted within the existing brendanlentz.com website.

## Why This Project Exists

The primary purpose of this project is to gain hands-on experience building, deploying, and maintaining applications using AWS Lambda and Node.js.

A secondary goal is to explore spec-driven, AI-assisted software development workflows.

## Technical Goals

- Build and deploy a serverless application using AWS Lambda and API Gateway.
- Gain experience developing and debugging Node.js applications running in AWS Lambda.
- Integrate with a third-party API and transform external data into a domain-specific response model.
- Establish a repeatable spec-driven development workflow that can be reused on future projects.

## Constraints

- The project will be developed within the existing brendanlentz.com repository.
- The project will use AWS Lambda as the primary backend compute platform.
- The initial release should remain intentionally small and focused.

## Success Criteria

- The application retrieves real sportsbook data from a third-party API.
- The backend transforms raw sportsbook data into a simplified analytics-focused response model.
- The backend is deployed to AWS Lambda and accessible through API Gateway.
- The project includes documentation that describes the product, architecture, and implementation approach.
- The application transforms raw sportsbook data into meaningful business-facing insights.

## Out of Scope

The following items are explicitly out of scope for V1:

- User accounts
- Authentication and authorization
- Betting functionality
- Wager placement
- Payment processing
- Historical data storage
- Historical line movement
- Database persistence
- Administrative tools
- Real-time updates
- Push notifications
- Mobile applications