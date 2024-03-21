import Stripe from "stripe";
import { headers } from "next/headers";
import getRawBody from "raw-body";
import { IncomingMessage } from "http";

export async function POST(req: Request) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Please add STRIPE_SECRET_KEY to .env");
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("Please add STRIPE_WEBHOOK_SECRET to .env");
  }

  const rawBody = await getRawBody(req.body as unknown as IncomingMessage);
  const sig = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  console.log("Event Fired");

  console.log(event);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        // Add Credits to The  User
        console.log(`✅ Success: ${event.id} ${event.type}`);

        break;
      case "product.updated":
        break;
      default:
        throw new Error("Unhandled relevant event!");
    }
  } catch (error) {
    console.log(error);
    return new Response("Webhook handler failed. View logs.", {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ received: true }));
}
