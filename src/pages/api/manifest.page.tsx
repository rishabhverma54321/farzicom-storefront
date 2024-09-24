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
  const manifestData =
    getMetadataValue(
      shopMeta.data?.shopmeta?.edges[0]?.node?.metadata,
      "manifestData"
    ) || "";

  res.send(manifestData);
}
