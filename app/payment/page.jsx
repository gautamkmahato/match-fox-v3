import React from 'react'
import BuyCredits from './_components/BuyCredits'
import Header from '../_components/(home)/Header'
import Checkout from '../_components/Checkout'
import PayPalButton from './_components/PayPalButton'
import SiteFooter from '../_components/(home)/SiteFooter'
import PhonePeButton from './_components/PhonePeButton'
import Polar from './_components/Polar'
import DodoPayments from './_components/DodoPayments'

export default function page() {
    return (
        <>
            <Header />
            <BuyCredits />
            {/* <Polar /> */}
            {/* <Checkout /> */}
            {/* <PayPalButton amount="10.00" /> */}
            {/* <PhonePeButton /> */}
            {/* <DodoPayments /> */}
            <SiteFooter />


        </>
    )
}