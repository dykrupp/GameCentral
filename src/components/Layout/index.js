import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import InnerLayout from './InnerLayout';

//TODO -> Can this file be a true TS .tsx file? or does it need to be a standard .js file
//TODO -> Squash commits once done

const stripePromise = loadStripe(
  process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
    : ''
);

const palette = {
  primary: { main: '#673AB7' },
  secondary: { main: '#1976D2' },
};

const typography = {
  fontFamily: 'Arial',
};

export default ({ children, location }) => (
  <CartProvider
    mode="client-only"
    stripe={stripePromise}
    successUrl={`${location.origin}/purchase-confirmation/`}
    cancelUrl={`${location.origin}/`}
    currency="USD"
    allowedCountries={['US', 'CA']}
    billingAddressCollection={true}
  >
    <ThemeProvider theme={createMuiTheme({ palette, typography })}>
      <CssBaseline />
        <InnerLayout>
          {children}
        </InnerLayout>
    </ThemeProvider>
  </CartProvider>
);
