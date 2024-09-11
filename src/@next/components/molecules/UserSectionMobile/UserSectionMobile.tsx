import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  // StyledAddOutlined,
  // StyledRemoveIcon,
} from "@temp/components/MobileNav/NavItem";
import React, { useState } from "react";
// import AccordionSummary from '@mui/material/AccordionSummary';
// import { AddOutlined } from "@material-ui/icons";
// import RemoveIcon from "@material-ui/icons/Remove";
import Plus from "images/plus.svg";
import Minus from "images/minus.svg";
import { UserMenuList } from "@components/atoms/UserMenuList";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import ReactSVG from "react-svg";

export interface IUserSectionMobileProps {
  user: User;
  handleSignOut: () => void;
}

export const UserSectionMobile: React.FC<IUserSectionMobileProps> = ({
  user,
  handleSignOut,
}) => {
  const [expanded, setexpanded] = useState(true);
  return (
    <>
      <StyledAccordion onChange={() => setexpanded(prev => !prev)}>
        <StyledAccordionSummary
          expandIcon={
            expanded ? <ReactSVG path={Plus} /> : <ReactSVG path={Minus} />
          }
        >
          <div>My Account</div>
        </StyledAccordionSummary>

        <StyledAccordionDetails>
          <UserMenuList
            showWalletBalance
            user={user}
            handleSignOut={handleSignOut}
            hideMenu={() => setexpanded(false)}
          />
        </StyledAccordionDetails>
      </StyledAccordion>
    </>
  );
};
UserSectionMobile.displayName = "UserSectionMobile";
export default UserSectionMobile;
