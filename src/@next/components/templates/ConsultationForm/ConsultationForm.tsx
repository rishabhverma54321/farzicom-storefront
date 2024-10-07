import { Card } from "@components/molecules/Card";
import { getMetadataValue, maybe } from "@utils/misc";
import React, { useState } from "react";
import { AlertManager, useAlert } from "react-alert";
import { IntlShape, useIntl } from "react-intl";
import { ApolloError } from "apollo-client";
import {
  TypedGenericFormCreateMutation,
  TypedProductNamesListQuery,
} from "./queries";
import * as S from "./styles";
import { GenericFormCreateMutation } from "./gqlTypes/GenericFormCreateMutation";

export interface IConsultationFormProps {
  content: any;
}

export const ConsultationForm: React.FC<IConsultationFormProps> = ({
  content,
}) => {
  const contentMeta = content?.metadata;

  const cardData =
    contentMeta &&
    getMetadataValue(contentMeta, "cardData") &&
    JSON.parse(getMetadataValue(contentMeta, "cardData"));

  const dropDownData =
    contentMeta &&
    getMetadataValue(contentMeta, "dropDownData") &&
    JSON.parse(getMetadataValue(contentMeta, "dropDownData"));

  const goalDropDownData =
    dropDownData && dropDownData?.goal ? dropDownData?.goal : [];

  const genderDropDownData =
    dropDownData && dropDownData?.gender ? dropDownData?.gender : [];

  const medicalDropDownData =
    dropDownData && dropDownData?.medical ? dropDownData?.medical : [];

  const physicalDropDownData =
    dropDownData && dropDownData?.physical ? dropDownData?.physical : [];

  const heightFeetDropDownData =
    dropDownData && dropDownData?.heightFeet ? dropDownData?.heightFeet : [];

  const heightInchDropDownData =
    dropDownData && dropDownData?.heightInch ? dropDownData?.heightInch : [];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medical, setMedical] = useState("");
  const [physical, setPhysical] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [orderId, setOrderId] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState("");
  const [textArea, setTextArea] = useState("");

  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const intl = useIntl();

  const responseBody = {
    goal,
    age,
    gender,
    "medical history": medical,
    "physical activity": physical,
    "weight - KG": weight,
    height: `${heightFeet}'${heightInch}`,
    "purchased product": purchaseProduct,
    "diet Pattern/Concerns": textArea,
    "order id": orderId,
    crm: true,
  };

  const responseBodyString = JSON.stringify(responseBody);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case "name": {
        setName(value);
        break;
      }

      case "phone": {
        setPhone(value);
        break;
      }

      case "email": {
        setEmail(value);
        break;
      }

      case "goal": {
        setGoal(value);
        break;
      }

      case "age": {
        setAge(value);
        break;
      }

      case "gender": {
        setGender(value);
        break;
      }

      case "medical": {
        setMedical(value);
        break;
      }

      case "orderId": {
        setOrderId(value);
        break;
      }

      case "physical": {
        setPhysical(value);
        break;
      }

      case "weight": {
        setWeight(value);
        break;
      }

      case "heightFeet": {
        setHeightFeet(value);
        break;
      }

      case "heightInch": {
        setHeightInch(value);
        break;
      }

      case "purchaseProduct": {
        setPurchaseProduct(value);
        break;
      }

      case "textArea": {
        setTextArea(value);
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleResetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setGoal("");
    setAge("");
    setGender("");
    setMedical("");
    setPhysical("");
    setWeight("");
    setHeightFeet("");
    setHeightInch("");
    setPurchaseProduct("");
    setTextArea("");
  };

  const showSuccessNotification = (
    alert: AlertManager,
    intl: IntlShape,
    data?: GenericFormCreateMutation,
    error?: ApolloError
  ) => {
    setLoading(false);

    if (error) {
      alert.show(
        {
          title: intl.formatMessage({
            id:"form-fill",
            defaultMessage: "Please Fill the form correctly!",
          }),
        },
        { type: "error", timeout: 5000 }
      );
    }
    if (data) {
      const successful = maybe(
        () => !data.genericFormCreate?.genericFormErrors.length
      );

      if (successful) {
        alert.show(
          {
            title: intl.formatMessage({
              id: "form-submit",
              defaultMessage: "Form Submitted Successfully",
            }),
          },
          { type: "success", timeout: 5000 }
        );
        handleResetForm();
      } else {
        alert.show(
          {
            title: intl.formatMessage({
              id:"form-fill",
              defaultMessage: "Please Fill the form correctly!",
            }),
          },
          { type: "error", timeout: 5000 }
        );
      }
    }
  };

  return (
    <TypedGenericFormCreateMutation
      variables={{
        input: {
          email,
          name,
          phone: `+91${phone}`,
          responseBody: responseBodyString,
        },
      }}
      onCompleted={data => {
        showSuccessNotification(alert, intl, data);
      }}
      onError={error => {
        showSuccessNotification(alert, intl, undefined, error);
      }}
    >
      {mutation => {
        return (
          <S.Wrapper>
            <div className="container">
              <Card content={cardData} cardClass="consultationCard" />
            </div>
            <S.FormContainer>
              <S.Form
                onSubmit={e => {
                  e.preventDefault();
                  mutation();
                  setLoading(true);
                }}
              >
                <S.Input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <S.Input
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  maxLength={10}
                  minLength={10}
                  required
                />
                <S.Input
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <S.Select name="goal" onChange={handleChange} value={goal}>
                  <option value="">Goal</option>
                  {goalDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <S.Input
                  name="age"
                  value={age}
                  onChange={handleChange}
                  placeholder="Age"
                />
                <S.Select name="gender" onChange={handleChange} value={gender}>
                  <option value="">Gender</option>
                  {genderDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <S.Select
                  name="medical"
                  onChange={handleChange}
                  value={medical}
                >
                  <option value="">Medical History</option>
                  {medicalDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <S.Select
                  name="physical"
                  onChange={handleChange}
                  value={physical}
                >
                  <option value="">Current Physical Ability</option>
                  {physicalDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <S.Input
                  name="weight"
                  value={weight}
                  onChange={handleChange}
                  placeholder="Weight - KG"
                />
                <S.Select
                  name="heightFeet"
                  onChange={handleChange}
                  value={heightFeet}
                >
                  <option value="">Height - Feet</option>
                  {heightFeetDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <S.Select
                  name="heightInch"
                  onChange={handleChange}
                  value={heightInch}
                >
                  <option value="">Height - Inch</option>
                  {heightInchDropDownData.map(item => {
                    return <option value={item}>{item}</option>;
                  })}
                </S.Select>
                <TypedProductNamesListQuery
                  variables={{
                    first: 50,
                  }}
                  displayLoader={false}
                >
                  {({ data, loading }) => {
                    const purchasedDropDownData = loading
                      ? []
                      : data?.products?.edges.map(product => product.node.name);

                    return (
                      <S.Select
                        name="purchaseProduct"
                        onChange={handleChange}
                        value={purchaseProduct}
                        required
                      >
                        <option value="">Purchased Product</option>
                        {purchasedDropDownData &&
                          purchasedDropDownData.length &&
                          purchasedDropDownData.map(item => {
                            return <option value={item}>{item}</option>;
                          })}
                      </S.Select>
                    );
                  }}
                </TypedProductNamesListQuery>

                <S.Input
                  name="orderId"
                  value={orderId}
                  onChange={handleChange}
                  placeholder="Order Id"
                  required
                />

                <S.Textarea
                  maxLength={3000}
                  minLength={0}
                  rows={6}
                  placeholder="If there is anything else you wish to ask the nutritionists, you can let us know here..."
                  spellCheck={false}
                  value={textArea}
                  name="textArea"
                  onChange={handleChange}
                />
                <S.ButtonContainer>
                  <S.Button type="submit">
                    {loading ? <>Submitting... </> : <>Submit </>}
                  </S.Button>
                  <S.ResetButton type="reset" onClick={handleResetForm}>
                    Reset
                  </S.ResetButton>
                </S.ButtonContainer>
              </S.Form>
            </S.FormContainer>
          </S.Wrapper>
        );
      }}
    </TypedGenericFormCreateMutation>
  );
};
ConsultationForm.displayName = "ConsultationForm";
export default React.memo(ConsultationForm);
