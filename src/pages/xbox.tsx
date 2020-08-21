import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/constants';

const XboxPage: React.FC = () => (
  <>
    <SEO title="Xbox Products Page" />
    <ProductContainer type={ProductType.Xbox} />
  </>
);

export default XboxPage;
