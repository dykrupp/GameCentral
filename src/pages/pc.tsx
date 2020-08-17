import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="PC Products Page" />
    <ProductContainer type={ProductType.PC} />
  </Layout>
);

export default ProductsPage;
