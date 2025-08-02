// app/api/dodo/route.ts
import { PRODUCT_METADATA } from "@/lib/dodo/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Checkout } from "@dodopayments/nextjs";
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';


const handleCheckout = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_PRODUCTION_API_KEY,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: "live_mode", // ✅ PRODUCTION
  type: "dynamic",
  manual: true,
});

export async function POST(req) {
  try {

    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
    }
    // 1. Rate limiting (basic IP-based)
    const ip_address = req.headers.get('x-forwarded-for') || 'localhost';
    if (isRateLimited(ip_address)) {
      return NextResponse.json({ state: false, error: 'Too many requests', message: 'Rate limit exceeded' }, { status: 429 });
    }

    // 2. Authenticated user
    const user = await currentUser();

    console.log("************** user ********")
    console.log(user)

    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: 'User not authenticated' }, { status: 401 });
    }

    const body = await req.json();

    const { product_id, customer, billing, payment_link, quantity, billing_currency, return_url } = body;

    if (!product_id || typeof product_id !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid product_id" }), { status: 400 });
    }

    const productInfo = PRODUCT_METADATA[product_id];

    if (!productInfo) {
      return new Response(JSON.stringify({ error: "Unknown product_id" }), { status: 404 });
    }

    const { plan, credits, price } = productInfo;

    const enrichedRequest = {
      billing,
      customer,
      metadata: {
        plan,
        credits: String(credits),
        price: String(price),
        clerk_id: body?.metadata?.clerk_id ?? "unknown"
      },
      payment_link,
      product_id,
      quantity,
      billing_currency,
      return_url,
    };

    const fakeReq = new Request(req.url, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify(enrichedRequest),
    });

    const result = await handleCheckout(fakeReq);
    const location = result.headers.get("Location");

    if (!location) {
      return new Response(JSON.stringify({ error: "No redirect URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: location }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[DODO CHECKOUT ERROR]", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
