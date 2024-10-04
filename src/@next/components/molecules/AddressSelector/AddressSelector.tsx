import React, { useState } from "react";
//import Select from "@mui/material";
// import MenuItem from "@mui/material";
import { Select } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import styled from "styled-components";
import { IAddressWithEmailAndTypes } from "@types";
import { TypedAddressTypeQuery } from "./queries";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import FormControl from "@mui/material/FormControl";

export interface IAddressSelectorProps {
  addresses: any;
  setAddress: (address: Partial<IAddressWithEmailAndTypes>) => void;
  setMyAddresses: any;
  className?: any;
}

export const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#78a442",
    },
    width: "100%",
    fontFamily: "inherit",
    "& .MuiInput-underline:after": {
      borderBottomColor: "#78a442",
    },
    "& .MuiInputBase-root": {
      fontFamily: "inherit",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d4d6d5",
        fontFamily: "inherit",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#78a442",
        fontFamily: "inherit",
      },
    },
    backgroundColor: "transparent",
    "& .MuiFormHelperText-root ": {
      color: "red",
    },
    "& .MuiInputLabel-root": {
      color: "#686B78",
      fontFamily: "inherit",
      "& .MuiFormLabel-asterisk": {
        color: "red",
      },
    },
    "& .MuiInput-underline": {
      "&::after": {
        color: "#56774D",
        borderBottom: "2px solid #56774D",
      },
    },
  },
  selectState: {
    "& .MuiSelect-select": {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  },
  focused: {},
}));

