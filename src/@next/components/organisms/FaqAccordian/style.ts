import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Accordian = styled.div`
  @media (max-width: 720px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .active {
    button {
      p {
        color: ${props => props.theme.colors.reviewTitle};
      }
    }
  }
`;

export const Heading = styled.h4`
  font-size: 1.5rem;
  line-height: 140%;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 1rem 0;
  line-height: 140%;
  font-weight: 500;
  ${media.smallScreen`
  font-size: 1rem;

  `}
`;

export const Icon = styled.div`
  padding: 8px;
  img {
    width: 32px;
    height: 32px;
  }
`;
export const ExpandIcon = styled.div`
  margin-right: 16px;
`;

export const Item = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ececec;
  display: flex;
  flex-direction: column;

  div {
    display: inline-block;
    svg {
      vertical-align: middle;
    }
  }
`;

export const Description = styled.p`
  width: 70%;
  line-height: 160%;
  color: #000000;
  padding-bottom: 2rem;

  // opacity: 0.6;

  margin-left: 50px;
  animation: render 1s;
  ${media.smallScreen`
  font-size: 14px;
  width: 100%

  `}

  @keyframes render {
    from {
      /* transform: translateY(-100%); */
      opacity: 0;
    }
    to {
      /* transform: translateY(0); */
      opacity: 0.6;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
`;
