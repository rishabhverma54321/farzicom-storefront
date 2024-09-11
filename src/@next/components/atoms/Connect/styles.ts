import { styled } from "@styles/themes";

export const Connect = styled.article`
  width: 20.75rem;
  min-height: 12.625rem;
  padding: 1.125rem;
  background: #f7f8f9;
  box-shadow: 0 0 4px 2px #dadada;
  /* position: relative; */
  &.phone__box {
    position: absolute;
    top: 0;
    left: 2.125rem;
    transform: translate(0, -100%);
    z-index: 1;
  }
  &.chat-icon__modal {
    position: absolute;
    top: 0;
    left: 50;
    transform: translate(0, -100%);
    z-index: 1;
  }
`;
export const Edge = styled.div`
  height: 3rem;
  width: 3rem;
  background: blue;
  display: none;
  &.phone__box--edge {
    display: block;
    position: absolute;
    left: -0.25rem;
    top: 45%;
    z-index: -5;
    transform: rotate(-45deg);
  }
`;
export const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .icon:first-child svg {
    font-size: 1.25rem;
  }
  & .icon:last-child svg {
    font-size: 1rem;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & p.title {
    color: #616161;
    font: 500;
    font-size: 1.25rem;
    line-height: 1.25rem;
    text-transform: capitalize;
    margin: 0 0.625rem;
  }
`;
export const Right = styled.span``;
export const Body = styled.div`
  border: 1px solid #dadada;
  border-radius: 0.25rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  & p {
    font-size: 1.5rem;
    color: rgba(16, 16, 16, 0.82);
    font-weight: 500;
    line-height: 140%;
  }
`;

export const Footer = styled.div`
  display: flex;
  transition: transform 0.2s ease;
  &.copy {
    justify-content: space-between;
  }
  &.copied {
    justify-content: center;
  }
  align-items: center;
  padding: 1.25rem;
  background: white;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: 2px 2px 1px 1px #dadada;
  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
  & p {
    font-weight: 500;
    font-size: 0.875rem;
    color: #005bc2;
    line-height: 1rem;
  }
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
  }
`;
