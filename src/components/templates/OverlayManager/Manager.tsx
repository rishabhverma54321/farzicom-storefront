import * as React from "react";
import dynamic from "next/dynamic";
import { useIntl } from "react-intl";
import { Overlay, OverlayContext, OverlayType } from "..";
// import CouponListDropDown from "./CouponListDropDown";

// Regular Imports

// import { YarnSetting } from "./YarnSetting";
// import Cart from "./Cart";
// import { CartPage } from "./LotusCart/CartPage";
// import { CartPage as PlixCartPage } from "./PlixLifeFcCart/CartPage";
const PlixCartPage = dynamic(
  () =>
    import("./PlixLifeFcCart/CartPage").then(component => component.CartPage),
  {
    ssr: false,
  }
);
// import Login from "./Login";
// import MobileNav from "./MobileNav";
// import Modal from "./Modal";
// import Notification from "./Notification";
// import Password from "./Password";
// import Search from "./Search";
// import MobileNumberInput from "./MobileNumberInput";
// import OTPInput from "./OTPInput";
// import YoutubeVideoPlayer from "./YoutubeVideoPlayer";
// import WriteAReview from "./WriteAReview";
// import ViewMoreReview from "./ViewMoreReviews";
// import Subscribe from "./Subscribe";

// import IngredientOverlay from "./IngredientOverlay";
// import CouponCode from "./CouponCode";
// import CouponOffers from "./CouponOffers";
// import OutOfStock from "./OutOfStock";
// import YarnSideBar from "./YarnSideBar";

// import ImageNav from "./ImageNav";

// import PlixShopFilter from "./PlixShopFilter";
// import CardOverlay from "./CardOverlay";

// Dynamic Imports

// const PlixCartPage = dynamic(() =>
//   import("./PlixLifeFcCart/CartPage").then(component => component.CartPage)
// );
const MobileNav = dynamic(() => import("./MobileNav"), {
  ssr: false,
});
// const PlixShopFilter = dynamic(() => import("./PlixShopFilter"));

