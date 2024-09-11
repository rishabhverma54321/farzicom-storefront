import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { MetaWrapper } from "@temp/components";
import { Button } from "@components/atoms/Button";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { StyledInput, StyledInputNormal } from "@components/atoms/StyledInput";
import { StyledErrorMessage } from "@temp/components/OverlayManager/WriteAReview";
import { StlyedSelectFieldNormal } from "@components/atoms/StyledSelect/styles";
import * as S from "./styles";
import { TypedCreateInfluencerMutation } from "./mutation";

export interface IInfluencerSignUp {}
const phoneRegex = /^[0-9]{10}$/;

const metaRegex = /.*key.*value/;

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(phoneRegex, "Please enter 10 digits"),
  metadata: Yup.string()
    .required("Required")
    .matches(metaRegex, "Atleast 1 Social Media Link is Required"),
});

const options = [
  { value: "", label: "Social Media Name" },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "youtube",
    label: "Youtube",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const InfluencerSignUp: React.FC<IInfluencerSignUp> = () => {
  const [jsonString, setJsonString] = useState('[{"":""}]');
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const jsonParse = JSON.parse(jsonString);
  const handleChange = (
    e: any,
    index: any,
    fieldIndex: any,
    setFieldValue: any
  ) => {
    jsonParse[index][fieldIndex] = e.target.value;
    setJsonString(JSON.stringify(jsonParse));
    setFieldValue("metadata", JSON.stringify(jsonParse));
  };

  const handleAddMoreSocial = (setFieldValue: any) => {
    jsonParse.push({ "": "" });
    setJsonString(JSON.stringify(jsonParse));
    setFieldValue("metadata", JSON.stringify(jsonParse));
  };

  if (couponCode) {
    return (
      <MetaWrapper
        meta={{
          title: "Influencer-SignUp-Lotus Organics+",
          description: "Influencer-SignUp-Lotus Organics+",
        }}
      >
        <S.Container>
          <CollectionHeading Heading="Successfully Submitted!" />
          <S.FormContainer>
            <S.Row>
              <div>
                Thanks for signing up as an Influencer! <br /> Use the following
                Coupon Code to promote Lotus Organics
              </div>
            </S.Row>
            <S.Row>
              <S.TextHeading> {couponCode} </S.TextHeading>
            </S.Row>
          </S.FormContainer>
        </S.Container>
      </MetaWrapper>
    );
  }
  return (
    <MetaWrapper
      meta={{
        title: "Influencer-SignUp-Lotus Organics+",
        description: "Influencer-SignUp-Lotus Organics+",
      }}
    >
      <TypedCreateInfluencerMutation
        onCompleted={data => {
          if (data.createInfluencer?.influencer) {
            setCouponCode(data.createInfluencer?.influencer.couponCode);
          }
        }}
      >
        {mutation => (
          <S.Container>
            <CollectionHeading Heading="Influencer Sign Up" />
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                metadata: jsonString,
              }}
              onSubmit={async values => {
                await mutation({ variables: { input: values } });
              }}
              validationSchema={validationSchema}
            >
              {({ setFieldValue }) => (
                <Form>
                  <S.FormContainer>
                    <S.Row>
                      <S.InputDiv>
                        <StyledInput
                          name="name"
                          label="Name"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          component={StyledErrorMessage}
                          name="name"
                        />
                      </S.InputDiv>
                      <S.InputDiv>
                        <StyledInput
                          name="phone"
                          label="phone"
                          placeholder="Phone"
                        />
                        <ErrorMessage
                          component={StyledErrorMessage}
                          name="phone"
                        />
                      </S.InputDiv>
                    </S.Row>
                    <S.Row>
                      <S.InputDiv>
                        <StyledInput
                          name="email"
                          label="email"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          component={StyledErrorMessage}
                          name="email"
                        />
                      </S.InputDiv>{" "}
                    </S.Row>
                    <S.Row>
                      <S.TextHeading>Social Media Links</S.TextHeading>
                    </S.Row>

                    <S.SocialMediaLinksContainer>
                      {jsonParse.map((data: any, index: any) => {
                        return (
                          <S.Row alignItems="center" key={index}>
                            <S.InputDiv>
                              <StlyedSelectFieldNormal
                                name={`socialMediaName${index}`}
                                value={data.key}
                                onChange={e =>
                                  handleChange(e, index, "key", setFieldValue)
                                }
                              >
                                {options.map(option => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </StlyedSelectFieldNormal>
                            </S.InputDiv>
                            <S.InputDiv>
                              <StyledInputNormal
                                name={`socialMediaLink${index}`}
                                //   label={`socialMediaLink${index}`}
                                placeholder="Social Media Link"
                                value={data.value}
                                onChange={e =>
                                  handleChange(e, index, "value", setFieldValue)
                                }
                              />
                              <ErrorMessage
                                component={StyledErrorMessage}
                                name={`socialMediaLink${index}`}
                              />
                            </S.InputDiv>
                          </S.Row>
                        );
                      })}

                      <S.Row jutifyContent="flex-end" alignItems="flex-end">
                        <S.AddMoreDiv>
                          <Button
                            testingContext="addMoreSocial"
                            type="button"
                            size="sm"
                            color="secondary"
                            onClick={() => handleAddMoreSocial(setFieldValue)}
                          >
                            Add More
                          </Button>
                        </S.AddMoreDiv>
                      </S.Row>
                    </S.SocialMediaLinksContainer>

                    <S.Row>
                      <Button
                        testingContext="influencerSignUp"
                        type="submit"
                        size="md"
                      >
                        Submit
                      </Button>
                    </S.Row>
                  </S.FormContainer>
                </Form>
              )}
            </Formik>
          </S.Container>
        )}
      </TypedCreateInfluencerMutation>
    </MetaWrapper>
  );
};
InfluencerSignUp.displayName = "InfluencerSignUp";
export default InfluencerSignUp;
