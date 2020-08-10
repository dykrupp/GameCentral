import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { useShoppingCart } from 'use-shopping-cart';

const ConfirmationPage: React.FC = () => {
  const { clearCart } = useShoppingCart();

  clearCart();

  return (
    <Layout>
      <SEO title="Purchase Confirmation" />
      <h1>Purchase Confirmation</h1>
      <p>
        Thank you for your purchase. Please check your email for a receipt and
        for an estimated time of arrival.
      </p>
      <Link to="/">Head Back to GameCentral</Link>
    </Layout>
  );
};

export default ConfirmationPage;
