import { styled } from "@styles/themes";
import { secondaryMenuStyles } from "@temp/components/MobileNavIkkai/NavItem.styled";

const Wrapper = styled.ul`
  @media (max-width: 991px) {
    padding-left: 0.5rem;
    ${secondaryMenuStyles}
  }
`;

export { Wrapper };
