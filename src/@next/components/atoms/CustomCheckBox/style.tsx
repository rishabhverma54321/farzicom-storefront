import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  input[type="checkbox"] {
    outline: none;
    border: 1px solid #616161;
    height: 1.1em;
    width: 1.1em;
    opacity: 1;
  }

  label {
    font-size: 0.85em;
    font-weight: 500;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.1em;
  }
`;
