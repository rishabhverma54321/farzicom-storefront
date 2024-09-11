import { styled } from "@styles/themes";
import { media } from "@styles/media";
// import {
//   largeScreen,
//   mediumScreen,
//   smallScreen,
//   xLargeScreen,
//   xxLargeScreen,
//   xxxLargeScreen,
// } from "./constants";

export const Container = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  width: 100%;
  display: flex;
  padding: 1.1em 1.2em;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding-left: 3.5rem;
  ${media.smallScreen`
    flex-direction: column;
    padding:0;    
    border-radius: 0.5rem;
    overflow: auto;
    padding-left: auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `};
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  align-items: center;
  justify-content: start;
  ${media.smallScreen`
   width: 100%;
   background-color:white;    
    padding: 0.625rem 1.406rem;
    
  `};
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  /* max-width: 40%; */
  ${media.smallScreen`
   width: 100%;
   padding: 0 0.875rem;
    
  `};
`;

export const RightContainerTop = styled.div``;

export const RightContainerBottom = styled.div``;
