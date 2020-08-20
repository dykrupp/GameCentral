import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import sliderStyles from './styles.module.css';
import GodOfWar from '../../images/GodOfWar.jpg';
import WoW from '../../images/WOW.jpg';

//TODO -> Finish styling and remove these static images and replace with tagged photos via 'staticQuery'

export const ImageSlider: React.FC = () => (
  <AwesomeSlider
    animation="cubeAnimation"
    bullets={false}
    cssModule={sliderStyles}
  >
    <div data-src={GodOfWar}></div>
    <div data-src={GodOfWar}></div>
    <div data-src={WoW}></div>
    <div data-src={WoW}></div>
    <div data-src={WoW}></div>
  </AwesomeSlider>
);
