import React, { useEffect } from "react";
import * as S from "./styles";
// import "./scss/index.scss";

export const Tag: React.FC<{ credited?: boolean }> = ({ credited }) => {
  const color = credited ? "#1EAF6D" : "#B50000";
  const bgColor = credited ? "#D1FFD9" : "rgba(181, 0, 0, 0.1)";
  const text = credited ? "Credited" : "Debited";
  return (
    <S.TagContainer bgColor={bgColor}>
      <S.TagText color={color}>{text}</S.TagText>
    </S.TagContainer>
  );
};
export default Tag;
