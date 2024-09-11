import React, { ReactNode } from "react";
import { Row } from "./styles";

export interface RowData {
  fieldName?: string | ReactNode;
  value: Array<string | ReactNode>;
  classForStyle?: string;
}
const UserInfoRow: React.FC<RowData> = ({
  fieldName,
  value,
  classForStyle,
}) => {
  return (
    <Row className={classForStyle}>
      {fieldName && <article className="row__leftside">{fieldName}</article>}
      <article className="row__rightside">
        {value.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </article>
    </Row>
  );
};

export default UserInfoRow;
