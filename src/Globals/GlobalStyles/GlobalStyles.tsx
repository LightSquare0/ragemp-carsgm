import { createGlobalStyle } from "styled-components";
import MaisonNeueMedium from "../../Static/MaisonNeue-Medium.ttf";
import MaisonNeueBook from "../../Static/maison-neue-book.ttf";
import game from "../../Static/game.png";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'MaisonNeueMedium';
    src: url(${MaisonNeueMedium}) format('truetype');
}

@font-face {
    font-family: "MaisonNeueBook";
    src: url(${MaisonNeueBook}) format('truetype');
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
`;

export default GlobalStyles;
