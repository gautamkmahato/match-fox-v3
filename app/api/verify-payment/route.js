// app/api/verify-payment/route.js
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    console.log("razorpay_order_id: ", razorpay_order_id);
    console.log("razorpay_payment_id: ", razorpay_payment_id);
    console.log("razorpay_signature: ", razorpay_signature);

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("generated_signature: ", generated_signature)

    const isValid = generated_signature === razorpay_signature;

    console.log("isValid: ", isValid)
    

    if (isValid) {
      // You can store the successful payment to DB here
      return Response.json({ state: true, data: "Success", message: "Payment verified" });
    } else {
      return new Response({ state: false, data: "Failed", message: "Invalid signature" }, {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response({ state: false, data: "Failed", error: "Server Error" }, {
      status: 500,
    });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
