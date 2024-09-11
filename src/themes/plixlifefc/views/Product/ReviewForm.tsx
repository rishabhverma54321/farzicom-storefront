import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@components/atoms/Button";
import { MyRating } from "@components/atoms/MyRating";
import { StyledInputReview } from "@components/atoms/StyledInput";
import { useRouter } from "next/router";

import { styled } from "@styles/themes";
import { ProductReviewInput } from "../../../../../gqlTypes/globalTypes";
import {
  TypedCreateProductReview,
  TypedCreateProductReviewImage,
  TypedCreateUpdatedProductReview,
} from "./queries";
import MemoCloseIcon from "@components/atoms/SvgIcons/CloseIcon";
import MemoClosebutton from "@components/atoms/SvgIcons/Closebutton";
import { customEventTrigger } from "@utils/misc";
import { useAuthState } from "@saleor/sdk";
// import UploadIcon from "../../../../images/plixlifefc/uploadIcon.png";

export interface IReviewFormProps {
  productId: string;
  reviewDataFromQueryParam?: any;
  showcloseButton?: boolean;
  modalClose?: any;
}

// Validations
const nameRegex = /^[a-zA-Z ]*$/;
const phoneRegex = /^[0-9]{10}$/;
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .matches(nameRegex, "Name can only contain alphabets")
    .max(30, "Name cannot be longer than 30 characters"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  review: Yup.string().max(
    1000,
    "Review Cannot be longer than 1000 characters"
  ),
  rating: Yup.number().required("Required"),
  reviewtitle: Yup.string()
    .required("Required")
    .max(50, "Title cannot be longer than 50 characters"),
  phone_no: Yup.string()
    .required("Required")
    .matches(phoneRegex, "Please enter a valid phone number"),
});

export const StyledErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin: auto;
  margin-top: 4px;
  margin-bottom: 10px;
  /* font-weight: 600; */
  /* padding: 10px; */
  /* border: none; */
