// import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";
import styled from "styled-components";

export const container = styled.div<{}>`
  display: flex;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  ${media.smallScreen`
    gap: 10px;
  `}
`;

export const StyledButton = styled(Button)<{ isActive: boolean }>`
  padding: 1rem;
  width: 170px;
  background: #c87a70;
  max-width: 250px;
  border: 1px solid #c87a70;
  color: ${props => (props.isActive ? "white" : "#C87A70")};
  background: ${props => (props.isActive ? "#C87A70" : "white")};

  ${media.largeScreen`
    padding: 1rem;
    span {
      /* font-size: 0.8rem; */
    }
  `}

  ${media.mediumScreen`
    width: 70%;
    padding: 0.8rem 1rem;
  `}

  &:hover {
    color: ${props => (props.isActive ? "white" : "#C87A70")};
    background: ${props => (props.isActive ? "#C87A70" : "white")};
    border: 1px solid #c87a70;
  }
`;
