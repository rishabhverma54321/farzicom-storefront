import React, { useContext, useEffect, useState } from "react";
import { useAuthState, useWishlist } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import ReactSVG from "react-svg";
import Heart from "images/lotus/heart.svg";
import HeartFill from "images/lotus/heartFill.svg";
import { IconButton } from "@components/atoms/IconButton";
import { CLIENT } from "Themes/config";
import * as S from "./style";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import { useRouter } from "next/router";

export interface IWishlistProps {
  id: string;
  setLoading: Function;
  isWishlist?: boolean;
  heart?: string;
  heartFill?: string;
  className?: string;
  onSubmit?: () => void;
}

export const Wishlist: React.FC<IWishlistProps> = ({
  id,
  setLoading,
  isWishlist,
  heart,
  heartFill,
  className,
  onSubmit,
}) => {
  const router = useRouter();
  const {
    items: wishlistItems,
    addItemInWishlist,
    removeItemInWishlist,
  } = useWishlist();
  const { user } = useAuthState();
  const overlay = useContext(OverlayContext);
  const { show } = overlay;

  const getItem = (id: string): boolean => {
    const itemsInWishlist = wishlistItems;
    //
    const isItemInCart = itemsInWishlist
      ?.map((item: any) => {
        return item.id;
      })
      .findIndex((element: string) => element === id);
    if (isItemInCart === -1 || isItemInCart === undefined) return false;
    if (isItemInCart >= 0) return true;

    return false;
  };
  const [addedToWishlist, setaddedToWishlist] = useState(getItem(id));
  useEffect(() => {
    //
    const isPresent = getItem(id);
    setaddedToWishlist(prev => {
      if (prev !== isPresent) {
        return isPresent;
      }
      return prev;
    });
  }, [wishlistItems]);
  const handleAddToWishlist = (e: any) => {
    // //
    e.preventDefault();
    if (!user) {
      if (CLIENT === clients.DRINKSWA2) {
        router.push({
          pathname: "/page/login",
          // state: { url: router.asPath },
        });
      } else {
        show(OverlayType.mobileNumberInput, OverlayTheme.modal);
      }
    } else if (addedToWishlist) {
      setLoading(true);
      removeItemInWishlist(id).then(() => {
        setLoading(false);
      });
      setaddedToWishlist(prev => !prev);
    } else {
      setLoading(true);

      setaddedToWishlist(prev => !prev);

      addItemInWishlist(id).then(() => {
        setLoading(false);
      });
      if (onSubmit) {
        onSubmit();
      }
    }
  };
  return (
    <>
      <S.WishlistWrapper onClick={handleAddToWishlist} className={className}>
        {!addedToWishlist && !isWishlist ? (
          <ReactSVG path={heart || Heart} />
        ) : (
          // <Icon name="heart" size={64} />
          <>
            {isWishlist ? (
              <>
                {" "}
                <IconButton
                  testingContext="removeButton"
                  testingContextId={id}
                  size={22}
                  name="trash"
                  // onClick={onRemove}
                />{" "}
              </>
            ) : (
              <ReactSVG path={heartFill || HeartFill} />
            )}{" "}
          </>
        )}
      </S.WishlistWrapper>
    </>
  );
};
Wishlist.displayName = "Wishlist";
export default Wishlist;
