import React from 'react';
import styled from 'styled-components';
import { ProductEdge } from './index';
import PropTypes from 'prop-types';
import { FluidObject } from 'gatsby-image';
import Img from 'gatsby-image';
import { useShoppingCart } from 'use-shopping-cart';

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
  productEdge: ProductEdge;
  fluidImage: FluidObject;
}

const formatPrice = (amount: number, currency: string) => {
  const price = parseFloat((amount / 100).toFixed(2));
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(price);
};

const ProductItem: React.FC<ProductItemProps> = ({
  productEdge,
  fluidImage,
}) => {
  const cart = useShoppingCart();

  return (
    <Container>
      <TitleHeader>{productEdge.node.product.name}</TitleHeader>
      <Img style={{ width: '150px', margin: '0 auto' }} fluid={fluidImage} />
      <ProductInfo style={{ marginTop: '5px' }}>
        Price:{' '}
        {formatPrice(productEdge.node.unit_amount, productEdge.node.currency)}
      </ProductInfo>
      <ProductInfo>{productEdge.node.product.description}</ProductInfo>
      <BuyButton onClick={() => console.log('click clack BOOM')}>Buy</BuyButton>
    </Container>
  );
};

ProductItem.propTypes = {
  productEdge: PropTypes.any.isRequired,
  fluidImage: PropTypes.any.isRequired,
};

export default ProductItem;
