import { styled } from "@styles/themes";

export const Container = styled.div`
  span {
    color: black;
    background: rgba(138, 153, 168, 0.25);
    border-radius: 4px;
    padding: 0.4em;
    font-size: 0.6em;
    /* font-size: 11px; */
    margin: 0 0.3em;
    /* margin-left: 0.5rem; */
  }
`;

export const TypeHeading = styled.div`
  color: #9f9f9f;
  margin-bottom: 2em;
`;

export const MoreTypesContainer = styled.div`
  display: inline-block;
  font-size: 0.5em;
  color: black;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
