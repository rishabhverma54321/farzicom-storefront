import React from "react";
import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";
import { StyledInput } from "@components/atoms/StyledInput";

import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";
import { ErrorMessage, Form, Formik } from "formik";
// import CloseIcon from "@material-ui/icons/Close";
import * as Yup from "yup";
import { maybe } from "@utils/misc";
import { useAuth, useAuthState } from "@saleor/sdk";

// import { useAuth, useCheckout } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import { StyledErrorMessage } from "../WriteAReview";
// import makeClevertap from "Themes/lib/makeClevertap.js";
import { TypedNotifyMeMutation } from "./mutations";
import * as S from "./NotifyMe.styled";
import { Header } from "../WriteAReview/styles";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";

export interface IOutOfStockProps {
  buttonText: string;
  testingContext: string;
  overlay: OverlayContextInterface;
}

export const OutOfStock: React.FC<IOutOfStockProps> = ({
  buttonText,
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;
  const { user } = useAuthState();
  const userPhoneFormatted =
    user?.defaultBillingAddress?.phone &&
    user.defaultBillingAddress.phone.replace("+91", "");

  const delayedHide = () => {
    setTimeout(() => {
      hide();
    }, 3000);
  };

  const handleSubmit = (notifyMeFn, values) => {
    if (clevertapEvents.notifyMe.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.notifyMe.value, {
        platform: window.screen.width < 520 ? "msite" : "website",
        customerEmail: values.email,
        customerPhone: values.phone,
        productId: data,
      });
    }
    notifyMeFn({
      variables: {
        input: {
          productId: data,
          email: values.email,
          phone: values.phone,
          name: values.name,
        },
      },
      onCompleted: () => delayedHide(),
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(/^\d+$/, "This field must have only digits")
      .min(10, "This field must have at least 10 digits")
      .max(10, "This field must have only 10 digits"),
    name: Yup.string()
      .trim()
      .required("Required")
      .matches(/^[a-zA-Z ]*$/, "This field must have only alphabets and space")
      .min(3, "This field must have at least 3 characters")
      .max(32, "This field must have only 32 characters"),
  });

  return (
    <>
      <TypedNotifyMeMutation>
        {(notifyMeFn, { data, loading, error, called }) => {
          if (called && !loading) {
            delayedHide();
          }
          return (
            <Overlay testingContext={testingContext} context={overlay}>
              <S.Wrapper className="mobileLogin">
                {called && !loading ? (
                  <>
                    {!error ? (
                      <S.Content className="body success">
                        <h3>Submitted successfully</h3>
                      </S.Content>
                    ) : (
                      <S.Content className="body error">
                        <h3>Internal Server Error</h3>
                      </S.Content>
                    )}
                  </>
                ) : (
                  <>
                    <Header className="WriteAReviewContainer__header NotifyMe__header">
                      <div className="WriteAReviewContainer__header__text NotifyMe__header__text">
                        Hi, we shall inform you when it&apos;s back!
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
                    </Header>
                    <S.Content className="body">
                      <Formik
                        initialValues={{
                          email: maybe(
                            () =>
                              user?.metadata.find(i => i.key === "alt_email")
                                .value,
                            ""
                          ),
                          phone: userPhoneFormatted || "",
                          name:
                            user?.firstName &&
                            user?.firstName.toLowerCase() !== "dummy"
                              ? `${user.firstName} ${user.lastName}`
                              : "",
                        }}
                        onSubmit={values => handleSubmit(notifyMeFn, values)}
                        validationSchema={validationSchema}
                      >
                        {({ errors, values }) => {
                          return (
                            <Form>
                              <>
                                <StyledInput name="email" placeholder="Email" />
                                <ErrorMessage
                                  name="email"
                                  component={StyledErrorMessage}
                                />
                                <StyledInput
                                  name="phone"
                                  placeholder="Phone number"
                                  inputMode="tel"
                                />
                                <ErrorMessage
                                  name="phone"
                                  component={StyledErrorMessage}
                                />
                                <StyledInput
                                  name="name"
                                  placeholder="Your name"
                                />
                                <ErrorMessage
                                  name="name"
                                  component={StyledErrorMessage}
                                />
                              </>
                              <div className="buttonDiv">
                                <Button
                                  testingContext="Notify Me"
                                  disabled={
                                    Object.keys(errors).length > 0 ||
                                    Object.values(values).every(i => i === "")
                                  }
                                  size="sm"
                                  type="submit"
                                >
                                  {buttonText}
                                </Button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </S.Content>
                  </>
                )}
              </S.Wrapper>
            </Overlay>
          );
        }}
      </TypedNotifyMeMutation>
    </>
  );
};
OutOfStock.displayName = "OutOfStock";
export default OutOfStock;
