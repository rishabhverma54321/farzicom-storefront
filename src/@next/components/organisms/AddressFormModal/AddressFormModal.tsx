import { useAuthState, useUser } from "@saleor/sdk";
import React from "react";

import { AddressForm } from "../AddressForm";
import { Modal } from "../Modal";
import { TypedCreateaddressLabel } from "./queries";

import { IProps } from "./types";
import { customEventTrigger } from "@utils/misc";

const AddressFormModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  userId,
  address,
  formId,
  ...props
}: IProps) => {
  const { createAccountAddress, updateAccountAddress, setAccountDefaultAddress } = useUser();

  const [show, setShow] = React.useState(true);
  let errors: any[] | undefined = [];
  const {user} = useAuthState();

  return (
    <Modal
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      formId={formId}
      disabled={false}
      show={show}
      target={target}
      submitBtnText={submitBtnText}
      fixedposition={true}
    >
      {/* <TypedCreateaddressLabel>
        { addaddressLabel =>{
            return( */}
              <AddressForm
                {...props}
                {...{ errors }}
                formId={formId}
                address={address ? address.address : undefined}
                handleSubmit={async data => {
                  // ToDo
                  const isDefaultaddress = data?.type;
                  // const addressLabel = data?.addressLabel;
                  delete data?.type;
                  delete data?.email;
                  delete data?.id;
                  // delete data?.addressLabel;
                  customEventTrigger("add_address_click", user);
                  if (userId) {
                    const res = await createAccountAddress({
                      input: {
                        ...data,
                        country: "IN",
                        phone: `+91${data?.phone}`,
                      },
                    });
                
                    if(isDefaultaddress){
                      setAccountDefaultAddress({ id: res?.data?.accountAddressCreate?.address?.id, type: "BILLING" })
                      .then(result=>{
                        setAccountDefaultAddress({ id: res?.data?.accountAddressCreate?.address?.id, type: "SHIPPING" })
                      })
                      .catch(err=>console.log(err))
                    }

                    // if(addressLabel){

                    //   addaddressLabel({
                    //     variables:{
                    //       "updateMetadataId": res?.data?.accountAddressCreate?.address?.id,
                    //       "input": [
                    //         {
                    //           "key": "address_type",
                    //           "value": addressLabel
                    //         }
                    //       ]
                    //     }
                    //   })
                    //   .then(res=>console.log("res",res))
                    //   .catch(err=>console.log("error",err))
                    // }
        
                    if (
                      res.data.accountAddressCreate.accountErrors &&
                      res.data.accountAddressCreate.accountErrors.length
                    ) {
                      errors = res.data.accountAddressCreate.accountErrors;
                    } else {
                      hideModal();
                    }
                  } else {
                    const res = await updateAccountAddress({
                      id: address!.id,
                      input: {
                        ...data,
                        country: "IN",
                      },
                    });
                    if(isDefaultaddress){
                      setAccountDefaultAddress({ id: res?.data?.accountAddressUpdate?.address?.id, type: "BILLING" })
                      .then(result=>{
                        setAccountDefaultAddress({ id: res?.data?.accountAddressUpdate?.address?.id, type: "SHIPPING" })
                      })
                      .catch(err=>console.log(err))
                    }
        
                    if (
                      res.data.accountAddressUpdate.accountErrors &&
                      res.data.accountAddressUpdate.accountErrors.length
                    ) {
                      errors = res.data.accountAddressUpdate.accountErrors;
                    } else {
                      hideModal();
                    }
                  }
                }}
              />

            {/* )

          }
        }
      </TypedCreateaddressLabel> */}
    </Modal>
  );
};

export default AddressFormModal;
