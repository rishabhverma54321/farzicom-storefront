import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div<{
  color:
    | "white"
    | "pink"
    | "green"
    | "grey"
    | "primary"
    | "secondary"
    | "tertiary";
}>`
  width: 100%;
  background-color: ${props => props.theme.homeshowcase.colors[props.color]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 60px;
  /* margin-bottom: 100px; */
  position: relative;
  ${media.mediumScreen`
  padding: 1px 10px;
  margin-bottom: 20px;

  `};
`;

export const ProductsContainer = styled.div<{}>`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(4,1fr);
  column-gap: 15px;
  row-gap: 15px;
  width: 100%;
  justify-content: center;
  ${media.largeScreen`

  `}

  ${media.mediumScreen`
  grid-template-columns: repeat(2,1fr);
  column-gap:10px

  `}

  ${media.smallScreen`

  `}
`;

export const ButtonRow = styled.div<{}>`
  display: none;

  ${media.mediumScreen`
  width: 100%;
  display: flex;
  justify-content: center;
  /* height: ; */
  padding: 10px;
  margin-top: 32px;

  `};
`;

export const ProductCard = styled.div`
  /* width: 25%; */
  width: 100%;
  margin-bottom: 50px;

  ${media.largeScreen`
  /* width: 50% */
`}
`;

export const FlowerImageRight = styled.img`
  position: absolute;
  right: 16px;
  top: 0;
  width: 60px;

  ${media.mediumScreen`
    right: 0;
    top: -40px;
  `}
`;
