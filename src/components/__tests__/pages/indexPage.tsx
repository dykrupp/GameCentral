import React from 'react';
import { render } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import IndexPage from '../../../pages';
import { data } from '../__queryResults__/queryResult';

beforeEach(() => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

  useStaticQuery.mockImplementationOnce(() => ({
    site: {
      siteMetadata: {
        title: 'GameCentral',
      },
    },
  }));

  useStaticQuery.mockImplementationOnce(() => data);

  useStaticQuery.mockImplementationOnce(() => ({
    site: {
      siteMetadata: {
        title: 'GameCentral',
      },
    },
  }));
});

describe('IndexPage', () => {
  it('renders', () => {
    const { asFragment } = render(<IndexPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays correct # of topPicks', () => {
    const { getByTestId } = render(<IndexPage />);
    const imageSliderEle = getByTestId('image-slider-container').children[0];
    const navEle = Array.from(imageSliderEle.children).filter(
      (x) => x.className === 'awssld__bullets'
    )[0];
    expect(navEle.children.length).toBe(5);
  });
});
