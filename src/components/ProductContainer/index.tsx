import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductType } from '../../utils/constants';
import PropTypes from 'prop-types';
import { useProductInfo } from '../../utils/hooks/useProductInfo';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
`;

interface ProductContainerProps {
  type: ProductType;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ type }) => {
  const productInfo = useProductInfo();

  return (
    <Container>
      {productInfo.map((product, index) => {
        if (type !== product.type) return null;
        return <ProductItem key={index} productInfo={product} />;
      })}
    </Container>
  );
};

ProductContainer.propTypes = {
  type: PropTypes.any.isRequired,
};

export default ProductContainer;
