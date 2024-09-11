import { media } from "@styles/media";
import { styled } from "@styles/themes";

type TileProps = {
  columns: number;
};

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0;
  margin-top: ${props => `-${props.theme.spacing.gutter}`};
  margin-left: ${props => `-${props.theme.spacing.gutter}`};
  ${media.smallScreen`
     padding: 0px 20px;
  `}
`;

export const Tile = styled.div<TileProps>`
  margin: 0;
  padding: 0;
  padding-top: ${props => props.theme.spacing.gutter};
  padding-left: ${props => props.theme.spacing.gutter};
  width: calc(100% / ${props => props.columns});
  margin: 0 auto;
  ${media.smallScreen`
    width: 100%;
  `}
`;
