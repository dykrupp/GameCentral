import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import styled from 'styled-components';
import { usePickedProductInfo } from '../../utils/hooks/usePickedProductInfo';

export const sliderHeight = '450px';

const ImageSliderContainer = styled.div`
  height: ${sliderHeight};
`;

export const ImageSlider: React.FC = () => {
  const pickedProductInfo = usePickedProductInfo();

  if (!pickedProductInfo) return null;
  return (
    <ImageSliderContainer>
      <AwesomeSlider
        animation="cubeAnimation"
        bullets={true}
        cssModule={sliderStyles}
      >
        {pickedProductInfo.map((productInfo) => (
          <div key={productInfo.sku} data-src={productInfo.image} />
        ))}
      </AwesomeSlider>
    </ImageSliderContainer>
  );
};
