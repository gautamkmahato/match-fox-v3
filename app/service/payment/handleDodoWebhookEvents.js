import crypto from "crypto";
import savePayment, { upsertSubscription, upsertUsage } from "./paymentService";

/**
 * Handles Dodo webhook events
 */
export async function handleDodoWebhookEvents(payload) {
  const eventType = payload?.type;
  const data = payload?.data;

  if (!eventType || !data) {
    console.warn("❌ Missing event type or data in payload");
    return;
  }

  try {
    const userId = data?.metadata?.clerk_id;

    if (!userId) {
      console.warn(`⚠️ Missing clerk_id in metadata for event: ${eventType}`);
      return;
    }

    const credits = parseInt(data?.metadata?.credits) || 0;
    const plan = data?.metadata?.plan || "NA";

    switch (eventType) {
      case "payment.succeeded": {
        const paymentData = {
          id: crypto.randomUUID(),
          user_id: userId,
          amount: (data?.total_amount || 0) / 100,
          payment_provider: "dodo",
          payment_status: data?.status || "unknown",
          transaction_id: data?.payment_id || null,
          credits,
          remarks: "Dodo Purchase",
          customer_id: data?.customer?.customer_id || null,
          invoice_id: null,
          receipt_url: data?.payment_link || null,
          payment_intent_id: null,
        };

        await savePayment(paymentData);
        await upsertUsage(userId, credits);
        await upsertSubscription(userId, plan);

        console.log("✅ [payment.succeeded] Payment recorded and subscription/usage updated");
        break;
      }

      case "payment.failed": {
        console.warn(`❌ [payment.failed] Payment failed for user ${userId}. Details:`, {
          error: data?.error_message,
          code: data?.error_code,
        });
        break;
      }

      case "payment.processing": {
        console.log(`⏳ [payment.processing] Payment is processing for user ${userId}.`);
        break;
      }

      case "payment.cancelled": {
        console.warn(`⚠️ [payment.cancelled] Payment was cancelled by user ${userId}.`);
        break;
      }

      default: {
        console.warn(`⚠️ Unhandled Dodo event type: ${eventType}`);
      }
    }
  } catch (err) {
    console.error(`❌ Error handling Dodo event [${payload?.type}]:`, err);
    // Do not re-throw in production if you want to avoid webhook retries
  }
}
