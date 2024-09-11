import SearchIcon from "@components/atoms/CustomInput/Search";
import React, { useCallback, useState } from "react";
import * as S from "../styles";

export interface SearchProps {
  getSearchedData?: any;
  searchBy?: string;
}
const Search: React.FC<SearchProps> = ({ getSearchedData, searchBy }) => {
  const [searchString, setSearchString] = useState<string>("");
  const debounceFunction = (funct: any, delay: number) => {
    let timer: any;
    return (...rest: any) => {
      const self: any = this;
      const args = rest;
      clearTimeout(timer);
      timer = setTimeout(() => {
        funct.apply(self, args);
      }, delay);
    };
  };
  const debounceListOfItems = useCallback(
    debounceFunction((nextValue: string) => getSearchedData(nextValue), 500),
    []
  );
  const onInputChangeHandler = (e: any) => {
    const nextVal = e.target.value;
    setSearchString(nextVal);
    debounceListOfItems(nextVal);
  };
  return (
    <S.SearchBlock className="search-block">
      <S.SearchBar
        type="search"
        placeholder={`Search by ${searchBy}`}
        onChange={onInputChangeHandler}
        value={searchString}
      />
      <SearchIcon className="search-icon" />
    </S.SearchBlock>
  );
};

export default Search;
