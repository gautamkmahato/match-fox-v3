'use server'

import { Polar } from "@polar-sh/sdk";

export default async function polarTest() {

    const polar = new Polar({
        accessToken: "polar_oat_V1ElbSZXCYCDgwJsoW3KcTrlTOjEsQZbzGMm73cuGHS",
        
    });

    const checkout = await polar.checkouts.create({
        products: ["8a1b3b5b-b82c-447a-b437-d1155645801d"],
        successUrl: process.env.POLAR_SUCCESS_URL
    });
    console.log(checkout.url);
}