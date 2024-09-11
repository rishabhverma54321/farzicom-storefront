import { styled } from "@styles/themes";

export const ButtonList = styled.article`
  & button {
    text-transform: capitalize;
    width: 50%;
    padding: 0.2rem;
    font-size: 0.95rem;
    border-radius: 8px;
  }

  &.nav-toggle {
    background-color: #f4f8f9;
    margin: 0rem 0.2rem;
    border-radius: 8px;
    padding: 0.4rem;
  }

  & button.default {
    background-color: transparent;
    color: black;
  }

  & button.first-btn {
    background-color: #a33a34;
    color: white;
  }

  & button.second-btn {
    background-color: #f99f23;
    color: white;
  }
`;
