import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { useUser, useAuth, useAuthState } from "@saleor/sdk";

import { Attribute } from "@components/atoms/Attribute";
import { IconButton } from "@components/atoms/IconButton";
import { Tile } from "@components/atoms/Tile";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";
import MemoEditNewIcon from "@components/atoms/SvgIcons/EditNewIcon";
import { UpdateUserMetadata } from "./queries";
import { updateMetadata } from "@components/templates/AppHeader/queries";
import { customEventTrigger, formatedDate, getMetadataValue, parseJson } from "@utils/misc";

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  // const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const { updateAccount } = useUser();
  const intl = useIntl();
  const { user } = useAuthState();

  const [DOB,setDOB] = useState(null);
  const [editDOB,seteditDOB] = useState(false);

  const UserDOB =
  getMetadataValue(user?.metadata, "UserDOB") &&
  parseJson(getMetadataValue(user?.metadata, "UserDOB"));
  
  // React.useEffect(() => {
  //   if (data && !error) {
  //     setIsEditing(false);
  //   }
  // }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage id="my-data" defaultMessage="MY DATA" />
          </S.Header>
          <S.Content>
            <S.HeaderSmall>
              <FormattedMessage id="personal-details" defaultMessage="Personal details" />
              {!isEditing && (
                // <IconButton
                //   testingContext="editDetailsButton"
                //   name="edit"
                //   size={22}
                //   onClick={() => setIsEditing(isEditing => !isEditing)}
                // />
                <div onClick={() => setIsEditing(isEditing => !isEditing)}>
                  <MemoEditNewIcon />
                </div>
              )}
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || "",
                  lastName: (user && user.lastName) || "",
                }}
                handleSubmit={async data => {
                  customEventTrigger("personal_detail_save_click", user)
                  const res = await updateAccount({ input: data });
                  if (
                    !(
                      res.data.accountUpdate.accountErrors &&
                      res.data.accountUpdate.accountErrors.length
                    )
                  ) {
                    setIsEditing(false);
                  }
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : (
              <S.ContentOneLine data-test="personalDetailsSection">
                <Attribute
                  description={intl.formatMessage(commonMessages.firstName)}
                  attributeValue={(user && user.firstName) || "-"}
                  testingContext="firstNameText"
                  changePosition={true}
                />
                <Attribute
                  description={intl.formatMessage(commonMessages.lastName)}
                  attributeValue={(user && user.lastName) || "-"}
                  testingContext="lastNameText"
                  changePosition={true}
                />
              </S.ContentOneLine>
            )}
          </S.Content>
          <UpdateUserMetadata>
          { updateDOB =>{
              return(
                <S.Birthdaywrapper>
                  <S.BirthdayContent>
                    <h4>Date of Birth</h4>
                    <S.Birthdaydetail>
                      <span>{ (DOB && formatedDate(DOB)) || formatedDate(UserDOB)  || "-"}</span>

                      { editDOB && 
                          <>
                            <input className="data_picker" type="date" min="01-01-0001" onChange={e=>setDOB(e.target.value)}/>
                            <button onClick={()=>{
                              updateDOB({
                                variables:{
                                  "updateMetadataId": user?.id,
                                  "input": [
                                    {
                                      "key": "UserDOB",
                                      "value": DOB || UserDOB
                                    }
                                  ]
                                }
                              })
                              .then(res=>
                                {
                                  setDOB(DOB)
                                  seteditDOB(false);
                                }
                                )
                              .catch(err=>console.log(err))
                            }
                            
                            }>Save</button>
                          </>
                      }

                    </S.Birthdaydetail>
                  </S.BirthdayContent>
                    <div className="" onClick={()=>seteditDOB(true)}>
                      <MemoEditNewIcon />
                    </div>
                </S.Birthdaywrapper>        
              ) 
          }
          }
          </UpdateUserMetadata>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
