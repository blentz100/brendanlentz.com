locals {
  function_name = "sportsbook-insights-api"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../services/sportsbook-insights-api/dist"
  output_path = "${path.module}/.build/${local.function_name}.zip"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = var.log_retention_days
}

resource "aws_lambda_function" "sportsbook_insights" {
  function_name    = local.function_name
  role             = aws_iam_role.lambda_exec.arn
  handler          = "handler.handler"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 10
  memory_size      = 256

  environment {
    variables = {
      ODDS_API_KEY = var.odds_api_key
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]
}
