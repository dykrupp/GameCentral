import React from 'react';
import { render } from '@testing-library/react';
import { PureImageSlider } from '../ImageSlider/index';
import { ProductInfo } from '../../utils/interfaces';

describe('ImageSlider', () => {
  it('renders', () => {
    const setIsPlaying = jest.fn();
    const setCurrentProduct = jest.fn();

    const newProduct: ProductInfo = {
      name: 'World of Warcraft',
      type: 'PC',
      sku: 'abc123ghsdsd',
      price: 20.99,
      currency: 'USD',
      isTopPick: false,
      fluidObject: {
        aspectRatio: 1.7936,
        src: 'test-src',
        srcSet: '/sample-src-set',
        sizes: '(max-width: 450px) 100vw, 450px',
      },
    };

    const { asFragment } = render(
      <PureImageSlider
        isPlaying={false}
        setIsPlaying={setIsPlaying}
        setCurrentProduct={setCurrentProduct}
        productInfo={[newProduct]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
