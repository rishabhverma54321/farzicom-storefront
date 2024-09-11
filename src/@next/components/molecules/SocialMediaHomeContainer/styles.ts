import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  ${media.smallScreen`
    margin-bottom: 0;
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin-bottom: 30px;
  padding: 15px 60px;
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

export const Body = styled.div`
  display: flex;
  justify-content: center;
`;

export const Img = styled.img`
  width: 40%;
  max-width: 150px;
  cursor: pointer;
`;
