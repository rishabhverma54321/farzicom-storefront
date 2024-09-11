import { media, styled } from "@styles";

export const Container = styled.div<{}>`
  width: 100%;
  background-color: #e0ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem 5rem 2rem;
  position: relative;
  box-sizing: border-box;

  ${media.mediumScreen`
  padding: 10px 20px;
  `}
  ${media.smallScreen`
  padding: 0px;
  padding-top: 20px;
  `}
`;

export const CategoryContainer = styled.div<{}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
`;

export const Div = styled.div<{}>`
  width: 30%;
  margin: 10px;

  ${media.largeScreen`
      width: 46%;
  `}
  ${media.smallScreen`
      width: 90%;  
  `}
`;

export const CategoryImg = styled.img`
  /* width: 100%; */
  object-fit: cover;
  width: 100%;
  height: calc(16vh + 50px);

  ${media.xxLargeScreen`
  height: calc(12vh + 70px);
  `}

  ${media.xLargeScreen`
  height: calc(6vh + 70px);
  `}

  ${media.largeScreen`
  height: calc(10vh + 40px);
  `}

  ${media.mediumScreen`
  height: calc(6vh + 50px);
  `}

  ${media.smallScreen`
  height: calc(14vh + 50px);
  `}
`;
