import { Loader } from "@components/atoms/Loader";
import { Orders } from "@components/organisms/Orders";
import React, { useState } from "react";
import { useDispatchContext } from "../Context/DispatchContext";
import { getUserCompanyId } from "../utils/getUserDetails";
import { TypeDispatchListQuery } from "./queries";
import { LoaderScreen } from "./styles";

const SupplierDispatch: React.FC = () => {
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
          userType: "SUPPLIER",
          companyId,
          filter: {
            search: searchInput,
            ...finalFilter,
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
          return (
            <Orders
              loading={loading}
              getSearchedData={getSearchedDispatch}
              tablist={["overview", "documents", "payments"]}
              title="dispatches"
              dispatchData={data?.shipmentsB2B?.edges}
              typeColor="#A33A34"
              type="supplier"
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

export default SupplierDispatch;
