import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import React, { useState } from "react";

const FaqSection: React.FC<{ faqData: any }> = ({ faqData }) => {
  const [faqExpanded, setFaqExpanded] = useState(false);
  return (
    <>
      {faqData && (
        <div className="faq-section container">
          <ProductHeader headerClass="df" heading="FAQs" />
          <FaqAccordian
            data={faqExpanded ? faqData : faqData.slice(0, 5)}
            accordianClass="accordian"
          />
          {faqData.length > 5 ? (
            <button
              style={{ margin: "12px auto" }}
              onClick={() => setFaqExpanded(prev => !prev)}
              className="view-more-plix-pdp"
            >
              {faqExpanded ? "View less" : "View more"}
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(FaqSection);
