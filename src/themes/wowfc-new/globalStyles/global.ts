import { createGlobalStyle } from "styled-components";
import { DefaultTheme, media } from ".";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
@font-face {
  font-display: swap;
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url("../../fonts/MyriadPro-Regular.woff");
  font-family: "MyriadPro";
  
}

@font-face {
   font-display: swap;
  font-family: "HumanistRoman";
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url("../../fonts/Humanist521BT-Roman.ttf");
}

@font-face {
   font-display: swap;
  font-family: "HumanistLight";
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url("../../fonts/Humanist521BT-Light.ttf");
  font-weight: lighter;
}

@font-face {
   font-display: swap;
  font-family: "HumanistBold";
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url("../../fonts/Humanist521BT-Bold.ttf");
  font-weight: bold;
}

@font-face {
   font-display: swap;
  font-family: "Barkentina";
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url("../../fonts/Barkentina.woff");
}


  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    min-width: 320px;
    font-family: ${props => props.theme.typography.baseFontFamily};
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    color: ${props => props.theme.colors.baseFont};
  }

  input, textarea, button {
    font-family: inherit;
  }

  h1 {
    font-size: ${props => props.theme.typography.h1FontSize};
    line-height: ${props => props.theme.typography.h1LineHeight};

    ${props => media.smallScreen`
      font-size: ${props.theme.typography.h2FontSize};
    `}
  }

  h3 {
    font-size: ${props => props.theme.typography.h3FontSize};
    line-height: 1.7rem;
  }

  h4 {
    font-size: ${props => props.theme.typography.h4FontSize};
  }

  a {
    text-decoration: none;
    font-weight: normal;
    color: inherit;
  }

  p {
    line-height: 1.5rem;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    & > div:first-of-type {
      flex: 1;
    }
  }
`;
