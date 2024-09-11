import { Loader } from "@components/atoms/Loader";
import { Orders } from "@components/organisms/Orders";
import React, { useState } from "react";
import { useOrderContext } from "../Context/OrderContext";
import { LoaderScreen } from "../SupplierDispatch/styles";
import { getUserCompanyId } from "../utils/getUserDetails";
import { TypeOrderListQuery } from "./queries";

const SupplierOrder: React.FC = () => {
  const companyId = getUserCompanyId();
  let endCursor: string | null | undefined;
  let hasNext: boolean | undefined | null;
  const [searchInput, setSearchInput] = useState<string>("");
  const { finalOrderFilter } = useOrderContext();
  const getSearchedDispatch = (val: string) => {
    setSearchInput(val);
  };
  return (
    <>
      <TypeOrderListQuery
        variables={{
          userType: "SUPPLIER",
          companyId,
          after: null,
          filter: {
            search: searchInput,
            ...finalOrderFilter,
          },
        }}
      >
        {({ data, loading, fetchMore }) => {
          if (!data) {
            return (
              <LoaderScreen>
                <Loader />
              </LoaderScreen>
            );
          }
          if (data?.ordersb2b) {
            const { ordersb2b } = data;
            endCursor = ordersb2b[ordersb2b?.length - 1]?.pageInfo?.endCursor;
            hasNext = ordersb2b[ordersb2b?.length - 1]?.pageInfo?.hasNextPage;
          }
          const filteredData = data?.ordersb2b?.filter(
            (item: any) => item?.order?.lines?.length !== 0
          );
          return (
            <Orders
              loading={loading}
              getSearchedData={getSearchedDispatch}
              tablist={["overview"]}
              title="orders"
              ordersData={filteredData}
              typeColor="#A33A34"
              hasNext={hasNext}
              loadMore={() => {
                fetchMore({
                  variables: {
                    after: endCursor,
                  },
                  updateQuery: (
                    prevResult: any,
                    { fetchMoreResult }: { fetchMoreResult?: any | undefined }
                  ) => {
                    const result = {
                      ...prevResult,
                      ordersb2b: [
                        ...prevResult.ordersb2b,
                        ...fetchMoreResult.ordersb2b,
                      ],
                    };
                    return result;
                  },
                });
              }}
              type="supplier"
            />
          );
        }}
      </TypeOrderListQuery>
    </>
  );
};

export default SupplierOrder;
