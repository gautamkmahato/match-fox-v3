import React from 'react'
import BuyCredits from './_components/BuyCredits'
import Header from '../_components/(home)/Header'
import Checkout from '../_components/Checkout'
import PayPalButton from './_components/PayPalButton'

export default function page() {
    return (
        <>
            <Header />
            {/* <BuyCredits /> */}
            {/* <Checkout /> */}
            <PayPalButton amount="10.00" />

        </>
    )
}