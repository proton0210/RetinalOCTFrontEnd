import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Please add STRIPE_SECRET_KEY to .env");
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  // Get the request body
  const data = await request.json();
  console.log("Request data:", data);

  // Extract the priceId and clerkId from the request body
  const { userId } = auth();
  const { priceId } = data;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    metadata: {
      userId, // Pass the Clerk ID as part of the session metadata
    },
  });

  console.log("Created Stripe checkout session:", session);
  console.log("Session metadata:", session.metadata);

  return NextResponse.json(session.url);
}
