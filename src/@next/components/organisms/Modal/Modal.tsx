import React from "react";

import { CardHeader } from "@components/molecules/CardHeader";
import { FormFooter } from "@components/molecules/FormFooter";

import { Overlay } from "@components/organisms/Overlay";

import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      testingContext: "cancelButton",
      text,
    },
  };

const getSubmitBtnProps = (
  text: string,
  submitButtonTestingContext: string,
  action?: () => void
) => ({
  submitBtn: action
    ? {
        action,
        testingContext: submitButtonTestingContext,
        text,
      }
    : { testingContext: submitButtonTestingContext, text },
});

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  disabled,
  hide,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  submitButtonTestingContext,
  show,
  target,
  testingContext,
  title,
  fixedposition
}: IProps) => {

  return (
    <Overlay
      testingContext={testingContext}
      position="center"
      show={show}
      hide={hide}
      target={target}
      fixedposition={fixedposition}
    >
      <S.Modal fixedposition={fixedposition}>
        <CardHeader divider onHide={hide} fixedposition={fixedposition}>
          {title}
        </CardHeader>
        <S.Content fixedposition={fixedposition}>{children}</S.Content>
        <FormFooter
          divider
          disabled={disabled}
          {...getSubmitBtnProps(
            submitBtnText,
            submitButtonTestingContext,
            onSubmit
          )}
          {...getCancelBtnProps(hide, cancelBtnText)}
          formId={formId}
          fixedposition={fixedposition}
        />
      </S.Modal>
    </Overlay>
  );
};
