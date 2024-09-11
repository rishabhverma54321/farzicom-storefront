import { withRouter } from "next/router";

export const customWithRouter = (component: any) => {
  const isNext = process.env.NEXT_PUBLIC_NEXT;
    return withRouter(component);
};
