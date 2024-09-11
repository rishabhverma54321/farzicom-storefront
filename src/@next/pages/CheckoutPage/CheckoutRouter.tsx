import React from "react";
import { Redirect } from "react-router";
// import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { useCheckoutStepState } from "@hooks/useCheckoutStepState";
import { useCheckoutStepFromPath } from "@hooks/useCheckoutStepFromPath";

import { IItems, ITotalPrice } from "@saleor/sdk/lib/api/Cart/types";
import { ICheckout, IPayment } from "@saleor/sdk/lib/api/Checkout/types";
import { CHECKOUT_STEPS } from "Themes/config";
import { useCustomLocation } from "@hooks/useCustomLocation";

interface IRouterProps {
  items?: IItems;
  checkout?: ICheckout;
  payment?: IPayment;
  totalPrice?: ITotalPrice;
  renderAddress: (props: any) => React.ReactNode;
  renderPayment: () => React.ReactNode;
}

const CheckoutRouter: React.FC<IRouterProps> = ({
  items,
  checkout,
  payment,
  totalPrice,
  renderAddress,
  renderPayment,
}: IRouterProps) => {
  const { pathname } = useCustomLocation();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );
  const stepFromPath = useCheckoutStepFromPath(pathname);

  const getStepLink = () =>
    CHECKOUT_STEPS.find(stepObj => stepObj.step === recommendedStep)?.link ||
    CHECKOUT_STEPS[0].link;

  if (
    pathname !== CHECKOUT_STEPS[1].link &&
    (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))
  ) {
    return <Redirect to={getStepLink()} />;
  }
  return <></>
  // return (
  //   <Switch>
  //     <Route path={CHECKOUT_STEPS[0].link} render={renderAddress} />
  //     <Route path={CHECKOUT_STEPS[1].link} render={renderPayment} />
  //     {/* <Route render={props => <Redirect {...props} to={getStepLink()} />} /> */}
  //   </Switch>
  // );
};

export { CheckoutRouter };
