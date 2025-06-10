import supabase from '@/lib/supabase/client';
import { PLAN_LIMITS } from '@/lib/utils/constants/plan';
import crypto from 'crypto';
import { addMonths } from 'date-fns';

export async function checkPaymentExists(transactionId) {
  try {
    const { data: existingPayment, error: checkError } = await supabase
      .from('payments')
      .select('id')
      .eq('transaction_id', transactionId)
      .maybeSingle();

    if (checkError) {
      console.error('Supabase check error:', checkError.message);
      throw checkError;
    }

    return !!existingPayment;
  } catch (error) {
    console.error('Database checkPaymentExists error:', error);
    throw error;
  }
}

export function createPaymentData(session, userId, invoice, credits) {
  return {
    id: crypto.randomUUID(),
    user_id: userId,
    amount: (session.amount_total || 0) / 100,
    payment_provider: 'stripe',
    payment_status: session.payment_status,
    transaction_id: session.id,
    credits: credits || 100,
    remarks: session.metadata?.description || 'Stripe Purchase',
    customer_id: typeof session.customer === 'string' ? session.customer : null,
    invoice_id: typeof session.invoice === 'string' ? session.invoice : null,
    receipt_url: invoice?.hosted_invoice_url || null,
    payment_intent_id: typeof session.payment_intent === 'string' ? invoice?.payment_intent : null,
  };
}

export default async function savePayment(paymentData) {
  try {
    const { data, error: insertError } = await supabase
      .from('payments')
      .insert([paymentData])
      .select();

    if (insertError) {
      console.log("insertError =====================", insertError)
      if (insertError.code === '23505') {
        console.log('⚠️ Payment already exists (duplicate webhook)');
        return;
      }
      console.error('❌ Supabase insert error:', insertError.message);
      throw new Error('Failed to save payment record.');
    }

    console.log('✅ Payment record saved successfully.');
  } catch (error) {
    console.error('Database savePayment error:', error);
    throw error;
  }
}

export async function upsertSubscription(userId, plan) {
  const startedAt = new Date();
  const expiresAt = addMonths(startedAt, 1);

  const { error } = await supabase
    .from('subscriptions')
    .upsert({ 
      user_id: userId,
      plan,
      started_at: startedAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      status: 'active'
    }, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('❌ Failed to upsert subscription:', error.message);
    throw new Error('Failed to upsert subscription');
  }

  console.log('✅ Subscription upserted successfully');
}

// ADD minutes to existing usage (for ALL payment types)
export async function upsertUsage(userId, credits) {
  const limits = PLAN_LIMITS[credits] || PLAN_LIMITS['20'];

  console.log("============ ADDING USAGE =================");
  console.log('Adding minutes:', limits.minutes);
  console.log('User:', userId);

  try {
    const { data, error } = await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_minutes: (limits.minutes)*60,
      p_reset_time: new Date().toISOString()
    });

    if (error) throw error;
    console.log(`✅ Added ${limits.minutes} minutes to user's usage (old + new)`);
  } catch (error) {
    console.error('❌ Error updating usage:', error);
    throw error;
  }
}

// RESET usage to plan limits (keeping this for potential future use)
export async function resetUsage(userId, credits) {
  const limits = PLAN_LIMITS[credits] || PLAN_LIMITS['20'];

  console.log("============ RESETTING USAGE =================");
  console.log('Resetting minutes to:', limits.minutes);

  try {
    const { data, error } = await supabase.rpc('reset_usage', {
      p_user_id: userId,
      p_minutes: limits.minutes,
      p_reset_time: new Date().toISOString()
    });

    if (error) throw error;
    console.log(`✅ Reset usage to ${limits.minutes} minutes for user`);
  } catch (error) {
    console.error('❌ Error resetting usage:', error);
    throw error;
  }
}