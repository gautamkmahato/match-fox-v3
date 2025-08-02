import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { handleDodoWebhookEvents } from "@/app/service/payment/handleDodoWebhookEvents";

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY);

export async function POST(request) {
  try {
    const headersList = headers();
    const rawBody = await request.text();

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") ?? "",
      "webhook-signature": headersList.get("webhook-signature") ?? "",
      "webhook-timestamp": headersList.get("webhook-timestamp") ?? "",
    };

    // ✅ Verify signature
    await webhook.verify(rawBody, webhookHeaders);

    // ✅ Parse and validate payload
    const payload = JSON.parse(rawBody);
    if (!payload?.type || !payload?.data) {
      console.warn("⚠️ Missing type or data in payload.");
      return new Response("Malformed payload", { status: 400 });
    }

    console.log("✅ Dodo webhook received:", payload.type);

    // ✅ Dispatch to correct handler
    switch (payload.type) {
      case "payment.succeeded":
      case "payment.failed":
      case "payment.processing":
      case "payment.cancelled":
        await handleDodoWebhookEvents(payload);
        break;

      default:
        console.warn("⚠️ Unhandled event type:", payload.type);
        return new Response("Unhandled event type", { status: 204 }); // no action taken
    }

    return new Response("Webhook received", { status: 200 });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response("Webhook error", { status: 400 });
  }
}