const AddressBar = styled.div`
  box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1);
  cursor: pointer;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 10px;
  min-height: 70px;
  border: 1px solid #fff;
  width: 100%;
`;
const AddressDetail = styled.div`
  width: 100%;
  padding: 10px 0px;
  color: #345e2e;
  display: flex;
`;
const LabelContainer = styled.div`
  flex-direction: row;
  align-items: center;
  float: left;
  margin-top: 8px;
  margin-right: 1rem;
`;
const Label = styled.div`
  font-weight: 500;
`;
type maddress = Array<any>;
export const AddressSelector: React.FC<IAddressSelectorProps> = ({
  addresses,
  setAddress,
  setMyAddresses,
  className,
}) => {
  // const [maddress, setMaddress] = useState<maddress>([]);
  let arr: maddress = [];
  const [deafultAddress, setDefaultAddress] = useState(0);
  let selectedAddress: IAddressWithEmailAndTypes = {};
  try {
    selectedAddress = JSON.parse(localStorage.getItem("selectedAddress")!);
  } catch (e) {
    //
  }
  const classes = useStyle();
  if (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST) {
    return (
      <AddressDetail>
        <LabelContainer>
          <Label>Deliver to: </Label>
        </LabelContainer>
        <br />
        <FormControl
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={className ? className.textField : ""}
        >
          <Select
            style={{ fontFamily: "inherit" }}
            native
            value={deafultAddress}
            onChange={e => {
              const { value } = e.target;
              const address = arr[value as number]?.address;
              if (address) setAddress(address);
              setDefaultAddress(value as number);
            }}
          >
            <option
              disabled
              value=""
              style={{ fontSize: "11px", fontFamily: "MyriadPro, serif" }}
            >
              Select an address
            </option>
            {addresses.map((addr: any, index: any) => {
              const address = addr?.address;
              const {
                id,
                firstName,
                lastName,
                streetAddress1,
                streetAddress2,
                city,
                countryArea,
                country,
                // type,
              } = address;
              return (
                <TypedAddressTypeQuery variables={{ addressId: id }}>
                  {({ data }) => {
                    arr = [
                      ...arr,
                      {
                        ...addr,
                        address: { ...address, type: data?.addressType?.type },
                      },
                    ];
                    if (id === selectedAddress?.id) {
                      setDefaultAddress(index);
                    }
                    let formattedString = "";
                    if (streetAddress2) {
                      formattedString = `${firstName} ${lastName} | ${streetAddress1} | ${streetAddress2} | ${city}, ${countryArea} | ${
                        country?.country
                      }, ${data?.addressType?.type?.split("_")?.[1]}`;
                    } else {
                      formattedString = `${firstName} ${lastName} | ${streetAddress1} | ${city}, ${countryArea} | ${
                        country?.country
                      }, ${data?.addressType?.type?.split("_")?.[1]}`;
                    }
                    return (
                      <option
                        style={{
                          fontSize: "12px",
                        }}
                        value={index}
                      >
                        {`${formattedString}`}
                      </option>
                    );
                  }}
                </TypedAddressTypeQuery>
              );
            })}
          </Select>
        </FormControl>
      </AddressDetail>
    );
  }
  return (
    <AddressBar>
      <AddressDetail>
        <LabelContainer>
          <Label>Deliver to</Label>
        </LabelContainer>
        <FormControl
          style={{ flex: 1 }}
          className={className ? className.textField : ""}
        >
          <Select
            style={{
              fontSize: "13px",
              fontFamily: "MyriadPro, serif",
            }}
            native
            value={deafultAddress}
            onChange={e => {
              const { value } = e.target;
              const address = arr[value as number]?.address;
              if (address) setAddress(address);
              setDefaultAddress(value as number);
            }}
          >
            <option
              disabled
              value=""
              style={{ fontSize: "11px", fontFamily: "MyriadPro, serif" }}
            >
              Select an address
            </option>
            {addresses.map((addr: any, index: any) => {
              const address = addr?.address;
              const {
                id,
                firstName,
                lastName,
                streetAddress1,
                streetAddress2,
                city,
                countryArea,
                country,
                // type,
              } = address;
              return (
                <TypedAddressTypeQuery variables={{ addressId: id }}>
                  {({ data }) => {
                    arr = [
                      ...arr,
                      {
                        ...addr,
                        address: { ...address, type: data?.addressType?.type },
                      },
                    ];
                    if (id === selectedAddress?.id) {
                      setDefaultAddress(index);
                    }
                    let formattedString = "";
                    if (streetAddress2) {
                      formattedString = `${firstName} ${lastName} | ${streetAddress1} | ${streetAddress2} | ${city}, ${countryArea} | ${
                        country?.country
                      }, ${data?.addressType?.type?.split("_")?.[1]}`;
                    } else {
                      formattedString = `${firstName} ${lastName} | ${streetAddress1} | ${city}, ${countryArea} | ${
                        country?.country
                      }, ${data?.addressType?.type?.split("_")?.[1]}`;
                    }
                    return (
                      <option
                        style={{
                          fontSize: "12px",
                          fontFamily: "MyriadPro, serif",
                        }}
                        value={index}
                      >
                        {`${formattedString}`}
                      </option>
                      // <MenuItem style={{ fontSize: '11px', fontFamily: 'MyriadPro, serif' }} value={index}>
                      //   {`${firstName} ${lastName}`}<br />
                      //   {`${streetAddress1}`}<br />
                      //   {`${streetAddress2? streetAddress2: ''}`}
                      //   {streetAddress2 && <br />}
                      //   {`${city}, ${countryArea}`}<br />
                      //   {`${country?.country}, ${data?.addressType?.type?.split("_")?.[1]} `}
                      // </MenuItem>
                    );
                  }}
                </TypedAddressTypeQuery>
              );
            })}
          </Select>
          {/* <Select
            native
            onChange={e => {
              // debugger;
              const { value } = e.target;
              //
              const address = arr[value as number]?.address;
              //
              // "🚀 ~ file: AddressSelector.tsx ~ line 65 ~ address",
              // address
              // );
              if (address) setAddress(address);
            }}
          >
            <MenuItem hidden disabled selected value="">
              {" "}
              -- Select an option --{" "}
            </MenuItem>
            {addresses.map((addr: any, index: any) => {
              const address = addr?.address;
              const {
                id,
                firstName,
                lastName,
                streetAddress1,
                streetAddress2,
                city,
                countryArea,
                country,
                // type,
              } = address;
              return (
                <TypedAddressTypeQuery variables={{ addressId: id }}>
                  {({ data }) => {
                    // setMyAddresses([...prev,])
                    // setMaddress([
                    //   ...maddress,
                    //   { ...addr, type: data?.addressType?.type },
                    // ]);
                    arr = [
                      ...arr,
                      {
                        ...addr,
                        address: { ...address, type: data?.addressType?.type },
                      },
                    ];
                    //
                    // "🚀 ~ file: AddressSelector.tsx ~ line 102 ~ {addresses.map ~ arr",
                    // arr
                    // );
                    return (
                      <MenuItem value={index}>
                          {`${firstName} ${lastName} | ${streetAddress1} | ${streetAddress2} | ${city}, ${countryArea} | ${country?.country}, ${data?.addressType?.type?.split("_")?.[1]}`}
                      </MenuItem>
                      // <option value={index}>
                      //   {`${firstName} ${lastName}\n`}{streetAddress1},{"\n"}
                      //   {streetAddress2}, {`\n${city}, `}, {countryArea},{", "}
                      //   {country?.country}, {`\n${data?.addressType?.type}`}
                      // </option>
                    );
                  }}
                </TypedAddressTypeQuery>
              );
            })}
          </Select> */}
        </FormControl>
      </AddressDetail>
    </AddressBar>
  );
};
AddressSelector.displayName = "AddressSelector";
export default AddressSelector;
