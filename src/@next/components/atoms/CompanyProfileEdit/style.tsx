import { styled } from "@styles/themes";

export const Container = styled.div`
  width: 100%;
  border-radius: 0.5rem;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0.8rem 0.8rem 0.8rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
`;

export const TopContainerLeft = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TopContainerRight = styled.div`
  padding: 0.3rem 0.5rem;
  background-color: #f4f8f9;
  max-width: 61%;
`;

export const LowerContainer = styled.div`
  margin-top: 1rem;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  overflow-y: scroll;
  border-radius: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
