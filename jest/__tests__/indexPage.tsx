import React from 'react';
import { render } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import IndexPage from '../../src/pages';
import { data } from './__queryResults__/queryResult';

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

  it('slider displays correct # of topPicks', () => {
    const { getByTestId } = render(<IndexPage />);
    const imageSliderEle = getByTestId('image-slider-container').children[0];
    const navEle = Array.from(imageSliderEle.children).filter(
      (x) => x.className === 'awssld__bullets'
    )[0];
    expect(navEle.children.length).toBe(5);
  });

  it('slider autoplays', () => {
    const { getByTestId } = render(<IndexPage />);

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
