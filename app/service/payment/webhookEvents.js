
import crypto from "crypto";
import savePayment, { upsertSubscription, upsertUsage } from "./paymentService";

export async function handlePaymentCaptured(payload) {
  try {
    const payment = payload.payload.payment.entity;
    const userId = payment.notes?.clerk_id;

    console.log("payment", payment)

    if (!userId) {
      throw new Error("Missing user ID in payment notes");
    }

    const paymentData = {
      id: crypto.randomUUID(),
      user_id: userId,
      amount: payment.amount / 100,
      payment_provider: "razorpay",
      payment_status: payment.status,
      transaction_id: payment.id,
      credits: payment.notes?.credits,
      remarks: payment.notes?.description || "Razorpay Purchase",
      customer_id: payment.customer_id || null,
      invoice_id: null,
      receipt_url: null,
      payment_intent_id: null,
    };

    await savePayment(paymentData);
    await upsertUsage(userId, payment.notes?.credits);
    await upsertSubscription(userId, payment.notes?.plan || "NA");

    console.log("✅ All steps completed for payment.captured");
  } catch (err) {
    console.error("❌ Error handling payment.captured:", err);
    throw err; // rethrow to be caught in main webhook route
  }
}
