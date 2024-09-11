import React from "react";
import Shop from "@components/atoms/SvgIcons/Shop";
import ByConcern from "@components/atoms/SvgIcons/ByConcern";
import FunCombos from "@components/atoms/SvgIcons/FunCombos";
import SaleBox from "@components/atoms/SvgIcons/SaleBox";

import { styled } from "@styles/themes";

const Wrapper = styled.div`
  width: 1.5rem;
  font-size: 1rem;
  line-height: 1em;
  margin-right: 0.75rem;
`;

export interface INavItemIconProps {
  name: string;
}

const NavItemIcon: React.FC<INavItemIconProps> = ({ name }) => {
  // if (name.toLowerCase() === "shop") {
  //   return (
  //     <Wrapper>
  //       <Shop />
  //     </Wrapper>
  //   );
  // }
  if (name.toLowerCase() === "by concern") {
    return (
      <Wrapper>
        <ByConcern />
      </Wrapper>
    );
  }
  if (name.toLowerCase() === "fun combos") {
    return (
      <Wrapper>
        <FunCombos />
      </Wrapper>
    );
  }
  if (name.toLowerCase() === "bogo") {
    return (
      <Wrapper>
        <SaleBox />
      </Wrapper>
    );
  }
  return <></>;
};

export default NavItemIcon;
