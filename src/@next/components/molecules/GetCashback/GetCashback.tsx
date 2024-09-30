import { Card } from "@components/organisms/AddressForm/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";

import React from "react";

export interface IGetCashbackProps {
  useCashback: boolean;
  // setUseCashback: React.Dispatch<React.SetStateAction<boolean>>;
  handleCashbackClick: () => Promise<void>;
  userWallterBalance: number;
}

export const GetCashback: React.FC<IGetCashbackProps> = ({
  useCashback,
  // setUseCashback,
  handleCashbackClick,
  userWallterBalance,
}) => {
  return (
    <>
      <Card>
        <FormControlLabel
          value={useCashback}
          control={
            <Checkbox
              checked={useCashback}
              onChange={handleCashbackClick}
              name="getWhatsappUpdates"
              style={{ color: "#314C0C" }}
            />
          }
          label={`Use Store Credit - ₹${userWallterBalance}`}
        />
      </Card>
    </>
  );
};
GetCashback.displayName = "GetCashback";
export default GetCashback;
