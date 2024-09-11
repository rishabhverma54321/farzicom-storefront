import { getMetadataValue } from "@utils/misc";

const getVariantsStructuredData = variants => {
  const inStock = "https://schema.org/InStock";
  const outOfStock = "https://schema.org/OutOfStock";
  return variants.map(variant => ({
    "@type": "Offer",
    availability: variant.isAvailable ? inStock : outOfStock,
    itemCondition: "https://schema.org/NewCondition",
    price: variant.pricing.price.gross.amount.toFixed(2),
    priceCurrency: variant.pricing.price.gross.currency,
    sku: variant.sku,
  }));
};

export const structuredData = (product, reviews) => {
  const images = product.images.map(image => new URL(image.url).pathname);
  const { variants, metadata } = product;
  const avg_rating =
    metadata &&
    getMetadataValue(metadata, "average_rating") &&
    parseFloat(getMetadataValue(metadata, "average_rating"));
  const total_rating = metadata && getMetadataValue(metadata, "total_rating");

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    description: !product.seoDescription
      ? `${product.description}`
      : `${product.seoDescription}`,
    brand: {
      "@type": "Brand",
      name: "Plix",
    },
    image: images,
    name: `${product.name}`,
    offers: getVariantsStructuredData(variants),
    url: typeof window !== "undefined" ? window.location?.href : "",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        avg_rating && typeof avg_rating === "number"
          ? avg_rating.toFixed(2)
          : null,
      ratingCount: total_rating,
    },
    review:
      Array.isArray(reviews) &&
      reviews?.map(review => ({
        "@type": "Review",
        author: review?.node?.userName,
        datePublished: new Date(review?.node?.created).toLocaleDateString(),
        reviewBody: review?.node?.review,
        name: review?.node?.title,
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: review?.node?.rating,
          worstRating: "1",
        },
      })),
  });
};
