import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const SalesHeading = styled.h3<{ backgroundcolor?: string }>`
  background-color: ${props => props.backgroundcolor || "rgb(105, 234, 114)"};
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 45px;
  text-transform: uppercase;
  line-height: 1.5;
  color: #333;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 30px 0;
  clear: both;
  font-weight: 700;
  padding-top: 4px;
  text-transform: capitalize;

  ${media.mediumScreen`
  font-size: 28px;
    
  `}
`;