`;

export const ReviewForm: React.FC<IReviewFormProps> = ({
  productId,
  showcloseButton,
  modalClose,
  reviewDataFromQueryParam,
}) => {
  const [afterSubmitMessage, setAfterSubmitMessage] = useState("");
  const [image, setImage] = useState<any>(null);

  // console.log("UploadIcon", UploadIcon);

  const formInitialValues = {
    rating: reviewDataFromQueryParam?.rating || 5,
    name: reviewDataFromQueryParam?.userName || "",
    review: reviewDataFromQueryParam?.review || "",
    email:
      reviewDataFromQueryParam?.userEmail ||
      reviewDataFromQueryParam?.user?.email ||
      "",
    reviewtitle: reviewDataFromQueryParam?.title || "",
    phone_no:
      (reviewDataFromQueryParam?.phone &&
        reviewDataFromQueryParam?.phone?.replace("+91", "")) ||
      "",
  };

  const router = useRouter();

  const {user} = useAuthState();

  return (
    <>
      <div
        className="WriteAReviewContainer__body"
        style={{ border: "1px solid black", borderRadius: "10px" }}
      >
        {!afterSubmitMessage ? (
          <h4 className="Form_heading">Write A Review</h4>
        ) : (
          <></>
        )}
        <TypedCreateProductReviewImage>
          {mutation_image => {
            return (
              <TypedCreateUpdatedProductReview
                onCompleted={({ CreateUpdatedProductReview }) => {
                  if (
                    CreateUpdatedProductReview?.productReviewErrors?.length &&
                    CreateUpdatedProductReview?.productReviewErrors[0]?.code ===
                      "INVALID"
                  ) {
                    setAfterSubmitMessage(
                      "Oops!! Review not submitted. Try Again..."
                    );
                  } else
                    setAfterSubmitMessage(
                      "Review successfully submitted. Your review will be listed once approved. Thank you!"
                    );
                }}
              >
                {updatedMutation => {
                  return (
                    <TypedCreateProductReview
                      onCompleted={({ CreateProductReview }) => {
                        // setTimeout(() => hide(), 2000);
                        // hide();

                        if (!CreateProductReview?.productReview?.rating)
                          setAfterSubmitMessage(
                            "Oops!! Review not submitted. Try Again..."
                          );
                        else
                          setAfterSubmitMessage(
                            "Review successfully submitted. Your review will be listed once approved. Thank you!"
                          );
                      }}
                    >
                      {mutation => {
                        if (afterSubmitMessage) {
                          return (
                            <div className="WriteAReviewContainer__afterSubmitMessage">
                              {afterSubmitMessage}
                            </div>
                          );
                        }
                        return (
                          <Formik
                            initialValues={formInitialValues}
                            onSubmit={values => {
                              const input: ProductReviewInput = {
                                productId,
                                rating: values.rating,
                                review: values.review,
                                userName: values.name,
                                isPublished: false,
                                title: values.reviewtitle,
                                userEmail: values.email,
                                phone: `+91${values.phone_no}`,
                              };

                              const updatedInput = {
                                userEmail: values.email,
                                userName: values.name,
                                rating: values.rating,
                                review: values.review,
                                title: values.reviewtitle,
                                encryptedToken:
                                  reviewDataFromQueryParam?.reviewToken || null,
                              };
                              if (reviewDataFromQueryParam?.reviewToken) {
                                updatedMutation({
                                  variables: {
                                    id: reviewDataFromQueryParam?.id,
                                    input: updatedInput,
                                  },
                                }).then(res => {
                                  customEventTrigger("review_posted", user, {
                                    rating:values?.rating,
                                    field_entered:values?.review || "NA"
                                  });
                                  if (image) {
                                    const inputData = {
                                      productReview:
                                        res?.data?.CreateUpdatedProductReview
                                          ?.productReview?.id,
                                      alt: "test",
                                      image,
                                    };
                                    mutation_image({
                                      variables: {
                                        input: inputData,
                                      },
                                    });
                                  }
                                  const {
                                    review_id,
                                    token,
                                    ...newQuery
                                  } = router.query;
                                  location.hash = "";
                                  router.push(
                                    {
                                      pathname: router.pathname,
                                      query: newQuery,
                                    },
                                    undefined,
                                    {
                                      shallow: true,
                                    }
                                  );
                                });
                              } else {
                                mutation({
                                  variables: { input },
                                }).then(res => {
                                  customEventTrigger("review_posted", user, {
                                    rating:values?.rating,
                                    field_entered:values?.review || "NA"
                                  });
                                  if (
                                    typeof window !== "undefined" &&
                                    window.location?.hash
                                  ) {
                                    location.hash = "";
                                  }
                                  if (image) {
                                    const inputData = {
                                      productReview:
                                        res?.data?.CreateProductReview
                                          ?.productReview?.id,
                                      alt: "test",
                                      image,
                                    };
                                    mutation_image({
                                      variables: {
                                        input: inputData,
                                      },
                                    });
                                  }
                                });
                              }
                            }}
                            validationSchema={validationSchema}
                          >
                            {({ setFieldValue, values }) => {
                              return (
                                <Form className="ReviewForm">
                                  {showcloseButton ? (
                                    <div
                                      className="close_review"
                                      onClick={() => modalClose()}
                                    >
                                      <MemoClosebutton />
                                    </div>
                                  ) : null}
                                  <div className="ReviewFormElement">
                                    {/* <label className="ReviewFormLabel" htmlFor="name">
                                Name
                              </label> */}
                                    <StyledInputReview
                                      name="name"
                                      label="Name"
                                      placeholder="Enter your name"
                                      updateStyle={true}
                                    />
                                    <ErrorMessage
                                      component={StyledErrorMessage}
                                      name="name"
                                    />
                                  </div>
                                  <div className="ReviewFormElement">
                                    {/* <label
                                className="ReviewFormLabel"
                                htmlFor="email"
                              >
                                Email
                              </label> */}
                                    <StyledInputReview
                                      name="email"
                                      label="Email"
                                      placeholder="Enter your email"
                                      updateStyle={true}
                                    />
                                    <ErrorMessage
                                      component={StyledErrorMessage}
                                      name="email"
                                    />
                                  </div>
                                  <div className="ReviewFormElement">
                                    {/* <label
                                className="ReviewFormLabel"
                                htmlFor="reviewphone_no"
                              >
                                Phone No.
                              </label> */}
                                    <StyledInputReview
                                      name="phone_no"
                                      label="phone_no"
                                      placeholder="Enter your phone number"
                                      disabled={reviewDataFromQueryParam?.phone}
                                      updateStyle={true}
                                    />
                                    <ErrorMessage
                                      component={StyledErrorMessage}
                                      name="phone_no"
                                    />
                                  </div>
                                  <div className="ReviewFormElement">
                                    {/* <label
                                className="ReviewFormLabel"
                                htmlFor="reviewtitle"
                              >
                                Review Title
                              </label> */}
                                    <StyledInputReview
                                      name="reviewtitle"
                                      label="Reviewtitle"
                                      placeholder="Give your review a title"
                                      updateStyle={true}
                                    />
                                    <ErrorMessage
                                      component={StyledErrorMessage}
                                      name="reviewtitle"
                                    />
                                  </div>
                                  <div className="ReviewFormElement">
                                    {/* <label
                                className="ReviewFormLabel"
                                htmlFor="review"
                              >
                                Review
                              </label> */}
                                    <StyledInputReview
                                      name="review"
                                      component="textarea"
                                      label="review"
                                      placeholder="Write your comment here"
                                      rows={6}
                                      updateStyle={true}
                                    />
                                    <ErrorMessage
                                      component={StyledErrorMessage}
                                      name="review"
                                    />
                                  </div>

                                  <div className="ReviewFormElement">
                                    <label
                                      className="ReviewFormLabel"
                                      htmlFor="rating"
                                    >
                                      Rating
                                    </label>
                                    <MyRating
                                      isReadOnly={false}
                                      name="rating"
                                      rating={values?.rating}
                                      handleChange={setFieldValue}
                                      size="large"
                                      showEmptyIconOutlined
                                    />
                                  </div>

                                  <div className="ReviewFormElement newUploadsection">
                                    <label
                                      className="ReviewFormLabel"
                                      htmlFor="uploadImages"
                                    >
                                      Upload Images
                                    </label>
                                    <div
                                      className="ReviewUploadImages"
                                      style={{
                                        backgroundImage: `url(${
                                          image
                                            ? URL.createObjectURL(image)
                                            : "/plixlifefc/assets/uploadIcon.png"
                                        })`,
                                      }}
                                    >
                                      <input
                                        type="file"
                                        name="uploadImages"
                                        id="uploadImages"
                                        onChange={e => {
                                          setImage(e.target.files[0]);
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="buttonWrapper">
                                    <Button
                                      testingContext="SubmitReview"
                                      type="submit"
                                      color="primary"
                                      // size="sm"
                                      style={{
                                        backgroundColor: "#02262a",
                                        color: "white",
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                  <div />
                                </Form>
                              );
                            }}
                          </Formik>
                        );
                      }}
                    </TypedCreateProductReview>
                  );
                }}
              </TypedCreateUpdatedProductReview>
            );
          }}
        </TypedCreateProductReviewImage>
      </div>
    </>
  );
};

ReviewForm.displayName = "ReviewForm";
export default ReviewForm;
