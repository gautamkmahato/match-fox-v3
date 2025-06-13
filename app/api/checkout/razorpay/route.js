// app/api/create-order/route.js

import razorpay from "@/lib/razorpay/razorpay";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, credits, plan, clerk_id } = body;

    console.log("clerk_id::::", clerk_id);
    console.log("amount, credit, plan::::", amount, credits, plan);

    if (!clerk_id) {
      return NextResponse.json(
        { state: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!amount || !credits || !plan) {
      return NextResponse.json(
        { state: false, message: "Missing amount or credits or plan" },
        { status: 400 }
      );
    }

    
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
      notes: {
        clerk_id: clerk_id,
        description: "Razorpay Transaction for Hirenom",
        credits: credits,
        plan: plan,
      },
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ state: true, data: order, message: 'Success' }, {status: 200});
  } catch (err) {
    console.error("Order creation error:", err);
    return new Response(JSON.stringify({ state: false, error: "Failed to create order", message: 'Failed' }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
