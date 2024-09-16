import React, { useCallback, useEffect, useState } from "react";
import MemoSearchIconPlixNew2 from "@components/atoms/SvgIcons/SeachIconMobileNew";
import { Typewriter } from "react-simple-typewriter";
import styles from "./index.module.scss";

export interface ISearchSuggestionBarProps {
  searchterms: string[];
}

export const SearchSuggestionBar: React.FC<ISearchSuggestionBarProps> = ({
  searchterms,
}) => {
  return (
    <>
      {searchterms && Array.isArray(searchterms) && (
        <div className={styles.wrapper}>
          <MemoSearchIconPlixNew2 />
          <p>
            Search for
            <Typewriter
              words={searchterms}
              loop={false}
              cursor
              typeSpeed={120}
              deleteSpeed={120}
              delaySpeed={1000}
            />
          </p>
        </div>
      )}
    </>
  );
};
SearchSuggestionBar.displayName = "SearchSuggestionBar";
export default SearchSuggestionBar;
