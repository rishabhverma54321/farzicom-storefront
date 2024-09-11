import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  padding-top: 1.2em;
  padding-top: 1.2em;
  display: flex;
  flex-direction: column;
  width: 49%;
  margin: 0.5%;
  ${media.largeScreen`
  width: 100%;
  `};
  ${media.smallScreen`
    border-radius:8px;
    padding:0px;
    background-color: white;
  `};
`;

export const HeaderContainerProfile = styled.div`
  text-align: center;
  color: #005bc2;
  font-weight: 500;
  font-size: 1.2em;
  padding: 1.063rem 0.688rem;
`;
