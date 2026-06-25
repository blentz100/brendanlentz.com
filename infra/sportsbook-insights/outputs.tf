output "api_endpoint" {
  description = "Base invoke URL for the Sportsbook Insights API Gateway stage."
  value       = aws_apigatewayv2_stage.default.invoke_url
}

