import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/SEO';
import { useShoppingCart } from 'use-shopping-cart';

const ConfirmationPage: React.FC = () => {
  const { clearCart } = useShoppingCart();

  clearCart();

  return (
    <>
      <SEO title="Purchase Confirmation" />
      <h1>Purchase Confirmation</h1>
      <p>
        Thank you for your purchase. Please check your email for a receipt and
        for an estimated time of arrival.
      </p>
      <Link to="/">Head Back to GameCentral</Link>
    </>
  );
};

export default ConfirmationPage;
