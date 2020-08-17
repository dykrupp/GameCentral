import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FluidObject } from 'gatsby-image';
import Img from 'gatsby-image';
import { Button } from '@material-ui/core';
import {
  useShoppingCart,
  Product,
  formatCurrencyString,
} from 'use-shopping-cart';

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

const ProductInfo = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
`;

interface ProductItemProps {
  product: Product;
  fluidImage: FluidObject;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, fluidImage }) => {
  const cart = useShoppingCart();

  return (
    <Container>
      <TitleHeader>{product.name}</TitleHeader>
      <Img style={{ width: '150px', margin: '0 auto' }} fluid={fluidImage} />
      <ProductInfo>{product.description}</ProductInfo>
      <ProductInfo style={{ margin: '5px' }}>
        Price:{' '}
        {formatCurrencyString({
          value: product.price,
          currency: product.currency,
          language: 'EN',
        })}
      </ProductInfo>
      <Button
        color="primary"
        variant="contained"
        onClick={() => cart.addItem(product)}
      >
        ADD TO CART
      </Button>
    </Container>
  );
};

ProductItem.propTypes = {
  product: PropTypes.any.isRequired,
  fluidImage: PropTypes.any.isRequired,
};

export default ProductItem;
