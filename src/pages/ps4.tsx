import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="PS4 Products Page" />
    <ProductContainer type={ProductType.PS4} />
  </Layout>
);

export default ProductsPage;
