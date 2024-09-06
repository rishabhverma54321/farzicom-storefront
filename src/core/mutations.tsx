import { ApolloError, MutationUpdaterFn } from "apollo-client";
import { DocumentNode } from "graphql";
import * as React from "react";
import { Mutation, MutationResult } from "react-apollo";

export interface TypedMutationInnerProps<TData, TVariables> {
  children: (
    mutateFn: any,
    result: MutationResult<TData>
  ) => React.ReactElement;
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  variables?: TVariables;
}
//@ts-ignore
export function TypedMutation<TData, TVariables>(
  mutation: DocumentNode,
  update?: MutationUpdaterFn<TData>
): React.FC<TypedMutationInnerProps<TData, TVariables>> {
  const Component: React.FC<TypedMutationInnerProps<TData, TVariables>> = (props) => {
    const { children, onCompleted, onError, variables } =
      props as JSX.LibraryManagedAttributes<typeof TypedMutation, typeof props>;
    return (
      <Mutation
        mutation={mutation}
        onCompleted={onCompleted}
        onError={onError}
        variables={variables}
        update={update}
      >
        {children}
      </Mutation>
    );
  };

  Component.displayName = "TypedMutation";
  return Component;
}
