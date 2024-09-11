import { Card } from "@components/organisms/AddressForm/styles";
import React, { useEffect, useState } from "react";
import { defaultTheme } from "Themes/globalStyles";

// import { Checkbox, FormControlLabel } from "@material-ui/core";

// import { useLocalStorage } from "@hooks/useLocalStorage";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import { MutationFn } from "react-apollo";
// import { TypedUpdateCheckoutMetadataWhatsapp } from "./queries";
import { FormControlLabel } from "@mui/material";
// import { Checkbox } from "@components/atoms/Checkbox";
import Checkbox from "@mui/material";

import {
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables,
} from "./gqlTypes/updateCheckoutMetadatWhatsapp";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
export interface IGetWhatsappUpdateProps {
  mutation: MutationFn<
    updateCheckoutMetadatWhatsapp,
    updateCheckoutMetadatWhatsappVariables
  >;
}
const handleClick = (
  getWhatsappUpdates: boolean,
  mutation: MutationFn<
    updateCheckoutMetadatWhatsapp,
    updateCheckoutMetadatWhatsappVariables
  >,
  setGetWhatsappUpdates: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  const input = {
    key: "sendInvoiceToWhatsApp",
    value: getWhatsappUpdates ? "true" : "false",
  };

  (async function WA() {
    await mutation({ variables: { id, input: [input] } });
  })();
  setGetWhatsappUpdates(prev => !prev);
};

export const GetWhatsappUpdate: React.FC<IGetWhatsappUpdateProps> = ({
  mutation,
}) => {
  useEffect(() => {
    const input = {
      key: "sendInvoiceToWhatsApp",
      value: "true",
    };
    mutation({ variables: { id, input: [input] } });
  }, []);

  const [getWhatsappUpdates, setGetWhatsappUpdates] = useState(true);

  const { checkout } = useCheckoutState();
  const id = checkout ? checkout.id! : "";

  return (
    <>
      {CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST ? (
        <FormControlLabel
          value={false}
          control={
            <Checkbox
              checked={getWhatsappUpdates}
              onChange={() =>
                handleClick(
                  !getWhatsappUpdates,
                  mutation,
                  setGetWhatsappUpdates,
                  id
                )
              }
              name="getWhatsappUpdates"
              style={{ color: defaultTheme.colors.checkboxRadioColor }}
            />
          }
          label="Get Updates on WhatsApp"
        />
      ) : (
        <Card>
          <FormControlLabel
            value={false}
            control={
              <Checkbox
                checked={getWhatsappUpdates}
                onChange={() =>
                  handleClick(
                    !getWhatsappUpdates,
                    mutation,
                    setGetWhatsappUpdates,
                    id
                  )
                }
                name="getWhatsappUpdates"
                style={{ color: defaultTheme.colors.checkboxRadioColor }}
              />
            }
            label="Get Updates on WhatsApp"
          />
        </Card>
      )}
    </>
  );
};
GetWhatsappUpdate.displayName = "GetWhatsappUpdate";
export default GetWhatsappUpdate;
