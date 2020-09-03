import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import IndexPage from '../../src/pages';
import { data } from './__queryResults__/queryResult';
import Layout from '../../src/components/Layout';

const setupMocks = () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
  useStaticQuery.mockImplementation(() => data);
};

describe('IndexPage', () => {
  it('renders', () => {
    setupMocks();

    const { asFragment } = render(<IndexPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays correct # of topPicks', () => {
    setupMocks();

    const { getByTestId } = render(<IndexPage />);
    const imageSliderEle = getByTestId('image-slider-container').children[0];
    const navEle = Array.from(imageSliderEle.children).filter(
      (x) => x.className === 'awssld__bullets'
    )[0];

    expect(navEle.children.length).toBe(5);
  });

  it('updates badge content when item is added to cart', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: 'GameCentral',
        },
      },
    }));

    useStaticQuery.mockImplementation(() => data);

    const { getByTestId } = render(
      <Layout location="test-location">
        <IndexPage />
      </Layout>
    );

    const addToCartButton = getByTestId('add-to-cart-button');
    const { getByText } = within(getByTestId('cart-badge'));

    expect(getByText('0')).toBeInTheDocument();

    setupMocks();

    expect(addToCartButton).toBeEnabled();

    fireEvent.click(addToCartButton);

    expect(getByText('1')).toBeInTheDocument();
  });
});
