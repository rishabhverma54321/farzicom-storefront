import React, { ReactNode } from "react";
import DocRow from "../PaymentCard/UserInfoRow";
import * as S from "./style";
import { addDocuments } from "./util";

export interface IDocumentsSectionProps {
  documents: Array<ReactNode>;
  documentField?: any;
}

export const DocumentsSection: React.FC<IDocumentsSectionProps> = ({
  documents,
  documentField,
}) => {
  let finalDoc;
  if (documents) {
    finalDoc = addDocuments(documentField, documents[documents.length - 1]);
  }
  const redirectToNewTab = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <S.Container>
      {/* <DocRow /> */}
      {/* <S.Heading>Documents</S.Heading> */}
      <S.LowerContent>
        {finalDoc?.map((doc: any, idx: number) => {
          if (doc.link) {
            return (
              <div
                className="dispatch-doc"
                key={idx}
                onClick={() => redirectToNewTab(doc.link)}
                // style={{}}
              >
                <DocRow
                  fieldName={doc.leftField}
                  value={doc.rightField}
                  classForStyle="dispatch-doc__row"
                />
              </div>
            );
          }
        })}
      </S.LowerContent>
    </S.Container>
  );
};
DocumentsSection.displayName = "DocumentsSection";
export default DocumentsSection;