const OverlayManager: React.FC = () => {
  const intl = useIntl();
  return (
    <OverlayContext.Consumer>
      {overlay => {
        switch (overlay.type) {
          // case OverlayType.modal:
          //   const Modal = dynamic(() => import("./Modal"), {ssr:false});
          //   return <Modal testingContext="modal" overlay={overlay} />;

          case OverlayType.message:
            const Notification = dynamic(() => import("./Notification"), {ssr:false});
            return <Notification overlay={overlay} />;

          // case OverlayType.cart:
          //   const Cart = dynamic(() => import("./Cart"), {ssr:false});
            // return <Cart overlay={overlay} />;
          // case OverlayType.plixBottomFilter:
          //   return <PlixShopFilter overlay={overlay} />;

          // case OverlayType.lotusCart:
          //   const CartPage = dynamic(() =>
          //     import("./LotusCart/CartPage", {ssr:false}).then(
          //       component => component.CartPage
          //     )
          //   );
          //   return <CartPage overlay={overlay} />;

          case OverlayType.plixlifefcCart:
            return <PlixCartPage overlay={overlay} />;

          // case OverlayType.searchFiltersOverlay:
          //   const SearchFilter = dynamic(() => import("./SearchFilter"), {ssr:false});
          //   return <SearchFilter overlay={overlay} />;
          // case OverlayType.searchSortList:
          //   const SearchSortList = dynamic(() => import("./SearchSortList"), {ssr:false});
          //   return <SearchSortList overlay={overlay} />;

          // case OverlayType.search:
          //   const STSearch = dynamic(() => import("./STSearch"), {ssr:false});
          //   return <STSearch overlay={overlay} intl={intl} />;

          // case OverlayType.login:
          //   const Login = dynamic(() => import("./Login"), {ssr:false});
          //   return <Login overlay={overlay} />;

          // case OverlayType.register:
          //   return <Login overlay={overlay} active="register" />;

          // case OverlayType.password:
          //   const Password = dynamic(() => import("./Password"), {ssr:false});
          //   return <Password overlay={overlay} />;

          case OverlayType.sideNav:
            return <MobileNav overlay={overlay} />;

          // case OverlayType.imageNav:
          //   const ImageNav = dynamic(() => import("./ImageNav"), {ssr:false});
          //   return <ImageNav overlay={overlay} />;

          case OverlayType.mainMenuNav:
            return (
              <Overlay testingContext="mainMenuOverlay" context={overlay} />
            );

          // case OverlayType.ingredientDetails:
          //   const IngredientOverlay = dynamic(() =>
          //     import("./IngredientOverlay", {ssr:false})
          //   );
          //   return <IngredientOverlay overlay={overlay} />;

          // case OverlayType.mobileNumberInput:
          //   const MobileNumberInput = dynamic(() =>
          //     import("./MobileNumberInput", {ssr:false})
          //   );
          //   return (
          //     <MobileNumberInput
          //       testingContext="mobileNumberInput"
          //       overlay={overlay}
          //       buttonText="Get OTP"
          //     />
          //   );

          // case OverlayType.otpInput:
          //   const OTPInput = dynamic(() => import("./OTPInput"));
          //   return (
          //     <OTPInput
          //       testingContext="otpInput"
          //       overlay={overlay}
          //       buttonText="Verify OTP"
          //     />
          //   );

          // case OverlayType.youtubeVideoPlayer:
          //   const YoutubeVideoPlayer = dynamic(() =>
          //     import("./YoutubeVideoPlayer")
          //   );
          //   return (
          //     <YoutubeVideoPlayer
          //       testingContext="youtubeVideoPlayer"
          //       overlay={overlay}
          //     />
          //   );

          // case OverlayType.writeAReview:
          //   const WriteAReview = dynamic(() => import("./WriteAReview"));
          //   return (
          //     <WriteAReview overlay={overlay} testingContext="writeAReview" />
          //   );

          // case OverlayType.viewMoreReview:
          //   const ViewMoreReview = dynamic(() => import("./ViewMoreReviews"));
          //   return (
          //     <ViewMoreReview
          //       overlay={overlay}
          //       testingContext="viewMoreReviews"
          //     />
          //   );

          // case OverlayType.couponCode:
          //   const CouponCode = dynamic(() => import("./CouponCode"));
          //   return (
          //     <CouponCode overlay={overlay} testingContext="couponCodeModal" />
          //   );

          // case OverlayType.CouponOffers:
          //   const CouponOffers = dynamic(() => import("./CouponOffers"));
          //   return (
          //     <CouponOffers
          //       overlay={overlay}
          //       testingContext="couponCodeModal"
          //     />
          //   );

          // case OverlayType.outOfStock:
          //   const OutOfStock = dynamic(() => import("./OutOfStock"));
          //   return (
          //     <OutOfStock
          //       overlay={overlay}
          //       testingContext="outOfStock"
          //       buttonText="Notify Me"
          //     />
          //   );

          // case OverlayType.subscribe:
          //   const Subscribe = dynamic(() => import("./Subscribe"));
          //   return <Subscribe overlay={overlay} testingContext="subscribe" />;

          // case OverlayType.yarnSideBar:
          //   const YarnSideBar = dynamic(() => import("./YarnSideBar"));
          //   return (
          //     <YarnSideBar overlay={overlay} testingContext="yarnSideBar" />
          //   );

          // case OverlayType.yarnSetting:
          //   const YarnSetting = dynamic(() =>
          //     import("./YarnSetting").then(component => component.YarnSetting)
          //   );
          //   return (
          //     <YarnSetting overlay={overlay} testingContext="yarnSetting" />
          //   );

          // case OverlayType.cardOverlay:
          //   const CardOverlay = dynamic(() => import("./CardOverlay"));
          //   return (
          //     <CardOverlay overlay={overlay} testingContext="yarnSetting" />
          //   );
          // case OverlayType.couponList:
          //   return (
          //     <CouponListDropDown
          //       overlay={overlay}
          //       testingContext="couponList"
          //     />
          //   );

          default:
            return null;
        }
      }}
    </OverlayContext.Consumer>
  );
};

export default React.memo(OverlayManager);
