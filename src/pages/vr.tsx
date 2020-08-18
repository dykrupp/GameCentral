import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/types';

const VrPage: React.FC = () => (
  <>
    <SEO title="VR Products Page" />
    <ProductContainer type={ProductType.VR} />
  </>
);

export default VrPage;
