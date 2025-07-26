import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  const { amount, merchantOrderId, userId } = await req.json();

  const tokenRes = await fetch(`${process.env.NEXT_APP_PRODUCTION_HOSTNAME}/api/phonepe/token`);
  const tokenData = await tokenRes.json();

  if (!tokenData?.access_token || !tokenData?.token_type) {
    return NextResponse.json({ success: false, message: "Token fetch failed", data: tokenData });
  }

  const { access_token, token_type } = tokenData;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token_type} ${access_token}`,
  };

  const payload = {
    merchantOrderId,
    amount: amount * 100,
    expireAfter: 1200,
    metaInfo: {
      udf1: "test1",
      udf2: "new param2",
      udf3: "test3",
      udf4: "dummy value 4",
      udf5: "additional info ref1",
    },
    paymentFlow: {
      type: "PG_CHECKOUT",
      message: "Redirecting to PhonePe",
      merchantUrls: {
        redirectUrl: `${process.env.NEXT_APP_PRODUCTION_HOSTNAME}/dashboard/candidate`,
      },
    },
  };

  const response = await fetch(
    "https://api.phonepe.com/apis/pg/checkout/v2/pay",
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    }
  );

  const resultText = await response.text();

  try {
    const result = JSON.parse(resultText);
    const redirectUrl = result?.data?.instrumentResponse?.redirectInfo?.url || null;

    return NextResponse.json({
      success: result.success,
      redirectUrl,
      fullResponse: result,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid JSON", raw: resultText });
  }
}
