'use server'

import { Polar } from "@polar-sh/sdk";

export default async function polarTest() {

    const polar = new Polar({
        accessToken: POLAR_TOKEN,
        
    });

    const checkout = await polar.checkouts.create({
        products: [process.env.POLAR_PRODUCT_ID],
        successUrl: process.env.POLAR_SUCCESS_URL
    });
    console.log(checkout.url);
}