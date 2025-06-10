import { NextRequest, NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "@/lib/paypal/paypalClient";

export async function POST(req) {
  const body = await req.json();

  const request = new paypal.orders.OrdersCaptureRequest(body.orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    return NextResponse.json({ success: true, details: capture.result });
  } catch (error) {
    console.error("Capture Error:", error);
    return NextResponse.json({ error: "Capture failed" }, { status: 500 });
  }
}
