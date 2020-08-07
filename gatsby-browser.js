import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart'

const stripePromise = loadStripe(
    process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
      ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
      : ''
);

export const wrapRootElement = ({ element }) => {
    return (
        <CartProvider
            mode="client-only"
            stripe={stripePromise}
            successUrl={`${window.location.origin}/page-2/`}
            cancelUrl={`${window.location.origin}/`}
            currency="USD"
            allowedCountries={['US', 'CA']}
            billingAddressCollection={true}
        >
        {element}
        </CartProvider>
    );
}
