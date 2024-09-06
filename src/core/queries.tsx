// import {
//   ContainerSkeleton,
//   IContainerSkeletonProps,
// } from "@components/molecules/ContainerSkeleton";
import ContainerSkeleton, {
  IContainerSkeletonProps,
} from "@components/molecules/ContainerSkeleton";
import { ApolloQueryResult, ErrorPolicy, FetchPolicy } from "apollo-client";
import { DocumentNode } from "graphql";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import Error from "@src/components/atoms/Error";
// import Loader from "../components/Loader";
import { RequireAtLeastOne } from "@src/utils/tsUtils";
import { maybe } from "./utils";

interface LoadMore<TData, TVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: RequireAtLeastOne<TVariables>
  ) => Promise<ApolloQueryResult<TData>>;
}

interface TypedQueryInnerProps<TData, TVariables> {
  children: (
    result: QueryResult<TData, TVariables> & LoadMore<TData, TVariables>
  ) => React.ReactNode;
  displayError?: boolean;
  displayLoader?: boolean;
  fetchPolicy?: FetchPolicy;
  loaderFull?: boolean;
  renderOnError?: boolean;
  skip?: boolean;
  variables?: TVariables;
  errorPolicy?: ErrorPolicy;
  alwaysRender?: boolean;
  onCompleted?: (data: TData) => void;
  containerSkeletonProps?: IContainerSkeletonProps;
}

export function TypedQuery<TData, TVariables>(query: DocumentNode) {
  // eslint-disable-next-line react/display-name
  return (props: TypedQueryInnerProps<TData, TVariables>) => {
    const {
      children,
      displayError = true,
      displayLoader = true,
      renderOnError = false,
      alwaysRender = false,
      fetchPolicy = "cache-and-network",
      errorPolicy,
      loaderFull,
      skip,
      variables,
      onCompleted,
      containerSkeletonProps,
    } = props as JSX.LibraryManagedAttributes<
      any,
      TypedQueryInnerProps<TData, TVariables>
    >;

    // const [width] = useWindowWidth();
    return (
      //@ts-ignore
      <Query
        query={query}
        variables={variables}
        skip={skip}
        fetchPolicy={fetchPolicy}
        errorPolicy={errorPolicy}
        onCompleted={onCompleted}
      >
        @ts-ignore
        {(
          queryData: QueryResult<TData, TVariables> &
            LoadMore<TData, TVariables>
        ) => {
          const { error, loading, data, fetchMore } = queryData;
          const hasData = maybe(() => !!Object.keys(data).length, false);
          const loadMore = (
            mergeFunc: (
              previousResults: TData,
              fetchMoreResult: TData
            ) => TData,
            extraVariables: RequireAtLeastOne<TVariables>
          ) =>
            fetchMore({
              query,
              updateQuery: (previousResults, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResults;
                }
                return mergeFunc(previousResults, fetchMoreResult);
              },
              variables: { ...variables, ...extraVariables },
            });

          if (displayError && error && !hasData) {
            return <Error error={error.message} />;
          }

          if (displayLoader && loading && !hasData) {
            return (
              <div className="container">
                <ContainerSkeleton
                  render={{
                    image: true,
                    title: false,
                    description: true,
                  }}
                  headerSkeleton={false}
                  cardCount={2}
                  {...containerSkeletonProps}
                />
              </div>
            );
          }

          if (hasData || (renderOnError && error) || alwaysRender) {
            return children({ ...queryData, loadMore });
          }

          return null;
        }}
      </Query>
    );
  };
}
