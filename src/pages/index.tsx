import React, { useState } from 'react';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { ImageSlider } from '../components/ImageSlider';
import { Button } from '@material-ui/core';
import { useShoppingCart } from 'use-shopping-cart';
import { ProductInfo } from '../utils/interfaces';

const HomeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  min-height: 550px;
`;

const AddToCartButton = styled(Button)`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
`;

//TODO -> Finish slider component here (Add Reviews accordion w/ data provided via metacritic api)
//TODO -> Further image optimization
//TODO -> Setup netlify deploy hook based on updating products via 'stripe dashboard'
//TODO -> Perhaps include some type of search bar to quickly find a specific product
const IndexPage: React.FC = () => {
  const { addItem } = useShoppingCart();
  const [currentProduct, setCurrentProduct] = useState<ProductInfo | null>(
    null
  );

  return (
    <HomeContainer>
      <SEO title="Game Central Home" />
      <h1 style={{ textAlign: 'center' }}>Our Top Picks</h1>
      <ImageSlider setCurrentProduct={setCurrentProduct} />
      <AddToCartButton
        disabled={currentProduct === null}
        onClick={() => (currentProduct ? addItem(currentProduct) : null)}
        color="primary"
        variant="contained"
      >
        Add To Cart
      </AddToCartButton>
    </HomeContainer>
  );
};

export default IndexPage;
