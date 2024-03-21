import { clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.STRIPE_WEBHOOK_SECRET!,
});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  if (req === null)
    throw new Error(`Missing userId or request`, { cause: { req } });

  const stripeSignature = req.headers.get("stripe-signature");

  if (stripeSignature === null) throw new Error("stripeSignature is null");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature,
      webhookSecret
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
  }

  if (event === undefined) throw new Error(`event is undefined`);
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      clerkClient.users.updateUserMetadata(
        event.data.object.metadata?.userId as string,
        {
          publicMetadata: {
            stripe: {
              status: session.status,
              payment: session.payment_status,
            },
          },
        }
      );
      const customerId = session.metadata!.userId as string;
      const amount = session.amount_total || 0;

      await updateUserCredits(customerId, amount);

      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ status: 200, message: "success" });
}

async function updateUserCredits(customerId: string, amount: number) {
  const amountMapping: { [key: string]: number } = {
    "5": 5,
    "25": 40,
    "49": 99,
  };
  const credits = amountMapping[amount.toString()] || 0; // Ensure credits fallbacks to 0 if not found
  console.log(credits);
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: "Users",
    Key: {
      ClerkID: customerId,
    },
    UpdateExpression: "SET Credits = Credits + :val",
    ExpressionAttributeValues: {
      ":val": credits,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamodb.update(params).promise();
    console.log("Credits updated successfully:", result);
  } catch (error) {
    console.error("Error updating credits:", error);
  }
}
