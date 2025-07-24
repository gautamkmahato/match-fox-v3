import { NextResponse } from 'next/server';

export async function GET(req) {
  const txnId = req.nextUrl.searchParams.get('merchantTransactionId');

  const tokenRes = await fetch(`${process.env.YOUR_DOMAIN}/api/phonepe/token`);
  const { access_token, token_type } = await tokenRes.json();

  const statusRes = await fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.PHONEPE_CLIENT_ID}/${txnId}`,{
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }
  );

  const statusData = await statusRes.json();
  return NextResponse.json(statusData);
}
