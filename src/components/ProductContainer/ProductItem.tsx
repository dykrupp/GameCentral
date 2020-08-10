import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FluidObject } from 'gatsby-image';
import Img from 'gatsby-image';
import {
  useShoppingCart,
  Product,
  formatCurrencyString,
} from 'use-shopping-cart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  background-color: #fff;
  border-radius: 6px;
  width: 205px;
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

const BuyButton = styled.button`
  font-size: 13px;
  text-align: center;
  color: #fff;
  outline: none;
  padding: 12px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 178, 56);
  border-radius: 6px;
  letter-spacing: 1.5px;
  width: 100%;
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
      <ProductInfo style={{ marginTop: '5px' }}>
        Price:{' '}
        {formatCurrencyString({
          value: product.price,
          currency: product.currency,
          language: 'EN',
        })}
      </ProductInfo>
      <ProductInfo>{product.description}</ProductInfo>
      <BuyButton onClick={() => cart.addItem(product)}>ADD TO CART</BuyButton>
    </Container>
  );
};

ProductItem.propTypes = {
  product: PropTypes.any.isRequired,
  fluidImage: PropTypes.any.isRequired,
};

export default ProductItem;
