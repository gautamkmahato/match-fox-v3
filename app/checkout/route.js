import { Checkout } from "@polar-sh/nextjs";

console.log("its checkpt route")
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL
});