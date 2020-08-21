import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Button } from '@material-ui/core';
import { ProductInfo } from '../../utils/interfaces';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 20px !important;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  background-color: #fff;
  border-radius: 6px;
  width: 205px;
  margin: 0 auto;
`;

const TitleHeader = styled.h4`
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
`;

const ProductText = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
`;

interface ProductItemProps {
  productInfo: ProductInfo;
}

const ProductItem: React.FC<ProductItemProps> = ({ productInfo }) => {
  const cart = useShoppingCart();

  return (
    <Container>
      <TitleHeader>{productInfo.name}</TitleHeader>
      <Img
        style={{ width: '150px', margin: '0 auto' }}
        fluid={productInfo.fluidObject}
      />
      <ProductText>{productInfo.description}</ProductText>
      <ProductText style={{ margin: '5px' }}>
        Price:{' '}
        {formatCurrencyString({
          value: productInfo.price,
          currency: productInfo.currency,
          language: 'EN',
        })}
      </ProductText>
      <Button
        color="primary"
        variant="contained"
        onClick={() => cart.addItem(productInfo)}
      >
        ADD TO CART
      </Button>
    </Container>
  );
};

ProductItem.propTypes = {
  productInfo: PropTypes.any.isRequired,
};

export default ProductItem;
