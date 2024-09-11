import React from "react";
import MemoGreenTickProfile from "../../../../images/profileSvg/GreenTickProfile";
import { SaveButton } from "./style";

function SaveChangesBtn() {
  return (
    <SaveButton className="save__btn">
      <span>
        <MemoGreenTickProfile />
      </span>
      <span>Save Changes</span>
    </SaveButton>
  );
}

export default SaveChangesBtn;
