import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const stripePromise = loadStripe(
    process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
      ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
      : ''
);

const palette = {
    primary: { main: '#673AB7' },
    secondary: { main: '#1976D2' }
  };

const themeName = 'Purple Heart Denim Python';

export const wrapRootElement = ({ element }) => {
    return (
        <CartProvider
            mode="client-only"
            stripe={stripePromise}
            successUrl={`${window.location.origin}/purchase-confirmation/`}
            cancelUrl={`${window.location.origin}/`}
            currency="USD"
            allowedCountries={['US', 'CA']}
            billingAddressCollection={true}
        >
        <ThemeProvider theme={createMuiTheme({ palette, themeName })}>
        {element}
        </ThemeProvider>
        </CartProvider>
    );
}
