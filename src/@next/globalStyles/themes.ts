import baseStyled, { ThemedStyledInterface } from "styled-components";

import * as C from "./constants";

export const defaultTheme = {
  breakpoints: {
    largeScreen: "992px",
    mediumScreen: "720px",
    smallScreen: "540px",
    xLargeScreen: "1280px",
    xxLargeScreen: "1600px",
    xxxLargeScreen: "1920px",
  },
  button: {
    animation: {
      transition: "0.3s",
    },
    colors: {
      primary: {
        activeBackground: C.theme.primaryDark,
        background: C.theme.primary,
        color: C.white,
        hoverBackground: C.theme.primaryLight,
        hoverColor: C.white,
        border: "none",
      },
      secondary: {
        activeBackground: C.theme.secondaryDark,
        background: C.theme.secondary,
        color: C.theme.white,
        hoverBackground: C.theme.white,
        hoverColor: C.theme.secondary,
        border: C.theme.secondary,
      },
      tertiary: {
        activeBackground: C.theme.primaryLight,
        background: C.theme.primaryLight,
        color: C.theme.white,
        hoverBackground: C.theme.white,
        hoverColor: C.theme.primaryDark,
      },
      goToCart: C.theme.goToCart,
      goToCartHover: C.theme.goToCartHover,
      checkoutButtonColor: C.theme.checkoutButtonColor,
      checkoutButtonHoverColor: C.theme.checkoutButtonHoverColor,
      applyCoupon: "#000000",
      savingButton: "#000000",
      searchResultOdd: "#e2f0d1",
      searchResultEven: "#f1fae6",
    },
    padding: {
      main: "0.9rem 3.7rem",
      small: "0.9rem 1rem",
    },
    typography: {
      fontSize: "1.125rem",
      fontWeight: "400",
      lineHeight: "1.25rem",
      smallFontSize: "1rem",
      textTransform: "uppercase",
    },
  },

  homeshowcase: {
    colors: {
      white: C.white,
      green: C.theme.homeshowcaseGreen,
      pink: C.theme.homeshowcasePink,
      grey: C.theme.homeshowcaseGrey,
      primary: C.theme.primary,
      secondary: C.theme.secondary,
      tertiary: C.theme.tertiary,
    },
  },

  carousel: {
    carouselControlPadding: "0.2rem 0.5rem",
    carouselControlShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
  },
  chip: {
    colors: {
      primary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.primaryLight,
        color: C.theme.primaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.primaryDark,
      },
      secondary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.secondaryLight,
        color: C.theme.secondaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.secondaryDark,
      },
    },
    typography: {
      fontSize: "1rem",
      smallFontSize: "0.75rem",
    },
  },
  colors: {
    ...C.theme,
    greenTextColor: C.greenText,
    checkoutButtonColor: C.theme.checkoutButtonColor,
    checkoutButtonHoverColor: C.checkoutButtonHoverColor,
    searchResultOdd: "#fff4f1",
    searchResultEven: "#faeee6",
    checkboxRadioColor: C.theme.primary,
  },
  container: {
    width: 1140,
  },
  demoBanner: {
    height: "60px",
  },
  dropdown: {
    backgroundColor: C.theme.white,
    boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  grid: {
    containerWidth: 1140,
  },
  homeHeaderText: {
    backgroundColor: C.theme.homeHeaderText,
  },
  iconButton: {
    backgroundColor: C.theme.white,
    hoverBackgroundColor: C.theme.primaryDark,
    hoverForegroundColor: C.theme.white,
    size: 36,
  },
  input: {
    border: C.grayDark,
    labelColor: C.cutRed,
    /**
     * 12px in default theme
     */
    labelFontSize: "0.75rem",
    selectMenuShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  link: {
    base: {
      color: C.gray,
      hoverColor: C.grayMedium,
    },
    secondary: {
      color: C.blue,
      hoverColor: C.blueLight,
    },
  },
  loader: {
    color: C.theme.loader,
  },
  message: {
    backgroundColor: C.white,
    contentMargin: `${C.spacer}rem 0 0`,
    letterSpacing: "0.5px",
    padding: "1rem 1.5rem",
    titleMargin: `0 ${C.spacer * 1.5}rem 0 0`,
    titleTransform: "uppercase",
    titleWeight: C.extraBoldFontWeight,
    width: "25rem",
  },
  modal: {
    modalMinHeight: 455,
    modalWidth: 555,
    colors: {
      headerBackground: C.theme.primary,
      headerTextColor: C.theme.white,
    },
  },
  productItem: {
    productItemCategoryColor: C.gray,
    productItemPriceFontWeight: C.boldFontWeight,
    productItemPriceMargin: `${C.spacer}rem 0 0`,
    productItemTitleFontWeight: C.boldFontWeight,
    productItemTitleHeight: "2.5rem",
    productItemTitleMargin: `${C.spacer / 2}rem 0 0`,
    productItemTitleTextTransform: "uppercase",
  },
  spacing: {
    /**
     * 30px in default theme
     */
    fieldSpacer: C.fieldSpacer,
    /**
     * 30px in default theme
     */
    gutter: "1.875rem",
    /**
     * 16px in default theme
     */
    spacer: `${C.spacer}rem`,
  },
  tile: {
    backgroundColor: C.grayLight,
    divisionLine: C.grayMedium,
    hoverBorder: C.blueDark,
  },
  typography: {
    collectionHeading: {
      colors: {
        text: C.theme.primary,
      },
    },
    colors: {
      darkGreen: C.greenDark,
      lightGreen: C.greenLight,
      grey: C.textColor,
      darkGrey: C.textColorDark,
      black: C.black,
      red: C.cutRed,
      white: C.white,
    },
    baseFontFamily: C.baseFontFamily,
    barkentinaFontFamily: C.barkentinaFontFamily,
    humanistRomanLightFontFamily: C.humanistRomanLightFontFamily,
    humanistRomanFontFamily: C.humanistRomanFontFamily,
    humanistRomanBoldFontFamily: C.humanistRomanBoldFontFamily,

    headingFontFamily: C.headingFontFamily,
    subheadingFontFamily: C.subheadingFontFamily,
    titleFontFamily: C.titleFontFamily,
    archivoBlackFont: C.archivoBlackFont,

    /**
     * 16px in default theme
     */

    baseFontSize: C.baseFontSize,
    /**
     * 20px in default theme
     */
    baseLineHeight: C.baseLineHeight,
    boldFontWeight: C.boldFontWeight,
    extraBoldFontWeight: C.extraBoldFontWeight,
    lighFontWeight: C.lighFontWeight,
    /**
     * 64px in default theme
     */
    h1FontSize: C.h1FontSize,
    h1LineHeight: C.h1LineHeight,
    /**
     * 48px in default theme
     */
    h2FontSize: C.h2FontSize,
    /**
     * 24px in default theme
     */
    h3FontSize: C.h3FontSize,
    /**
     * 18px in default theme
     */
    h4FontSize: C.h4FontSize,
    /**
     * 14px in default theme
     */
    smallFontSize: C.smallFontSize,
    /**
     * 96px in default theme
     */
    ultraBigFontSize: C.ultraBigFont,
    textCut: C.cutRed,
  },

  card: {
    primaryShadow: "0px 0.5px 2.5px 2px rgba(40, 44, 63, 0.1)",
  },

  flex: {
    justifyContent: {
      center: "center",
      normal: "normal",
      spaceAround: "space-around",
      spaceEvenly: "space-evenly",
      spaceBetween: "space-between",
    },
  },
  rating: {
    typography: {
      smallFontSize: "16px",
      mediumFontSize: "18px",
      largeFontSize: "20px",
    },
  },
};

export type DefaultTheme = typeof defaultTheme;
export const styled = baseStyled as any;
