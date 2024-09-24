import { clientSSR } from "@temp/clients";
// import { getMetadataValue } from "@utils/misc";
import { ShopMetaQuery } from "../queries";

function getMetadataValue<T>(
  metadata: any,
  key: string,
  alternateValue?: string | number
): string | null {
  if (metadata) {
    const metaValue = Array.isArray(metadata)
      ? metadata?.filter((meta: { key: string }) => meta?.key === key)[0]?.value
      : [];
    if (!metaValue && alternateValue !== undefined && alternateValue !== null)
      return alternateValue.toString();
    return metaValue;
  }
  return null;
}

export default async function handler(req, res) {
  const shopMeta = await clientSSR.query({
    query: ShopMetaQuery,
    fetchPolicy: "no-cache",
  });

  const image_sitemap_url =
    getMetadataValue(
      shopMeta.data?.shopmeta?.edges[0]?.node?.metadata,
      "image_sitemap_url"
    ) || "";
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    if (image_sitemap_url) {
      const response = await fetch(`${image_sitemap_url}`);
      const sitemap_text = await response.text();
      res.send(sitemap_text);
      return;
    }
    res.status(404).send({ error: "Resource not found" });
  }
}
