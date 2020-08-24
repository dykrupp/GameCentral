import React, { useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import styled from 'styled-components';
import { usePickedProductInfo } from '../../utils/hooks/usePickedProductInfo';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductInfo } from '../../utils/interfaces';
import PropTypes from 'prop-types';

export const sliderHeight = '350px';

const ImageSliderContainer = styled.div`
  height: ${sliderHeight};
`;

const LoadingSkeleton = styled(Skeleton)`
  height: ${sliderHeight};
  transform: none;
`;

interface ImageSliderProps {
  setCurrentProduct: (product: ProductInfo) => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  setCurrentProduct,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const pickedProductInfo = usePickedProductInfo();

  return (
    <>
      {isLoading && <LoadingSkeleton animation="wave" />}
      <ImageSliderContainer style={{ display: isLoading ? 'none' : 'block' }}>
        <AwesomeSlider
          infinite={true}
          animation="cubeAnimation"
          bullets={true}
          cssModule={sliderStyles}
          onFirstMount={(e) => {
            setCurrentProduct(pickedProductInfo[e.currentIndex]);
            setIsLoading(false);
          }}
          onTransitionRequest={(e) =>
            setCurrentProduct(pickedProductInfo[e.nextIndex])
          }
        >
          {pickedProductInfo.map((productInfo) => (
            <div key={productInfo.sku} data-src={productInfo.fluidObject.src} />
          ))}
        </AwesomeSlider>
      </ImageSliderContainer>
    </>
  );
};

ImageSlider.propTypes = {
  setCurrentProduct: PropTypes.func.isRequired,
};
