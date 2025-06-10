import { handlePaymentCapturedPaypal } from "@/app/service/payment/handlePaymentCapturedPaypal";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // disable Next.js parsing
  },
};

const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API_BASE = process.env.NODE_ENV === "production"
  ? "https://api.paypal.com"
  : "https://api.sandbox.paypal.com";

// helper to read raw body as string
async function getRawBody(req) {
  const buffer = await req.arrayBuffer();
  return Buffer.from(buffer).toString("utf-8");
}

async function verifyPaypalSignature(req, rawBody, webhookEvent) {
  const headers = req.headers;

  const transmissionId = headers.get("paypal-transmission-id");
  const timestamp = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");

  const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

  const tokenRes = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const verificationRes = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transmission_id: transmissionId,
      transmission_time: timestamp,
      cert_url: certUrl,
      auth_algo: authAlgo,
      transmission_sig: transmissionSig,
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: webhookEvent,
    }),
  });

  const verification = await verificationRes.json();
  console.log("🔐 Signature verification:", verification);
  return verification.verification_status === "SUCCESS";
}

export async function POST(req) {
  try {
    const rawBody = await getRawBody(req);
    const parsedBody = JSON.parse(rawBody);

    const isValid = await verifyPaypalSignature(req, rawBody, parsedBody);

    if (isValid) {
      console.warn("❌ Invalid PayPal Webhook signature");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const eventType = parsedBody.event_type;
    console.log("📩 Verified PayPal Webhook Event:", eventType);

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      await handlePaymentCapturedPaypal(parsedBody);
    }

    // optional sandbox logging
    const payerEmail = parsedBody?.resource?.payer?.email_address || "";
    if (payerEmail.includes("sandbox") || parsedBody?.resource?.amount?.currency_code === "TST") {
      console.log("🧪 Sandbox/Test Webhook:", {
        payerEmail,
        body: parsedBody,
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
