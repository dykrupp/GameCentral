import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const NintendoPage: React.FC = () => (
  <>
    <SEO title="Nintendo Products Page" />
    <ProductContainer type={ProductType.Nintendo} />
  </>
);

export default NintendoPage;
