import React from "react";

import { Input } from "@components/atoms/Input";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

import * as S from "./styles";
import { IProps } from "./types";

export const TextField: React.FC<IProps> = ({
  errors,
  helpText,
  ...rest
}: IProps) => {
  const hasErrors = !!(errors && errors.length);

  return (
    <>
      <S.TextField>
        <Input {...rest} error={hasErrors} />
        <S.ErrorMessages>
          <ErrorMessage errors={errors} />
          {helpText && <S.HelpText>{helpText}</S.HelpText>}
        </S.ErrorMessages>
      </S.TextField>
    </>
  );
};
