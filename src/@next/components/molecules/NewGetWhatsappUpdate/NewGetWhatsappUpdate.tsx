import React, { useEffect, useState } from "react";
// import { defaultTheme } from "Themes/globalStyles";
import WhatsappIcon from "@components/atoms/SvgIcons/Whatsapp";
// import { Checkbox, FormControlLabel } from "@material-ui/core";

// import { useLocalStorage } from "@hooks/useLocalStorage";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import { MutationFn } from "react-apollo";
// import { TypedUpdateCheckoutMetadataWhatsapp } from "./queries";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { Checkbox } from "@components/atoms/Checkbox";
import Checkbox from "@mui/material";
import {
  updateCheckoutMetadatWhatsapp,
  updateCheckoutMetadatWhatsappVariables,
} from "./gqlTypes/updateCheckoutMetadatWhatsapp";
import * as S from "./styles";

export interface INewGetWhatsappUpdateProps {
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

export const NewGetWhatsappUpdate: React.FC<INewGetWhatsappUpdateProps> = ({
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
    <S.Wrapper>
      <WhatsappIcon style={{ marginRight: "1rem" }} />
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
            style={{ color: "#56774D" }}
          />
        }
        label="Get Updates on WhatsApp"
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          width: "100%",
          color: "#686B78",
        }}
      />
    </S.Wrapper>
  );
};
NewGetWhatsappUpdate.displayName = "NewGetWhatsappUpdate";
export default NewGetWhatsappUpdate;
