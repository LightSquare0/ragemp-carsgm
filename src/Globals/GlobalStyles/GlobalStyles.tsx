import { createGlobalStyle } from "styled-components";
import MaisonNeueMedium from "../../Static/MaisonNeue-Medium.ttf";
import game from "../../Static/game.png";


const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'MaisonNeueMedium';
    src: url(${MaisonNeueMedium}) format('truetype');
}

:root{
    font-size: 16px;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    height: 100%;
    width: 100%;
    font-family: 'MaisonNeueMedium';
    //background-image: url(${game});
    overflow: hidden;
}
`;

export default GlobalStyles;
