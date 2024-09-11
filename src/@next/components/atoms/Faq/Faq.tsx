import React from "react";
import * as S from "./style";

export interface IFaqProps {
  question: string;
  answer: string;
}

export const Faq: React.FC<IFaqProps> = ({ question, answer }) => {
  return (
    <>
      <S.Container>
        <S.Q>Q. {question} </S.Q>
        <S.A>A. {answer} </S.A>
      </S.Container>
    </>
  );
};
Faq.displayName = "Faq";
export default Faq;
