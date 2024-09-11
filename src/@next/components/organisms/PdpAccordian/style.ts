import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  margin: 70px 0px;
`;

export const DescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;

  ${media.mediumScreen`
    gap: 20px;
  `}

  ${media.smallScreen`
        flex-direction: column;
        gap: 30px;
    `}
`;

export const DescriptionHeading = styled.h4`
  margin: 10px 0px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primaryDark};
`;

export const IngredientBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;

  ${media.mediumScreen`
    gap: 20px;
  `}
  ${media.smallScreen`
        flex-direction: column;
        gap: 30px;
    `}
`;

export const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 30%;

  ${media.xLargeScreen`
  width: 46%;

  `}

  ${media.smallScreen`
    width: 100%;
  `}
`;
export const IngredientImg = styled.div`
  /* width: 30%; */
  img {
    object-fit: cover;
  width: 100%;
  height: 180px;
  max-width: 388px;

  ${media.largeScreen`
  height: 210px;
  
  `}
  }
  /* ${media.largeScreen`
        width: 20%;
    `}
  ${media.mediumScreen`
        width: 100%;
        margin: auto;
    `} */
`;

export const IngredientText = styled.div`
  width: 100%;
  p {
    line-height: 1rem;
    font-size: 1rem;

    ${media.mediumScreen`
    font-size: 0.8rem;
    `}
  }
  h4 {
    padding: 10px 0;
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const StyledAccordian = styled.div`
  font-size: 1rem;
`;

export const StyledAccordianSummary = styled.div`
  padding: 0;
`;

export const StyledAccordianDetails = styled.div`
  display: "flex";
  justify-content: "space-around";
  flex-wrap: "wrap";
`;
