import { styled } from "@styles/themes";

export const Heading = styled.div<{}>`
  color: #43693c;
  /* line-height: 2rem; */
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  padding: 30px 0;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 24px;
  font-family: ${props => props.theme.typography.humanistRomanFontFamily},
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  ::before {
    content: " ";
    height: 2px;
    width: 138px;
    position: absolute;
    bottom: 0;
    background-color: #43693c;
  }
  ::after {
    content: " ";
    background: url(../../../../src/images/lotus.png) no-repeat;
    position: absolute;
    height: 28px;
    width: 28px;
    bottom: -19px;
  }
`;
