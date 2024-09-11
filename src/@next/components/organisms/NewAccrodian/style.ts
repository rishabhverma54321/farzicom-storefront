import { styled } from "@styles/themes";

export const Accordian = styled.div`
  border-top: 1px solid #ececec;
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

export const Heading = styled.p`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
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
  color: #686b78;
  margin-left: 50px;
  animation: render 1s;
  @keyframes render {
    from {
      /* transform: translateY(-100%); */
      opacity: 0;
    }
    to {
      /* transform: translateY(0); */
      opacity: 1;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
`;
