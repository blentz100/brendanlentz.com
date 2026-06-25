variable "aws_region" {
  description = "AWS region to deploy the Sportsbook Insights resources into."
  type        = string
  default     = "us-east-1"
}

variable "odds_api_key" {
  description = "API key for The Odds API, set as a Lambda environment variable. Supply via terraform.tfvars (gitignored) or TF_VAR_odds_api_key."
  type        = string
  sensitive   = true
}

variable "log_retention_days" {
  description = "CloudWatch Logs retention period for the Lambda function's log group."
  type        = number
  default     = 14
}

variable "cors_allowed_origins" {
  description = "Origins allowed to call the API Gateway endpoint via CORS."
  type        = list(string)
  default     = ["https://brendanlentz.com", "https://www.brendanlentz.com", "http://localhost:3000"]
}
