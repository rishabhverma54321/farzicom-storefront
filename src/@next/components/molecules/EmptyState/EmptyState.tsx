import { Button } from "@components/atoms/Button";
import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./styles";

export interface IEmptyStateProps {
  text: string;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({ text }) => {
  return (
    <>
      <S.EmptyStateContainer>
        <S.NoUser>{text}</S.NoUser>
        <MyCustomLink href="/">
          <Button size="sm" testingContext="continueSHopping">
            {" "}
            Continue Shopping{" "}
          </Button>
        </MyCustomLink>
      </S.EmptyStateContainer>
    </>
  );
};
EmptyState.displayName = "EmptyState";
export default EmptyState;
