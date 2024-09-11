import AppFooter from "@components/templates/AppFooter";
import AppHeader from "@components/templates/AppHeader";
import { ShopMetaContext } from "@temp/pages/_app";

export default function Layout({ headerAndFooterData, shopMeta, extraFooterData, children }) {
  return (
    <>
      <ShopMetaContext.Provider
        value={shopMeta?.data.shopmeta.edges[0].node.metadata}
      >
        <AppHeader headerData={headerAndFooterData} />
        <main style={{ minHeight: "550px" }}>
          <>{children}</>
        </main>

        <AppFooter extraFooterData={extraFooterData} footerData={headerAndFooterData} />
      </ShopMetaContext.Provider>
    </>
  );
}
