import React from 'react';
import SEO from '../components/SEO';
import ProductContainer from '../components/ProductContainer';
import { ProductType } from '../utils/constants';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

const ProductSearchPage: React.FC = () => {
  const parsedTitle = queryString.parse(useLocation().search).title?.toString();

  return (
    <>
      <SEO title="Searched Products Page" />
      <ProductContainer type={ProductType.ANY} title={parsedTitle} />
    </>
  );
};

export default ProductSearchPage;
