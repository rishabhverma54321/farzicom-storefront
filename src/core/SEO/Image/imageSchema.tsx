import Head from "next/head";
export const ConstructImageSchema = ({data}) => {
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      author: data?.author,
      contentUrl: data?.url || "",
      datePublished: "",
      description: "",
      name: data?.name || "",
    };

    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      </Head>
    );
}