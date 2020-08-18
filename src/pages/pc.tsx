import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const PcPage: React.FC = () => (
  <>
    <SEO title="PC Products Page" />
    <ProductContainer type={ProductType.PC} />
  </>
);

export default PcPage;
