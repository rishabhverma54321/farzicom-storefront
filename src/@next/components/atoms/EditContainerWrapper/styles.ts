import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const WrapperBox = styled.article`
  &.wrapper {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
    ${media.smallScreen`
    align-items: flex-start;
    `}
  }
  & .wrapper__modal {
    border-radius: 0.5rem;
    background: #f4f8f9;
    box-shadow: 0px 0px 10px rgba(33, 34, 35, 0.1);
    width: 45rem;
    position: relative;
    ${media.smallScreen`
    width: 100%;
    height: 100%;
    border-radius: 0;
    `}
  }
  & .wrapper__body {
    height: 80vh;
    overflow-y: auto;
    padding: 1.375rem;
    ${media.smallScreen`
    padding: 0.65rem;
    height: 90%;
    `}
  }
  & .wrapper__body::-webkit-scrollbar {
    width: 0.5rem;
    ${media.smallScreen`
    width: 0.25rem;
    `}
  }
  & .wrapper__body::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 2.5rem;
  }
`;

export const HeadingBox = styled.div`
  height: 4.3125rem;
  background: #ffffff;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  & .wrapper__heading {
    line-height: 1.5rem;
    font-size: 1.375rem;
    color: #282d32;
    text-transform: capitalize;
    font-weight: 500;
    margin: 0 1.25rem;
  }
  & .wrapper__leftArrow {
    font-size: 1.125rem;
    cursor: pointer;
  }
`;
