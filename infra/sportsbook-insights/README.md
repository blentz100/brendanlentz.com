# Sportsbook Insights Infrastructure

Terraform configuration for PW-95 Sportsbook Insights AWS resources: an IAM execution role, a Lambda function, and an HTTP API (API Gateway v2) that exposes it as `GET /insights`.

State is local for V1 (no remote backend) — this is a single-operator project, so the `.tfstate` file (gitignored) only needs to exist on the machine that runs `terraform apply`.

## Deploying

1. Build the Lambda package:
   ```sh
   cd ../../services/sportsbook-insights-api
   npm run build
   ```
2. Provide your Odds API key — copy `terraform.tfvars.example` to `terraform.tfvars` (gitignored) and fill in `odds_api_key`, or export `TF_VAR_odds_api_key`.
3. From this directory:
   ```sh
   terraform init
   terraform plan -var-file=terraform.tfvars
   terraform apply
   ```
4. Note the `api_endpoint` output — this is the base URL the frontend will call in Phase 4.

Re-deploying after a backend code change: re-run `npm run build`, then `terraform apply` — the Lambda's `source_code_hash` picks up the new `dist/` contents automatically.
