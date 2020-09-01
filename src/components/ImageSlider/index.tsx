import React, { useState, FC, memo } from 'react';
import AwesomeSlider, {
  AwesomeSliderInfo,
  AwesomeSliderStartEventArgs,
} from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import styled from 'styled-components';
import { usePickedProductInfo } from '../../utils/hooks/usePickedProductInfo';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductInfo } from '../../utils/interfaces';
import PropTypes from 'prop-types';

export const sliderHeight = '350px';

const RootContainer = styled.div`
  margin-bottom: 50px;
`;

const ImageSliderContainer = styled.div`
  height: ${sliderHeight};
`;

const LoadingSkeleton = styled(Skeleton)`
  height: ${sliderHeight};
  transform: none;
`;

interface ImageSliderProps {
  setCurrentProduct: (product: ProductInfo) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const ImageSlider: FC<ImageSliderProps> = memo(
  ({ setCurrentProduct, isPlaying, setIsPlaying }) => {
    const [isLoading, setIsLoading] = useState(true);
    const pickedProductInfo = usePickedProductInfo();

    return (
      <RootContainer>
        {isLoading && <LoadingSkeleton animation="wave" />}
        <ImageSliderContainer style={{ display: isLoading ? 'none' : 'block' }}>
          <AutoplaySlider
            play={isPlaying}
            interval={15000}
            timerHeight="4px"
            timerBackgroundColor="#9A6DEA"
            cssModule={sliderStyles}
            onFirstMount={(e: AwesomeSliderInfo) => {
              setCurrentProduct(pickedProductInfo[e.currentIndex]);
              setIsLoading(false);
            }}
            onTransitionStart={(e: AwesomeSliderStartEventArgs) => {
              setCurrentProduct(pickedProductInfo[e.nextIndex]);
            }}
            onTransitionEnd={() => {
              if (!isPlaying) setIsPlaying(true);
            }}
          >
            {pickedProductInfo.map((productInfo) => (
              <div
                key={productInfo.sku}
                data-src={productInfo.fluidObject.src}
              />
            ))}
          </AutoplaySlider>
        </ImageSliderContainer>
      </RootContainer>
    );
  }
);

ImageSlider.displayName = 'ImageSlider';

ImageSlider.propTypes = {
  setCurrentProduct: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};
