import { useWishlist } from "@saleor/sdk";

interface Iprops {
  getItem: (id: string) => boolean;
  addItemInWishlist: (
    product: any,
    setAddedToWishlist: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  getAllItems: () => any;
  removeItemFromWishlist: (
    id: string,
    setAddedToWishlist: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

const WISHLIST_ITEMS = "wislist-items";

export const useItemInWishlist = (): Iprops => {
  //   const [itemAdded, setitemAdded] = useState<boolean>(false);
  const { items } = useWishlist();
  const getAllItems = () => {
    const itemsInWishlistStr = localStorage.getItem(WISHLIST_ITEMS);
    const itemsInWishlist = itemsInWishlistStr
      ? JSON.parse(itemsInWishlistStr)
      : [];
    return itemsInWishlist;
  };

  const getItem = (id: string): boolean => {
    const itemsInWishlist = items;
    //
    const isItemInCart = itemsInWishlist
      ?.map((item: any) => {
        //
        return item.id;
      })
      .findIndex((element: string) => element === id);
    //
    if (isItemInCart === -1 || isItemInCart === undefined) return false;
    if (isItemInCart >= 0) return true;

    return false;
  };

  const addItemInWishlist = (
    product: any,
    setAddedToWishlist: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const itemsInWishlist = getAllItems();
    itemsInWishlist.push(product);
    localStorage.setItem(WISHLIST_ITEMS, JSON.stringify(itemsInWishlist));
    setAddedToWishlist(true);
  };
  const filterItem = (item: any, id: string) => {
    return item.variants[0].id !== id;
  };
  const removeItemFromWishlist = (
    id: string,
    setAddedToWishlist: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let itemsInWishlist = getAllItems();
    itemsInWishlist = itemsInWishlist.filter((item: any) => {
      return filterItem(item, id);
    });
    localStorage.setItem(WISHLIST_ITEMS, JSON.stringify(itemsInWishlist));
    // debugger;
    setAddedToWishlist(false);
  };

  return { getItem, addItemInWishlist, getAllItems, removeItemFromWishlist };
};
