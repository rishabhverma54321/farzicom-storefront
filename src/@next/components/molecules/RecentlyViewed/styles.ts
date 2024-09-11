import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const ProductCard = styled.div`
  width: 25%;

  ${media.largeScreen`
  width: 50%;
`}
`;

export const Container = styled.div`
  margin: 15px 60px;
  margin-bottom: 100px;

  &li {
    height: inherit !important;
    color: red !important ;
  }
`;
