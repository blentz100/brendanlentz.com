resource "aws_apigatewayv2_api" "sportsbook_insights" {
  name          = "sportsbook-insights-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.cors_allowed_origins
    allow_methods = ["GET"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.sportsbook_insights.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.sportsbook_insights.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_insights" {
  api_id    = aws_apigatewayv2_api.sportsbook_insights.id
  route_key = "GET /insights"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.sportsbook_insights.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_rate_limit  = 5
    throttling_burst_limit = 10
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.sportsbook_insights.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.sportsbook_insights.execution_arn}/*/*"
}
