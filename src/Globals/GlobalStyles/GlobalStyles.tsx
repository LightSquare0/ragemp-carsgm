import { createGlobalStyle } from "styled-components";
import MaisonNeueMedium from "../../Static/MaisonNeue-Medium.ttf";
import MaisonNeueBook from "../../Static/maison-neue-book.ttf";
import HemiHeadItalic from "../../Static/hemi-head-italic.ttf";
import HemiHeadRegular from "../../Static/hemi-head-regular.ttf";
import game from "../../Static/game.png";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'MaisonNeueMedium';
    src: url(${MaisonNeueMedium}) format('truetype');
    font-display: swap; 
  }

@font-face {
    font-family: "MaisonNeueBook";
    src: url(${MaisonNeueBook}) format('truetype');
    font-display: swap;
  }

@font-face {
    font-family: "HemiHead";
    src: url(${HemiHeadItalic}) format('truetype');
    font-display: swap;
}

@font-face {
    font-family: "HemiHeadRegular";
    src: url(${HemiHeadRegular}) format('truetype');
    font-display: swap;
}
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   }

html, body{
    height: 100%;
    min-height: 100%;
    width: 100%;
    font-family: 'MaisonNeueBook';
    //background-image: url(${game});
    overflow: hidden;
}

:root{
    /*  Gray/White variations of colors  */
    --background-gray: #242424F2; 
    --badge-gray: #2F2F2F;
    --stroke-gray: #3D3D3B;
    --stroke2-gray: #454545CC;
    --darker-gray: #414141B3;
    --darker-gray-variant: #41414159;
    --logo-gray: #5B5B5B;
    --middle-gray: #868686;
    --hud-gray: #8F8F8F;
    --whiter-gray: #9D9D9D;
    --hud-white-gray: #F3F3F3;
    --hud-gray-span: #DDDDDD;
    --text-gray: #D0D0D0;
    --text-whiter-gray: #C2C2C2;
    /*  Green colors/gradients  */
    --green-gradient: linear-gradient(248.21deg, #85CB44 -58.64%, #4C9A43 31.53%, #146455 92.34%);
    --light-green: #85CB44;
    --middle-green: #4C9A43;
    --darkish-green: #146455;
    /*  Yellow colors/gradients  */
    --yellow-gradient: linear-gradient(248.21deg, #F9E499 -58.64%, #EDC443 31.53%, #D79200 92.34%);
    --very-light-yellow: #F9E499;
    --middle-yellow: #EDC443;
    --orangeish-yellow: #D79200;
    /* Shadows & other */
    --general-shadow: 0.16rem 0.1875rem 1rem rgba(0, 0, 0, 0.3);
    --yellow-shadow:  0.16rem 0.1875rem 1rem rgba(237, 196, 67, 0.9);
    --dimmer-yellow-shadow: 0 0 0.5rem 0.125rem rgba(237, 196, 67, 0.2);
}

#app{
    height: 100%;
}

@media only screen and (max-width: 3840px) {
    :root {
        font-size: 24px;
    }
}
@media only screen and (max-width: 2560px) {
    :root {
        font-size: 20px;
    }
}

@media only screen and (max-width: 1920px) {
  :root {
        font-size: 16px;
    }
}

@media only screen and (max-width: 1680px) {
  :root {
        font-size: 14px;
    }
}

@media only screen and (max-width: 1440px) {
  :root {
      font-size: 12px;
  }
}

@media only screen and (max-width: 1280px) {
  :root {
      font-size: 10.5px;
  }
}


@media only screen and (max-width: 1024px) {
  :root {
      font-size: 8.5px;
  }
}


@media only screen and (max-width: 800px) {
  :root {
      font-size: 6.7px;
  }
}

/* width */
::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 0.625rem;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: transparent; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--stroke-gray); 
}

`;

export default GlobalStyles;
