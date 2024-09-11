import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const List = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  ${media.largeScreen`
  `}

  ${media.smallScreen`
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;

export const RecipeCard = styled.div`
  width: 25%;
  margin-bottom: 50px;
  padding:0 5px;


  ${media.largeScreen`
  width: 50%;
`}

  /* ${media.smallScreen`
    width: 100%;
  `} */
`;
