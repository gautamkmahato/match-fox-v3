// app/api/webhooks/stripe/route.ts
import savePayment, { checkPaymentExists, createPaymentData, upsertSubscription, upsertUsage } from '@/app/service/payment/paymentService';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';


 
// Initialize Stripe with proper error handling
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-04-10',
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
}; 

function isSubscription(session) {
  return session.metadata?.plan !== undefined;
}


export async function POST(req) {
    console.log('Stripe webhook received!');


    if (!webhookSecret) {
        console.error('⚠️ Stripe webhook secret not found.');
        return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 });
    }

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    console.error('⚠️ Missing Stripe signature header');
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log('✅ Stripe signature verified.');
  } catch (err) {
    console.error(`❌ Error verifying webhook signature: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`Processing event: ${event.id}, type: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`Checkout session ${session.id} completed! Payment Status: ${session.payment_status}`);

        // get the clerk Id from metadata
        const clerkUserId = session.metadata?.clerkUserId || session.client_reference_id;
        console.log('✅ Clerk user ID from session:', clerkUserId);

        if (!clerkUserId) {
            console.warn('No Clerk user ID found in session metadata');
            return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
        }

        // get credits from metadata
        const credits = session.metadata?.credits

        if (session.payment_status === 'paid') {
          const checkoutSessionId = session.id;

          try {
            if (await checkPaymentExists(checkoutSessionId)) {
              console.log(`🔁 Event ${event.id} already processed for session ${checkoutSessionId}. Skipping.`);
              return NextResponse.json({ received: true, message: 'Already processed' }, { status: 200 });
            }

            const subs = await stripe.subscriptions.retrieve(session.subscription);
            const invoice = await stripe.invoices.retrieve(subs.latest_invoice);

            const paymentData = createPaymentData(session, clerkUserId, invoice, credits);
            console.log("paymentData: ", paymentData)

            await savePayment(paymentData);

            console.log(`✅ Payment record saved for session ${checkoutSessionId}.`);
            
            // Add fulfillment logic here
            if (isSubscription(session)) {
                const plan = session.metadata?.plan || 'BASIC_MONTHLY';
                await upsertSubscription(clerkUserId, plan);
                await upsertUsage(clerkUserId, credits);
            }



          } catch (dbError) {
            console.error('Database operation failed:', dbError);
            return NextResponse.json({ error: 'Failed to process payment data.' }, { status: 500 });
          }
        } else {
          console.warn(`Checkout session ${session.id} completed but payment status is ${session.payment_status}. Not processing.`);
        }
        break;
      }
      // other case statements
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`Webhook handler error for event ${event.id}: ${error.message}`);
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 });
  }
}