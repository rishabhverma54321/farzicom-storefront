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
  height: 400px;
  background-color: ${props => props.theme.homeshowcase.colors[props.color]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
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
column-gap:0px;
row-gap:5px;
height:80%;
  `}
`;

export const ButtonRow = styled.div<{}>`
  width: 100%;
  display: flex;
  justify-content: center;
  /* height: ; */
  padding: 10px;
  margin-top: 24px;
`;

export const ProductCard = styled.div`
  /* width: 25%; */
  width: 90%;
  // left:0;
  top: 0;

  margin-bottom: 50px;

  ${media.largeScreen`
  /* width: 50% */
`}
  ${media.smallScreen`
/* width: 50% */
margin-bottom:5px;
`}
`;

export const FlowerImageRight = styled.img`
  // position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  filter: brightness(0.5);

  ${media.mediumScreen`
    right: 0;
    top:0;
    width:100%;
  `}
`;
