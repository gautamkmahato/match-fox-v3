import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.phonepe.com/apis/identity-manager/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PHONEPE_CLIENT_ID,
      client_secret: process.env.PHONEPE_CLIENT_SECRET,
      client_version: process.env.PHONEPE_CLIENT_VERSION, // Important!
    }),
  });

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    console.log("======== DATA ==========")
    console.log(data)
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Failed to parse token response:", text);
    return NextResponse.json({ error: "Invalid response from PhonePe token endpoint", html: text });
  }
}
