import React from 'react';
import BackgroundCircles from './BackgroundCircles';
import SkyBackground from './SkyBackground';
import FestiveFlags from './FestiveFlags';
import StrawHat from './StrawHat';
import ToucanCharacter from './ToucanCharacter';
import LogoText from './LogoText';

const DefaultToucanLogo = ({ size = 96 }) => (
  <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="mx-auto select-none">
    <BackgroundCircles />
    <SkyBackground />
    <FestiveFlags />
    <StrawHat />
    <ToucanCharacter />
    <LogoText />
  </svg>
);

export default DefaultToucanLogo;
