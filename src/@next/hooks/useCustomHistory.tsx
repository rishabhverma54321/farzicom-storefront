import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { History } from "history";

export interface CustomNextRouter extends NextRouter {
  state: ParsedUrlQuery;
  goBack: () => void;
}
export type IUseCustomHistory = CustomNextRouter;

export const useCustomHistory = () => {
    const router = useRouter();
    const returnObject = {
      ...router,
      state: router.query,
      goBack: router.back,
    };
    return returnObject;
};
