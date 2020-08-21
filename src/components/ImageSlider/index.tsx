import React, { useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import styled from 'styled-components';
import { usePickedProductInfo } from '../../utils/hooks/usePickedProductInfo';
import Skeleton from '@material-ui/lab/Skeleton';

//TODO -> add button functionality w/ cursor change

export const sliderHeight = '450px';

const ImageSliderContainer = styled.div`
  height: ${sliderHeight};
`;

const LoadingSkeleton = styled(Skeleton)`
  height: ${sliderHeight};
  transform: none;
`;

export const ImageSlider: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pickedProductInfo = usePickedProductInfo();

  return (
    <div>
      {isLoading && <LoadingSkeleton animation="wave" />}
      <ImageSliderContainer>
        <AwesomeSlider
          infinite={true}
          animation="cubeAnimation"
          bullets={true}
          cssModule={sliderStyles}
          style={{ display: isLoading ? 'none' : 'block' }}
          onFirstMount={() => setIsLoading(false)}
        >
          {pickedProductInfo.map((productInfo) => (
            <div key={productInfo.sku} data-src={productInfo.fluidObject.src} />
          ))}
        </AwesomeSlider>
      </ImageSliderContainer>
    </div>
  );
};
