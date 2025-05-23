// app/api/webhooks/stripe/route.ts

import savePayment, { checkPaymentExists, createPaymentData, upsertSubscription, upsertUsage, resetUsage } from '@/app/service/payment/paymentService';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.error('❌ Missing STRIPE_SECRET_KEY in environment variables');
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
  return !!session.metadata?.plan;
}

const eventHandlers = {
  'checkout.session.completed': handleCheckoutSessionCompleted,
  'invoice.paid': handleInvoicePaid,
  'customer.subscription.created': handleSubscriptionCreated,
};

export async function POST(req) {
  console.log('📩 Stripe webhook POST received');

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    console.log(`✅ Verified Stripe event: ${event.type} (${event.id})`);
  } catch (err) {
    console.error('❌ Error verifying Stripe webhook signature:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const handler = eventHandlers[event.type];
  if (!handler) {
    console.warn(`⚠️ Unhandled Stripe event type: ${event.type}`);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const result = await handler(event);
    return result || NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`❌ Error handling event ${event.type}:`, error.message);
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(event) {
  const session = event.data.object;
  console.log(`🎉 Checkout session completed: ${session.id} (status: ${session.payment_status})`);

  if (session.payment_status !== 'paid') {
    console.warn(`💸 Session ${session.id} not paid (status: ${session.payment_status})`);
    return;
  }

  const clerkUserId = session.metadata?.clerkUserId || session.client_reference_id;
  if (!clerkUserId) {
    console.warn('⚠️ Clerk user ID missing from session metadata.');
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  const checkoutSessionId = session.id;
  const alreadyProcessed = await checkPaymentExists(checkoutSessionId);
  if (alreadyProcessed) {
    console.log(`🔁 Session ${checkoutSessionId} already processed. Skipping.`);
    return NextResponse.json({ received: true, message: 'Already processed' }, { status: 200 });
  }

  try {
    const subscription = session.subscription
      ? await stripe.subscriptions.retrieve(session.subscription)
      : null;

    const invoice = subscription?.latest_invoice
      ? await stripe.invoices.retrieve(subscription.latest_invoice)
      : null;

    const credits = session.metadata?.credits;
    const paymentData = createPaymentData(session, clerkUserId, invoice, credits);
    await savePayment(paymentData);

    if (isSubscription(session)) {
      const plan = session.metadata?.plan;
      if (plan) {
        console.log('📦 Subscribing user to plan:', plan);
        await upsertSubscription(clerkUserId, plan);
      }
    }

    // ALWAYS add minutes for ANY payment type (accumulate)
    if (credits) {
      await upsertUsage(clerkUserId, credits);
    }

    console.log(`✅ Payment processed and saved for session ${checkoutSessionId}`);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('❌ Error during checkout.session.completed handling:', err.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleInvoicePaid(event) {
  const invoice = event.data.object;
  console.log(`💰 Invoice paid: ${invoice.id}`);

  if (!invoice.subscription) return;

  try {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const sessions = await stripe.checkout.sessions.list({
      subscription: subscription.id,
      limit: 1
    });

    if (sessions.data.length === 0) return;
    const checkoutSession = sessions.data[0];

    const clerkUserId = checkoutSession.metadata?.clerkUserId || checkoutSession.client_reference_id;
    if (!clerkUserId) {
      console.warn('⚠️ Clerk user ID missing from session metadata.');
      return;
    }

    // Check if this is a renewal (not the first payment)
    const isRenewal = invoice.billing_reason === 'subscription_cycle';
    
    const credits = checkoutSession.metadata?.credits;
    if (credits && isRenewal) {
      // For subscription renewals, ALSO ADD minutes (accumulate)
      console.log('🔄 Subscription renewal - adding usage');
      await upsertUsage(clerkUserId, credits);
    }
  } catch (err) {
    console.error('❌ Error processing invoice.paid event:', err);
  }
}

async function handleSubscriptionCreated(event) {
  const subscription = event.data.object;
  console.log(`🆕 Subscription created: ${subscription.id}`);

  try {
    const sessions = await stripe.checkout.sessions.list({
      subscription: subscription.id,
      limit: 1
    });

    if (sessions.data.length === 0) return;
    const checkoutSession = sessions.data[0];

    const clerkUserId = checkoutSession.metadata?.clerkUserId || checkoutSession.client_reference_id;
    if (!clerkUserId) {
      console.warn('⚠️ Clerk user ID missing from session metadata.');
      return;
    }

    const plan = checkoutSession.metadata?.plan;
    if (plan) {
      await upsertSubscription(clerkUserId, plan);
    }
  } catch (err) {
    console.error('❌ Error processing subscription.created event:', err);
  }
}