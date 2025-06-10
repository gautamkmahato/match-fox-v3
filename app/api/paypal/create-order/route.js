import { NextRequest, NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "@/lib/paypal/paypalClient";

export async function POST(req) {
  const body = await req.json();

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: body.amount,
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    return NextResponse.json({ id: order.result.id });
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
  }
}
