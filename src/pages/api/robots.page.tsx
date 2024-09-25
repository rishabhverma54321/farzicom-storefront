import { clientSSR } from "@temp/client";
import { ShopMetaQuery } from "@temp/gloablQueries/queries";
// import { getMetadataValue } from "@utils/misc";

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
  const robotData =
    getMetadataValue(
      shopMeta.data?.shopmeta?.edges[0]?.node?.metadata,
      "robotData"
    ) ||
    `User-agent: *
Allow: /`;

  res.send(robotData);
}
