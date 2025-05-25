import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";
import savePayment from "@/app/service/payment/paymentService";

export async function POST(req) {
  try {
    const body = await req.text(); // get raw body for signature verification
    const razorpaySignature = headers().get("x-razorpay-signature");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (razorpaySignature !== expectedSignature) {
      console.warn("❌ Invalid webhook signature");
      return NextResponse.json({ state: false, message: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;

      const paymentData = {
        id: crypto.randomUUID(),
        user_id: null, // Set based on context if you can track the user from metadata or order notes
        amount: payment.amount / 100,
        payment_provider: "razorpay",
        payment_status: payment.status,
        transaction_id: payment.id,
        credits: 100, // or dynamically assign based on metadata/amount
        remarks: payment.notes?.description || "Razorpay Purchase",
        customer_id: payment.customer_id || null,
        invoice_id: null,
        receipt_url: null,
        payment_intent_id: null,
      };

      await savePayment(paymentData);
      return NextResponse.json({ state: true, message: "Payment captured and saved" }, { status: 200 });
    }

    return NextResponse.json({ state: true, message: "Ignored event" }, { status: 200 });
  } catch (err) {
    console.error("🔴 Webhook error:", err);
    return NextResponse.json({ state: false, message: "Webhook processing failed" }, { status: 500 });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
