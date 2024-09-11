import React from "react";

import { Button} from "@components/atoms/Button";
import { ButtonLink } from "@components/atoms/ButtonLink";import * as S from "./styles";
import { IButtonProps, IProps } from "./types";

const LoadingText = () => <>Loading</>;

const getBtnAction = (btn: IButtonProps) =>
  btn.action && { onClick: btn.action };

const renderCancelBtn = (cancelBtn?: IButtonProps) =>
  cancelBtn && (
    <ButtonLink
      {...getBtnAction(cancelBtn)}
      testingContext="cancelButton"
      type="button"
      color="secondary"
    >
      {cancelBtn.text}
    </ButtonLink>
  );

const renderSubmitBtn = (
  submitBtn: IButtonProps,
  disabled: boolean,
  formId?: string
) =>
  submitBtn && (
    <Button
      testingContext={submitBtn.testingContext}
      {...getBtnAction(submitBtn)}
      type={formId ? "submit" : "button"}
      form={formId}
      disabled={disabled}
      size="sm"
    >
      {disabled ? <LoadingText /> : submitBtn.text}
    </Button>
  );

export const FormFooter: React.FC<IProps> = ({
  cancelBtn,
  disabled = false,
  divider = false,
  formId,
  submitBtn,
  fixedposition
}: IProps) => {
  return (
    <S.Footer divider={divider} fixedposition={fixedposition}>
      {renderCancelBtn(cancelBtn)}
      {renderSubmitBtn(submitBtn, disabled, formId)}
    </S.Footer>
  );
};
