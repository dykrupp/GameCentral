import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="Products Page" />
    <ProductContainer />
  </Layout>
);

export default ProductsPage;
