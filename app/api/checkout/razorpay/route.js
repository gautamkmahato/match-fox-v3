// app/api/create-order/route.js

import razorpay from "@/lib/razorpay/razorpay";


export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt = "receipt#1" } = body;

    const options = {
      amount: amount * 100, // Razorpay needs paise
      currency,
      receipt,
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
