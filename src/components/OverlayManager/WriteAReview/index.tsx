import React, { useState } from "react";
import { ProductReviewInput } from "gqlTypes/globalTypes";
// import CloseIcon from "@material-ui/icons/Close";
import { styled } from "@styles/themes";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import { Form, Formik, ErrorMessage } from "formik";
import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";
import { MyRating } from "@components/atoms/MyRating";
import { StyledInput } from "@components/atoms/StyledInput";

import * as Yup from "yup";
import * as S from "./styles";
// import { theme } from "@styles/constants";
// import {
//   InnerOverlayContextInterface,
//   OverlayTheme,
//   OverlayType,
// } from "@temp/components/Overlay/context";
import { TypedCreateProductReview } from "./queries";
import {
  InnerOverlayContextInterface,
  OverlayType,
  OverlayTheme,
  Overlay,
  OverlayContextInterface,
} from "../..";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";

export interface IWriteAReview {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

export const StyledErrorMessage = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.8rem;
  margin: auto;
  margin-bottom: 10px;
  font-weight: 600;
  /* padding: 10px; */
  /* border: none; */
`;

const WRITE_A_REVIEW = "Write a Review";

const validationSchema = Yup.object({
  rating: Yup.number().required("Required"),
  name: Yup.string().required("Required"),
  review: Yup.string().required("Required"),
});

const reviewContextSuccess: InnerOverlayContextInterface = {
  content: "Your review will be listed once approved. Thankyou!",
  status: "success",
  title: "Review Successful",
};

// const reviewContextFail: InnerOverlayContextInterface = {
//   content: "Oops!! Review not submitted. Try Again...",
//   status: "error",
//   title: "Review Failed",
// };

const WriteAReview: React.FC<IWriteAReview> = ({ overlay, testingContext }) => {
  const {
    show,
    hide,
    context: { data },
  } = overlay;
  const [afterSubmitMessage, setAfterSubmitMessage] = useState("");

  return (
    <Overlay testingContext={testingContext} context={overlay}>
      <div className="WriteAReviewContainer">
        <S.Header className="WriteAReviewContainer__header">
          <div className="WriteAReviewContainer__header__text">
            {WRITE_A_REVIEW}
          </div>

          <div onClick={hide} className="WriteAReviewContainer__header__close">
            {/* <IconButton
              name="x"
              size={16}
              testingContext="closeModal"
              onClick={hide}
              color="white"
            /> */}
            <MemoSideNavCloseIcon/>
          </div>
        </S.Header>
        <div className="WriteAReviewContainer__body">
          <TypedCreateProductReview
            onCompleted={({ CreateProductReview }) => {
              setTimeout(() => hide(), 2000);
              // hide();

              if (!CreateProductReview.productReview.rating)
                setAfterSubmitMessage(
                  "Oops!! Review not submitted. Try Again..."
                );
              else setAfterSubmitMessage("Review successfully submitted");
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
                  initialValues={{
                    rating: 5,
                    name: "",
                    review: "",
                  }}
                  onSubmit={values => {
                    const input: ProductReviewInput = {
                      productId: data.productId,
                      rating: values.rating,
                      review: values.review,
                      userName: values.name,
                      isPublished: false,
                    };
                    mutation({
                      variables: { input },
                    }).then(res => {
                      // ToastsStore.success(
                      //   "Your review will be listed once approved. Thankyou!",
                      //   5000
                      // );
                      show(
                        OverlayType.message,
                        OverlayTheme.modal,
                        reviewContextSuccess
                      );
                    });
                  }}
                  validationSchema={validationSchema}
                >
                  {({ setFieldValue, values }) => {
                    return (
                      <Form>
                        <div className="WriteAReviewContainer__body__rating">
                          <MyRating
                            isReadOnly={false}
                            name="rating"
                            handleChange={setFieldValue}
                          />
                        </div>
                        <div>
                          <StyledInput
                            name="name"
                            label="Name"
                            placeholder="Name"
                          />
                          <ErrorMessage
                            component={StyledErrorMessage}
                            name="name"
                          />
                        </div>
                        <div>
                          <StyledInput
                            name="review"
                            component="textarea"
                            label="review"
                            placeholder="Write a review"
                            rows={6}
                          />
                          <ErrorMessage
                            component={StyledErrorMessage}
                            name="review"
                          />
                        </div>

                        <div className="buttonWrapper">
                          <Button
                            testingContext="SubmitReview"
                            type="submit"
                            color="secondary"
                            // size="sm"
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
        </div>
      </div>
    </Overlay>
  );
};

export default WriteAReview;
