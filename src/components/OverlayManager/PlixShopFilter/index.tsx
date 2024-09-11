import React, { useEffect, useState } from "react";
import { Overlay, OverlayContextInterface } from "@temp/components";
import Media from "react-media";
import { CheckBoxItemList } from "@components/molecules/CheckBoxItemList";
import { RadioItemList } from "@components/molecules/RadioItemList";

import { largeScreen } from "@styles/constants";
import ReactSVG from "react-svg";
import CloseButton from "./assets/CircularCloseButton.svg";
import * as S from "./style";
import { useRouter } from "next/router";
import { generateCollectionUrl } from "@temp/core/utils";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { customEventTrigger } from "@utils/misc";
import { useAuthState } from "@saleor/sdk";

interface IPlixShopFilterProps {
  overlay: OverlayContextInterface;
}

export const PlixShopFilter: React.FC<IPlixShopFilterProps> = ({ overlay }) => {
  const {
    onApply,
    productTypeData,
    collectionData,
    onClear,
    activeFilters,
    data,
    makeLink,
  } = overlay.context.data;

  const { user } = useAuthState();
  //   Filter states

  const [currentCollection, setCurrentCollection] = useState(
    activeFilters.collection
  );

  const [nextCollectionLink, setnextCollectionLink] = useState("");

  // const [currentCollection, setCurrentCollection] = useState<{
  //   id: string;
  //   name: string;
  // }>(activeFilters.collection);
  const [currentProdTypes, setCurrentProdTypes] = useState<
    { id: string; name: string }[]
  >(activeFilters.prodTypes);

  const getCollectionsData = (collections: any[]): any[] => {
    return collections.map((collection: { id: string }) => ({
      ...collection,
      isChecked: !!(collection.id == currentCollection.id),
    }));
  };
  const handleProdTypeChange = (content: {
    id: string;
    checked: boolean;
    name: string;
  }) => {
    if (content.checked) {
      setCurrentProdTypes([
        ...currentProdTypes,
        { id: content.id, name: content.name },
      ]);
      return;
    }
    setCurrentProdTypes(
      currentProdTypes.filter(product => product.id !== content.id)
    );
  };

  const getProductTypeData = (prodTypes: any[]) => {
    // const prodTypes = data?.productTypes?.edges?.map(
    //   (content: { node: {} }) => content.node
    // );
    return prodTypes?.map(prodType => ({
      ...prodType,
      checked: !!currentProdTypes.find(product => product.id == prodType.id),
    }));
  };

  const handleCollectionChange = (id: string, name: string) => {
    const currentProdTypesIds = currentProdTypes.map(prodType => prodType.id);
    if (makeLink) {
      setCurrentCollection({
        id,
        name,
      });
      setnextCollectionLink(generateCollectionUrl(id, name));
    } else {
      setCurrentCollection({
        id,
        name,
        products: currentProdTypesIds.length
          ? data.collectionDataArray
              .filter(collectionData => collectionData.id === id)[0]
              .data.products.edges?.filter(edge =>
                currentProdTypesIds.includes(edge.node.productType.id)
              )
          : data.collectionDataArray.filter(
              collectionData => collectionData.id === id
            )[0].data.products.edges,
      });
    }
  };

  const router = useRouter();
  const isPLP = router.pathname == "/page/shop";
  return (
    <Overlay testingContext="test" context={overlay}>
      <Media
        query={{ maxWidth: largeScreen }}
        render={() => (
          <S.Wrapper>
            <S.CloseButtonWrapper>
              {/* <ReactSVG path={CloseButton} onClick={() => overlay.hide()} /> */}
            </S.CloseButtonWrapper>
            <S.ContentWrapper>
              <S.FilterWrapper>
                <div>
                  <S.SubHeader size="16px" lineHeight="24px">
                    Filter By
                  </S.SubHeader>
                  {isPLP ? (
                    <>
                      <S.Divider width="100%" />
                      <RadioItemList
                        header="Select concern"
                        headerClass="__textGray"
                        contents={getCollectionsData(collectionData)}
                        onCollectionChange={handleCollectionChange}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <S.Divider width="100%" />
                  <CheckBoxItemList
                    header="Select product type"
                    headerClass="__textGray plix-collection-checkbox"
                    onProdTypeChange={handleProdTypeChange}
                    contents={getProductTypeData(productTypeData)}
                  />
                </div>
              </S.FilterWrapper>
              <S.ButtonContainer>
                <button onClick={() => onClear()}>Clear All</button>
                <button
                  onClick={() => {
                    // if (makeLink) {
                    //   router.push(nextCollectionLink);
                    // } else {
                    //   onApply(currentCollection, currentProdTypes);
                    // }
                    onApply(currentCollection, currentProdTypes);
                  }}
                >
                  Apply
                </button>
              </S.ButtonContainer>
            </S.ContentWrapper>
          </S.Wrapper>
        )}
      />
    </Overlay>
  );
};

PlixShopFilter.displayName = "PlixShopFilter";
export default PlixShopFilter;
