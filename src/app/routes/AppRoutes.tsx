import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { CartPage, CheckoutPage, PasswordReset, ThankYouPage } from "@pages";
import { MyOrderDetails } from "@components/organisms/MyOrderDetails";
import { Loader } from "@components/atoms/Loader";
// import { Account, AccountConfirm } from "Themes/views/Account";
import OrderDetailPage from "@components/molecules/OrderDetail/OrderDetailPage";
import { OrderDetails } from "@temp/userAccount/views";
import ProductRedirectPage from "@components/templates/ProductRedirectPage";
// import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";

import * as paths from "./paths";
import RecipeDetails from "../../@next/components/organisms/RecipeDetails";
import CheckoutLogin from "@temp/components/CheckoutLogin";
import NotFound from "@temp/components/NotFound";

const HomePage = lazy(() => import("Themes/views/Home/View"));
const SearchPage = lazy(() => import("Themes/views/Search/View"));
const ProductPage = lazy(() => import("Themes/views/Product/View"));
const CollectionPage = lazy(() => import("Themes/views/Collection/View"));
const CategoryPage = lazy(() => import("Themes/views/Category/View"));
const ArticlePage = lazy(() => import("Themes/views/Article/View"));
// const Account = lazy(() => import("Themes/views/Account/Account"));
const AccountConfirm = lazy(() =>
  import("Themes/views/Account/AccountConfirm")
);

export const Routes: React.FC = () => (
  <div
    style={{
      minHeight: 700,
    }}
  >
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={paths.baseUrl} component={HomePage} />
        <Route path={paths.searchUrl} component={SearchPage} />
        <Route path={paths.categoryUrl} component={CategoryPage} />
        <Route path={paths.collectionUrl} component={CollectionPage} />
        <Route path={paths.productUrl} component={ProductPage} />
        <Route
          path={paths.productRedirectUrl}
          component={ProductRedirectPage}
        />
        <Route
          path={paths.productsRedirectUrl}
          component={ProductRedirectPage}
        />
        <Route path={paths.pageRedirectUrl} component={ProductRedirectPage} />
        <Route
          path={paths.collectionRedirectUrl}
          component={ProductRedirectPage}
        />
        <Route
          path={paths.collectionsRedirectUrl}
          component={ProductRedirectPage}
        />
        <Route path={paths.cartUrl} component={CartPage} />
        <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
        <Route path={paths.pageUrl} component={ArticlePage} exact />
        <Route path={accountPaths.baseUrl} component={UserAccount} />
        <Route
          path={accountPaths.userOrderDetailsUrl}
          component={OrderDetails}
        />
        {/* <Route path={paths.guestOrderDetailsUrl} component={OrderDetails} /> */}
        {/* <Route path={paths.accountUrl} component={Account} /> */}
        <Route path={paths.accountConfirmUrl} component={AccountConfirm} />
        {/* <Route path={paths.orderHistoryUrl} component={Account} exact />
        <Route path={paths.addressBookUrl} component={Account} />
        <Route path={paths.orderHistoryUrlWithAccount} component={Account} /> */}
        <Route path={paths.passwordResetUrl} component={PasswordReset} />
        <Route path={paths.checkoutUrl} component={CheckoutPage} />
        <Route path={paths.orderFinalizedUrl} component={ThankYouPage} />
        <Route path={paths.orderDetails} component={MyOrderDetails} />
        <Route
          path={paths.supplierDispatchDetails}
          component={OrderDetailPage}
        />
        <Route path={paths.buyerDispatchDetails} component={OrderDetailPage} />
        <Route path={paths.supplierOrderDetails} component={OrderDetailPage} />
        <Route path={paths.buyerOrderDetails} component={OrderDetailPage} />
        <Route path={paths.recipeDetails} component={RecipeDetails} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </div>
);

export default Routes;
