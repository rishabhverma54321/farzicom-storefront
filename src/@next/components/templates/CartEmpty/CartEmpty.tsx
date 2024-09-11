import React from "react";
import { FormattedMessage } from "react-intl";

import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import { CLIENT } from "Themes/config";
import * as S from "./styles";
import { IProps } from "./types";

import { Container } from "../Container";

/**
 * Template for empty cart page.
 */
const CartEmpty: React.FC<IProps> = ({ button }: IProps) => {
  return (
    <Container>
      <S.Wrapper>
        <ClientCollectionHeading client={CLIENT} heading="Your Cart" />

        {/* <S.HR /> */}
        <S.Subtitle>
          <FormattedMessage defaultMessage="Your Shopping Cart is Empty" />
        </S.Subtitle>
        <S.ContinueButton>{button}</S.ContinueButton>
      </S.Wrapper>
    </Container>
  );
};

export { CartEmpty };
