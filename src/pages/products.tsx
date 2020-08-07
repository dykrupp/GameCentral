import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ProductContainer from '../components/ProductContainer';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="Products Page" />
    <h1 style={{ textAlign: 'center' }}>Products Page</h1>
    <ProductContainer />
  </Layout>
);

export default ProductsPage;
