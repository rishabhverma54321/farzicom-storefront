export const constructFaqSchema = faqs => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs?.map(faq => [
      {
        "@type": "Question",
        name: faq?.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq?.a,
        },
      },
    ]),
  };

  return JSON.stringify(faqSchema);
};
