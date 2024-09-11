import React, { useContext, createContext, useState } from "react";

export interface IDispatchContextProps {
  updateSort: (val: string) => void;
  updateStatus: (val: string) => void;
  updateQuality: (val: string) => void;
  dispatchFilterState: any;
  finalSubmit: () => void;
  finalFilter: any;
  clear: () => void;
}
export const DispatchContext = createContext({} as IDispatchContextProps);

const initialState = {
  sort: "",
  quality: "",
  status: "",
};
export const DispatchProvider: React.FC = ({ children }) => {
  const [dispatchFilterState, setDispatchFilterState] = useState<any>(
    initialState
  );
  const [finalFilter, setFinalFilter] = useState<any>({});
  const updateSort = (val: string) => {
    setDispatchFilterState((prev: any) => ({ ...prev, sort: val }));
  };
  const updateStatus = (val: string) => {
    setDispatchFilterState((prev: any) => ({ ...prev, status: val }));
  };
  const updateQuality = (val: string) => {
    setDispatchFilterState((prev: any) => ({
      ...prev,
      quality: val,
    }));
  };
  const clear = () => {
    setDispatchFilterState({
      sort: "",
      quality: "",
      status: "",
    });
    setFinalFilter({
      quality: "",
      status: "",
    });
  };

  const finalSubmit = () => {
    const { status, quality } = dispatchFilterState;
    setFinalFilter({
      quality,
      status,
    });
  };
  return (
    <DispatchContext.Provider
      value={{
        updateSort,
        updateStatus,
        updateQuality,
        dispatchFilterState,
        finalSubmit,
        finalFilter,
        clear,
      }}
    >
      {children}
    </DispatchContext.Provider>
  );
};
export const useDispatchContext = () => {
  return useContext(DispatchContext);
};
