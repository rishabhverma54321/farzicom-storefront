import React from "react";

function ResultSection({
  item,
  selectCompanyFun,
  undoResultFun,
  setCompanyId,
}: {
  item: any;
  selectCompanyFun: any;
  undoResultFun: any;
  setCompanyId: any;
}) {
  const handleSelect = (e: any) => {
    const companySelected = e.target.innerHTML;
    selectCompanyFun(companySelected);
    setCompanyId(item.id);
    undoResultFun([]);
  };
  return <p onClick={handleSelect}>{item.companyName}</p>;
}

export default ResultSection;
