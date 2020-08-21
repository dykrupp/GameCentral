import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import GodOfWar from '../../images/GodOfWar.jpg';
import WoW from '../../images/WOW.jpg';
import styled from 'styled-components';

export const sliderHeight = '450px';

const ImageSliderContainer = styled.div`
  height: ${sliderHeight};
`;

//TODO -> Finish styling and remove these static images and replace with tagged photos via 'staticQuery'

export const ImageSlider: React.FC = () => (
  <ImageSliderContainer>
    <AwesomeSlider
      animation="cubeAnimation"
      bullets={true}
      cssModule={sliderStyles}
    >
      <div data-src={GodOfWar}></div>
      <div data-src={GodOfWar}></div>
      <div data-src={WoW}></div>
      <div data-src={WoW}></div>
      <div data-src={WoW}></div>
    </AwesomeSlider>
  </ImageSliderContainer>
);
