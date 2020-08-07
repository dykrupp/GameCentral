import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Products from '../components/Products/';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="Products Page" />
    <h1 style={{ textAlign: 'center' }}>Products Page</h1>
    <Products />
  </Layout>
);

export default ProductsPage;
