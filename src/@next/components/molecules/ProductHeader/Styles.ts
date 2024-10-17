import { media } from "@styles/media";
import { styled, defaultTheme } from "@styles/themes";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;

  ${media.mediumScreen`
  flex-direction: column;
  `}
`;

export const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Row1Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Heading = styled.h3`
  color: ${props => props.theme.colors.heading};
  font-family: ${props => props.theme.typography.headingFontFamily};
`;

export const Headingh2 = styled.h2`
  color: ${props => props.theme.colors.heading};
  font-family: ${props => props.theme.typography.headingFontFamily};
`;

Heading.defaultProps = {
  theme: defaultTheme,
};
export const Title = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  height: 15px;
  margin: 10px 0;
  align-self: flex-start;
  color: black;
  ${media.mediumScreen`
  align-self:center;
  `}
`;

export const ViewAll = styled.div`
  ${media.mediumScreen`
  display: none;
  `}
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;

  & .active {
    background-color: #56774d;
    color: white;
  }
  ${media.mediumScreen`
    width: 100%;
    justify-content:center;
  `}
`;

export const Filter = styled.span`
  white-space: nowrap;
  padding: 0 8px;
  margin: 0.3rem;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  border-radius: 14px;
  color: #56774d;
  background-color: white;
  cursor: pointer;
  padding-top: 1px;
`;

export const Label = styled.span``;
