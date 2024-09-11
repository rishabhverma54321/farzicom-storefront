import { styled } from "@styles/themes";
import { media } from "@styles/media";

import Background from "../../organisms/YarnLogin/yarn-login-back.svg";

export const CategorySection = styled.section`
  position: absolute;
  z-index: 101;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: white;
`;
export const CategoryContainer = styled.main`
  background-image: url(${Background});
  background-size: cover;
  padding-bottom: 1vh;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;
export const Body = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  background: white;
  min-height: 41.938rem;
  width: 26.063rem;
  background: #ffffff;
  border-radius: 0.5rem;
  transform: translateX(-50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  ${media.smallScreen`
  width: 95%;
  margin: 0 auto;
  padding: 0.75rem;
  `};
`;
export const H1 = styled.h1`
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1.625rem;
  color: #101010;
  align-self: flex-start;
`;
export const P = styled.p`
  font-weight: 500;
  font-size: 1rem;
  line-height: 140%;
  letter-spacing: -0.0041;
  color: #616161;
  margin: 1.875rem 0;
  align-self: flex-start;
`;

export const Search = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  align-self: flex-start;
  width: 100%;
  & span.search-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 0.5rem;
    & svg {
      font-size: 0.8rem;
      & path {
        fill: #616161;
      }
    }
  }
`;
export const Input = styled.input`
  width: 100%;
  height: 2.25rem;
  border: 1px solid #dadada;
  border-radius: 0.5rem;
  padding: 0.125rem 0.5rem 0.125rem 1.75rem;
  font-size: 0.875rem;
  color: #616161;
  ::placeholder {
    color: #616161;
    font-family: inherit;
    font-weight: 500;
    font-size: 0.875rem;
  }
`;
export const Content = styled.div`
  border: 1px solid #dadada;
  border-radius: 0.5rem;
  width: 100%;
  height: 25rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;
export const CategoryList = styled.div`
  width: 50%;
`;
export const Category = styled.article`
  background: #f4f8f9;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: #616161;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: all 0.1s linear;
  &.category-selected {
    background: #ffffff;
  }
  & p.category-name {
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-transform: capitalize;
  }
  &:first-child {
    border-radius: 0.5rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0.5rem;
  }
`;
export const ActiveBorder = styled.span`
  position: absolute;
  transition: all 0.1s linear;
  &.not-active {
    visibility: hidden;
  }
  &.active {
    visibility: visible;
    width: 0.225rem;
    background: #616161;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  height: 80%;
`;

export const RespectiveCategoryItem = styled.div`
  width: 50%;
`;

export const CategoryListItem = styled.article`
  background: white;
  padding: 0.44rem 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  & label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #616161;
    text-transform: capitalize;
    flex: 0.9;
  }
  & input[type="checkbox"] {
    /* background: orange;
    z-index: 2; */
    outline: none;
    border: 1px solid #616161;
    height: calc(1rem-1px);
    width: calc(1rem-1px);
    opacity: 1;
    background: #616161;
    flex: 0.1;
  }
`;

export const FinishBtn = styled.button`
  margin-top: 1.25rem;
  text-align: center;
  width: calc(100% - 0.875rem);
  background: #33a532;
  border-radius: 0.3rem;
  height: 2.938rem;
  font-size: 1.125rem;
  letter-spacing: 0ch.005em;
  font-weight: 500;
  font-family: Manrope;
  color: #ffffff;
  & span {
    margin: 0 0.3rem;
  }
  & svg.right-click path {
    fill: #ffffff;
    font-size: 1.5rem;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    font-size: 1.11rem;
  }
`;
export const SelectAll = styled.button`
  margin: 0 auto;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  font-family: Manrope;
  align-items: center;
  background: #ffffff;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 0.875rem;
  color: #33a532;
  :hover {
    background: #f4f8f9;
  }
`;
