import paypal from "@paypal/checkout-server-sdk";

const Environment =
  process.env.PAYPAL_ENV === "live"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

export default paypalClient;
