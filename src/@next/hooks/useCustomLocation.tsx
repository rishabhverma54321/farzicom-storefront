import { useRouter } from "next/router";

export const useCustomLocation = (): any => {
    const router = useRouter();

    return {
      ...router,
      state: router.query,
      search:
        router.asPath.indexOf("?") !== -1
          ? router.asPath.substr(router.asPath.indexOf("?"))
          : "",
    };
};
