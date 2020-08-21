import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/constants';

const Ps4Page: React.FC = () => (
  <>
    <SEO title="PS4 Products Page" />
    <ProductContainer type={ProductType.PS4} />
  </>
);

export default Ps4Page;
