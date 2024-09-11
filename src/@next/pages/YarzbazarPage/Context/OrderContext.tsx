import React, { useContext, createContext, useState } from "react";

export interface IOrderContextProps {
  updateSort: (val: string) => void;
  updateOrderStatus: (val: string) => void;
  updateOrderQuality: (val: string) => void;
  orderFilterState: any;
  finalOrderSubmit: () => void;
  finalOrderFilter: any;
  orderClear: () => void;
}
export const OrderContext = createContext({} as IOrderContextProps);

const initialState = {
  sort: "",
  quality: "",
  status: "",
};
export const OrderProvider: React.FC = ({ children }) => {
  const [orderFilterState, setOrderFilterState] = useState<any>(initialState);
  const [finalOrderFilter, setFinalOrderFilter] = useState<any>({});
  const updateSort = (val: string) => {
    setOrderFilterState((prev: any) => ({ ...prev, sort: val }));
  };
  const updateOrderStatus = (val: string) => {
    setOrderFilterState((prev: any) => ({ ...prev, status: val }));
  };
  const updateOrderQuality = (val: string) => {
    setOrderFilterState((prev: any) => ({
      ...prev,
      quality: val,
    }));
  };
  const orderClear = () => {
    setOrderFilterState({
      sort: "",
      quality: "",
      status: "",
    });
    setFinalOrderFilter({
      quality: "",
      status: "",
    });
  };

  const finalOrderSubmit = () => {
    const { status, quality } = orderFilterState;
    setFinalOrderFilter({
      quality,
      status,
    });
  };
  return (
    <OrderContext.Provider
      value={{
        updateSort,
        updateOrderStatus,
        updateOrderQuality,
        orderFilterState,
        finalOrderSubmit,
        finalOrderFilter,
        orderClear,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => {
  return useContext(OrderContext);
};
