import { useCart, useCartState } from "@saleor/sdk";
import { useEffect, useState } from "react";

export const useItemInCart = (id: string): boolean => {
  const [itemAdded, setitemAdded] = useState<boolean>(false);

  const { items } = useCartState();

  useEffect(() => {
    const isItemInCart = items
      ?.map(item => {
        return item?.variant?.id;
      })
      .findIndex(element => element === id);

    if (isItemInCart === -1 || isItemInCart === undefined) setitemAdded(false);
    else if (isItemInCart >= 0) setitemAdded(true);
  });

  return itemAdded;
};
