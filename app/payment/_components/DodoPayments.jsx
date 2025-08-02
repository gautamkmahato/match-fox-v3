'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function DodoPayments() {
    const [loading, setLoading] = useState(false);

    const { user, isLoaded, isSignedIn } = useUser();

    if(!isLoaded){
        return(
            <>
                <h1>User Loading...</h1>
            </>
        )
    }
    if(!isSignedIn){
        return(
            <>
                <h1>Sign In to complete payment...</h1>
            </>
        )
    }

    const handleCheckout = async () => {
        setLoading(true);

        const res = await fetch('/api/dodo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "billing": {
                    "city": "Texas",
                    "country": "US",
                    "state": "Texas",
                    "street": "56, hhh",
                    "zipcode": "560000"
                },
                "customer": {
                    "email": "test@example.com",
                    "name": "test"
                },
                "metadata": {
                    "clerk_id": user?.id ?? "unknown",
                    "credits": String(9000),
                    "plan": "Pro"
                },
                "payment_link": true,
                "product_id": "pdt_Zi5rRgtK6J9dIbpM3oMO2",
                "quantity": 1,
                "billing_currency": "USD",
                "return_url": "https://example.com",
            }),
        });

        if (!res.ok) {
            alert('Failed to create checkout session.');
            setLoading(false);
            return;
        }

        const result = await res.json();
        console.log('Redirect URL:', result.url);

        if (result.url) {
            window.location.href = result.url;
        } else {
            alert('No checkout URL received.');
        }

        setLoading(false);

    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
        >
            {loading ? 'Redirecting...' : 'Subscribe with Dodo'}
        </button>
    );
}
