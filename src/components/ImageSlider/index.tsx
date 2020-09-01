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

interface PureImageSliderProps extends ImageSliderProps {
  productInfo: ProductInfo[];
}

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const PureImageSlider: React.FC<PureImageSliderProps> = ({
  productInfo,
  setCurrentProduct,
  isPlaying,
  setIsPlaying,
}) => {
  const [isLoading, setIsLoading] = useState(true);

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
            setCurrentProduct(productInfo[e.currentIndex]);
            setIsLoading(false);
          }}
          onTransitionStart={(e: AwesomeSliderStartEventArgs) => {
            setCurrentProduct(productInfo[e.nextIndex]);
          }}
          onTransitionEnd={() => {
            if (!isPlaying) setIsPlaying(true);
          }}
        >
          {productInfo.map((item) => (
            <div key={item.sku} data-src={item.fluidObject.src} />
          ))}
        </AutoplaySlider>
      </ImageSliderContainer>
    </RootContainer>
  );
};

PureImageSlider.propTypes = {
  productInfo: PropTypes.array.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export const ImageSlider: FC<ImageSliderProps> = memo(
  ({ setCurrentProduct, isPlaying, setIsPlaying }) => {
    const pickedProductInfo = usePickedProductInfo();

    return (
      <PureImageSlider
        setCurrentProduct={setCurrentProduct}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        productInfo={pickedProductInfo}
      />
    );
  }
);

ImageSlider.displayName = 'ImageSlider';

ImageSlider.propTypes = {
  setCurrentProduct: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default ImageSlider;
