// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//   const prices = await stripe.prices.list({
//     limit: 4,
//   });

//   return NextResponse.json(prices.data.reverse());
// }

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16", // Specify the API version
  });

  const prices = await stripe.prices.list({
    limit: 4,
    expand: ["data.product"], // Expand the 'product' object for each Price
  });

  return NextResponse.json(prices.data.reverse());
}
