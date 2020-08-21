import React from 'react';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { ImageSlider } from '../components/ImageSlider';

const HomeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  min-height: 550px;
`;

//TODO -> Finish slider component here
//TODO -> Setup netlify deploy hook based on updating products via 'stripe dashboard'
//TODO -> Perhaps include some type of search bar to quickly find a specific product
//TODO -> Make this the new home page with a welcoming banner & reviews of the most popular games being playedw
const IndexPage: React.FC = () => {
  return (
    <HomeContainer>
      <SEO title="Game Central Home" />
      <h1 style={{ textAlign: 'center' }}>Our Top Picks</h1>
      <ImageSlider />
    </HomeContainer>
  );
};

export default IndexPage;
