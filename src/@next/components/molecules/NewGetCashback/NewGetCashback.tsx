import Checkbox from "@mui/material";
import FormControlLabel from "@mui/material";
import { styled } from "@styles/themes";
import React from "react";

export interface INewGetCashbackProps {
  useCashback: boolean;
  // setUseCashback: React.Dispatch<React.SetStateAction<boolean>>;
  handleCashbackClick: () => Promise<void>;
  userWallterBalance: number;
  borderBottom?: string;
  marginBottom?: string;
}
const Wrapper = styled.div<{ borderBottom: string; marginBottom: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.borderBottom};
  margin-bottom: ${props => props.marginBottom};
`;
const Price = styled.span``;
export const NewGetCashback: React.FC<INewGetCashbackProps> = ({
  useCashback,
  // setUseCashback,
  handleCashbackClick,
  userWallterBalance,
  borderBottom = "",
  marginBottom = "",
}) => {
  return (
    <Wrapper borderBottom={borderBottom} marginBottom={marginBottom}>
      <FormControlLabel
        value={useCashback}
        control={
          <Checkbox
            checked={useCashback}
            onChange={handleCashbackClick}
            name="getWhatsappUpdates"
            style={{ color: " #56774D" }}
          />
        }
        label={`Wallet Balance `}
      />
      <Price>₹{userWallterBalance}</Price>
    </Wrapper>
  );
};
NewGetCashback.displayName = "NewGetCashback";
export default NewGetCashback;
