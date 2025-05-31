import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";
import { handlePaymentCaptured } from "@/app/service/payment/webhookEvents";

export async function POST(req) {
  try {
    const rawBody = await req.text();
    console.log("🔔 Webhook called with raw body:", rawBody);

    const requestHeaders = await headers();
    const razorpaySignature = requestHeaders.get("x-razorpay-signature");
    console.log("🧾 Received signature:", razorpaySignature);

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!razorpaySignature || !secret) {
      console.error("❌ Missing Razorpay signature or secret");
      return NextResponse.json({ state: false, message: "Unauthorized" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    console.log("🧠 Expected signature:", expectedSignature);

    if (razorpaySignature !== expectedSignature) {
      console.warn("❌ Invalid webhook signature");
      return NextResponse.json({ state: false, message: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log("📦 Parsed event:", event);

    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(payload);
        break;
      default:
        console.log(`⚠️ Unhandled event type: ${event}`);
    }

    return NextResponse.json({ state: true, message: "Webhook processed" });
  } catch (err) {
    console.error("💥 Webhook error:", err);
    return NextResponse.json({ state: false, message: "Internal server error" }, { status: 500 });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
