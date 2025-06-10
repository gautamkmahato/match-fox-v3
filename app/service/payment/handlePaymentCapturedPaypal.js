import crypto from "crypto";
import savePayment, { upsertSubscription, upsertUsage } from "./paymentService";
import { useUser } from "@clerk/nextjs";


export async function handlePaymentCapturedPaypal(payload) {
  try {
    const payment = payload.resource;

    const { user } = useUser();

    // const userId = payment.custom_id || payment.invoice_id || payment.payer?.email_address;

    const userId = user?.id;

    if (!userId) {
      throw new Error("Missing user ID or reference from PayPal payload.");
    }

    console.log("📦 PayPal Payment Captured:", payment);

    const notes = {
      // If you use metadata/custom_id in the PayPal request, extract plan/credits from there
      credits: payment?.supplementary_data?.related_ids?.credits || 100, // fallback default
      plan: payment?.supplementary_data?.related_ids?.plan || "NA",
      description: "PayPal Purchase",
    };

    const paymentData = {
      id: crypto.randomUUID(),
      user_id: userId,
      amount: parseFloat(payment.amount?.value || "0"),
      payment_provider: "paypal",
      payment_status: payment.status || "COMPLETED",
      transaction_id: payment.id,
      credits: notes.credits,
      remarks: notes.description,
      customer_id: payment.payer?.payer_id || null,
      invoice_id: null,
      receipt_url: null,
      payment_intent_id: null,
    };

    await savePayment(paymentData);
    await upsertUsage(userId, notes.credits);
    await upsertSubscription(userId, notes.plan);

    console.log("✅ All steps completed for PayPal PAYMENT.CAPTURE.COMPLETED");
  } catch (err) {
    console.error("❌ Error handling PayPal payment.captured:", err);
    throw err;
  }
}
