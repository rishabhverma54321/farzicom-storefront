import { useAuth, useWishlist } from "@saleor/sdk";
import React, { useContext, useEffect, useState } from "react";
import {
  // InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import Heart from "images/lotus/heart.svg";
import HeartFill from "images/lotus/heartFill.svg";

import { IconButton } from "@components/atoms/IconButton";
import ReactSVG from "react-svg";
import * as S from "./style";

export interface IAddWishlistProps {
  id: string;
  isWishlist?: boolean;
  hideWishlist?: boolean;
  heart?: string;
  heartFill?: string;
}

export const AddWishlist: React.FC<IAddWishlistProps> = ({
  id,
  isWishlist = false,
  hideWishlist = false,
  heart,
  heartFill,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    items: wishlistItems,
    addItemInWishlist,
    removeItemInWishlist,
  } = useWishlist();

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

  const handleAddToWishlist = (e: any) => {
    e.preventDefault();
    if (!user) {
      show(OverlayType.mobileNumberInput, OverlayTheme.modal);
    } else if (addedToWishlist) {
      setLoading(true);
      removeItemInWishlist(id).then(() => {
        setLoading(false);
      });
      setaddedToWishlist(prev => !prev);
    } else {
      setLoading(true);

      setaddedToWishlist(prev => !prev);

      addItemInWishlist(id).then(res => {
        setLoading(false);
      });

      // recordClevertap();
    }
  };
  if (hideWishlist) return <> </>;
  return (
    <>
      <S.CardWishlist onClick={handleAddToWishlist} loading={loading}>
        {!addedToWishlist && !isWishlist ? (
          <ReactSVG path={heart || Heart} />
        ) : (
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
      </S.CardWishlist>
    </>
  );
};
AddWishlist.displayName = "AddWishlist";
export default AddWishlist;
