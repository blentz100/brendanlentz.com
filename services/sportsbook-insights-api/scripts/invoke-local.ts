import "dotenv/config";
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { handler } from "../src/handler";

const sport = process.argv[2];

const fakeEvent = {
  queryStringParameters: sport ? { sport } : null,
} as unknown as APIGatewayProxyEvent;

const fakeContext = {} as Context;

async function main() {
  const result = (await handler(fakeEvent, fakeContext, () => {})) as APIGatewayProxyResult;
  console.log(`Status: ${result.statusCode}`);
  console.log(JSON.stringify(JSON.parse(result.body), null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});