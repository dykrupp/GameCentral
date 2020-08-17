import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const ProductsPage: React.FC = () => (
  <Layout>
    <SEO title="VR Products Page" />
    <ProductContainer type={ProductType.VR} />
  </Layout>
);

export default ProductsPage;
