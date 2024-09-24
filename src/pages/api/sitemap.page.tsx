import { client } from "@temp/clients";
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
  const shopMeta = await client.query({
    query: ShopMetaQuery,
    fetchPolicy: "no-cache",
  });
  const sitemap_data =
    getMetadataValue(
      shopMeta.data?.shopmeta?.edges[0]?.node?.metadata,
      "sitemap_data"
    ) || "";

  const external_sitemap_url =
    getMetadataValue(
      shopMeta.data?.shopmeta?.edges[0]?.node?.metadata,
      "external_sitemap_url"
    ) || "";
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    if (sitemap_data) {
      res.send(sitemap_data);
      return;
    }
    if (external_sitemap_url) {
      const response = await fetch(`${external_sitemap_url}`);
      const sitemap_text = await response.text();
      res.send(sitemap_text);
      return;
    }
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_CLIENT}api.farziengineer.co/sitemap.xml`
    );
    const text = await response.text();
    res.send(text);
  }
}
