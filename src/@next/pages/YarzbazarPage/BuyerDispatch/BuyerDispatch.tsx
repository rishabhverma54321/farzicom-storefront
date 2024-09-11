import { Loader } from "@components/atoms/Loader";
import { Orders } from "@components/organisms/Orders";
// import { useAuth, useAuthState } from "@saleor/sdk";
import React, { useState } from "react";
import { useDispatchContext } from "../Context/DispatchContext";
// import { useCustomHistory } from "@hooks/useCustomHistory";
import { TypeDispatchListQuery } from "../SupplierDispatch/queries";
import { LoaderScreen } from "../SupplierDispatch/styles";
import { getUserCompanyId } from "../utils/getUserDetails";

const BuyerDispatch: React.FC = () => {
  const companyId = getUserCompanyId();
  const [searchInput, setSearchInput] = useState<string>("");
  const { finalFilter } = useDispatchContext();
  const getSearchedDispatch = (val: string) => {
    setSearchInput(val);
  };
  return (
    <>
      <TypeDispatchListQuery
        variables={{
          after: null,
          userType: "BUYER",
          companyId,
          filter: {
            search: searchInput,
            ...finalFilter,
          },
        }}
      >
        {({ data, fetchMore, loading }) => {
          if (!data) {
            return (
              <LoaderScreen>
                <Loader />
              </LoaderScreen>
            );
          }
          return (
            <Orders
              loading={loading}
              getSearchedData={getSearchedDispatch}
              tablist={["overview", "documents", "payments"]}
              title="dispatches"
              dispatchData={data?.shipmentsB2B?.edges}
              typeColor="#F99F23"
              type="buyer"
              hasNext={data?.shipmentsB2B?.pageInfo.hasNextPage}
              loadMore={() => {
                fetchMore({
                  variables: {
                    after: data?.shipmentsB2B?.pageInfo.endCursor,
                  },
                  updateQuery: (
                    prevResult: any,
                    {
                      fetchMoreResult,
                    }: {
                      fetchMoreResult?: any | undefined;
                    }
                  ) => {
                    const result = {
                      ...fetchMoreResult,
                      shipmentsB2B: {
                        ...fetchMoreResult?.shipmentsB2B,
                        edges: [
                          ...prevResult?.shipmentsB2B?.edges,
                          ...fetchMoreResult?.shipmentsB2B?.edges,
                        ],
                      },
                    };
                    return { ...result };
                  },
                });
              }}
            />
          );
        }}
      </TypeDispatchListQuery>
    </>
  );
};

export default BuyerDispatch;
