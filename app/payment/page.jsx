import React from 'react'
import BuyCredits from './_components/BuyCredits'
import Header from '../_components/(home)/Header'
import Checkout from '../_components/Checkout'
import PayPalButton from './_components/PayPalButton'
import SiteFooter from '../_components/(home)/SiteFooter'
import PhonePeButton from './_components/PhonePeButton'

export default function page() {
    return (
        <>
            <Header />
            <BuyCredits />
            {/* <Checkout /> */}
            {/* <PayPalButton amount="10.00" /> */}
            {/* <PhonePeButton /> */}
            <SiteFooter />

        </>
    )
}