import React from 'react';
import { render } from '@testing-library/react';
import { PureImageSlider } from '../../src/components/ImageSlider';
import { ProductInfo } from '../../src/utils/interfaces';

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

describe('ImageSlider', () => {
  it('renders', () => {
    const setIsPlaying = jest.fn();
    const setCurrentProduct = jest.fn();

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

  it('autoplays on initialization', () => {
    const setIsPlaying = jest.fn();
    const setCurrentProduct = jest.fn();

    const { getByTestId } = render(
      <PureImageSlider
        isPlaying={true}
        setIsPlaying={setIsPlaying}
        setCurrentProduct={setCurrentProduct}
        productInfo={[newProduct]}
      />
    );

    const imageSliderEle = getByTestId('image-slider-container').children[0];

    const wrapperEle = Array.from(imageSliderEle.children).filter(
      (x) => x.className === 'awssld__wrapper'
    )[0];

    const divChildren = Array.from(
      Array.from(wrapperEle.children).filter(
        (x) => x.className === 'awssld__container'
      )[0].children
    );

    const activeContentDiv = Array.from(divChildren).filter((x) =>
      x.classList.contains('awssld--active')
    )[0].children[0];

    const activeTimer = Array.from(activeContentDiv.children).filter((x) =>
      x.classList.contains('awssld__timer')
    )[0];

    expect(activeTimer).toBeDefined();
  });
});
