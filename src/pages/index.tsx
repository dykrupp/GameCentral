import React, { useState } from 'react';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { ImageSlider } from '../components/ImageSlider';
import { Button, Typography } from '@material-ui/core';
import { useShoppingCart } from 'use-shopping-cart';
import { ProductInfo } from '../utils/interfaces';
import { MoreInfoAccordion } from '../components/MoreInfoAccordion';
import Paper from '@material-ui/core/Paper';

const HomeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  min-height: 550px;
  width: 100%;
`;

const HomeTitle = styled(Typography)`
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const AddToCartButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 100%;
  height: 48px;
`;

const PaperSlider = styled(Paper)`
  padding: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-left: 25px;
  margin-right: 25px;
`;

//TODO -> Further image optimization
//TODO -> Setup netlify deploy hook based on updating products via 'stripe dashboard'
const IndexPage: React.FC = () => {
  const { addItem } = useShoppingCart();
  const [isSliderPlaying, setIsSliderPlaying] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<ProductInfo | null>(
    null
  );

  return (
    <HomeContainer>
      <SEO title="GameCentral Home" />
      <HomeTitle variant="h4">Our Top Picks</HomeTitle>
      <PaperSlider elevation={3}>
        <ImageSlider
          setCurrentProduct={setCurrentProduct}
          isPlaying={isSliderPlaying}
          setIsPlaying={setIsSliderPlaying}
        />
        <MoreInfoAccordion
          productInfo={currentProduct}
          setIsPlaying={setIsSliderPlaying}
        />
        <AddToCartButton
          data-testid="add-to-cart-button"
          disabled={currentProduct === null}
          onClick={() => {
            setIsSliderPlaying(false);
            if (currentProduct) addItem(currentProduct);
          }}
          color="primary"
          variant="contained"
        >
          Add To Cart
        </AddToCartButton>
      </PaperSlider>
    </HomeContainer>
  );
};

export default IndexPage;
