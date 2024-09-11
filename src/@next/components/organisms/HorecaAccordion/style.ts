import { styled } from "@styles/themes";

export const Accordian = styled.div`
  border-top: 1px solid #d1d1d1;
  @media (max-width: 720px) {
    padding-left: 10px;
    padding-right: 10px;
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
  padding: 3px 0;
  border-bottom: 1px solid #d1d1d1;
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
  box-shadow: 0.5px 0.5px 3px #000;
  border-radius: 10px;
  padding: 2%;
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

export const List = styled.ul`
  display: grid !important;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2% 8%;

  @media (max-width: 540px) {
    font-size: 0.8em;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    padding: 4% 8%;
  }
  text-align: center;
  box-shadow: 0.5px 0.5px 3px #000;
  border-radius: 10px;
  list-style: disc;
`;

export const ListItem = styled.li`
  margin: 1%;
  text-align: left;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
`;
