import { styled } from "@styles/themes";

export const Header = styled.header`
  text-align: center;
`;

export const Heading = styled.h1<{}>`
  font-family: ${props => props.theme.typography.titleFontFamily};
  color: ${props => props.theme.typography.collectionHeading.colors.text};

  font-size: 3.25rem;
  font-weight: 600;
  line-height: 1em;
  text-transform: uppercase;
`;
