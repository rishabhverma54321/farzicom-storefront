// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import classNames from "classnames";
import { stringify } from "query-string";
import * as React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
} from "react-intl";

import { commonMessages } from "@temp/intl";
import { Loader } from "@components/atoms/Loader";
import { Button } from "@components/atoms/Button";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import CloseOverlay from "@components/atoms/SvgIcons/CloseOverlay";
import { customWithRouter } from "@hooks/customWithRouter";
import MyCustomLink from "@components/next-react/MyCustomLink";
import SearchClient from "@searchtap/search-client";
import { SEARCHTAP_CONFIG as config } from "Themes/config";
import MemoX from "images/X";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { getMetadataValue, parseJson } from "@utils/misc";
import {
  OfflinePlaceholder,
  Overlay,
  OverlayContextInterface,
  OverlayType,
} from "../..";
import { searchUrl } from "../../../app/routes";
import { maybe } from "../../../core/utils";
import { DebouncedTextField } from "../../Debounce";
import { Error } from "../../Error";
import NetworkStatus from "../../NetworkStatus";
import { SearchResults } from "./gqlTypes/SearchResults";
import NothingFound from "./NothingFound";
import ResultList from "./ResultList";

interface SearchProps extends WrappedComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
}

const STSearch: React.FC = ({ overlay }) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const searchTapClient = new SearchClient(config.appID, config.readToken);
  React.useEffect(() => {
    if (search.length && overlay.type !== OverlayType.search) {
      setSearch("");
    }
  }, []);

  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const st_collection_id =
    (ShopMetaContextValue &&
      getMetadataValue(ShopMetaContextValue, "searchtap_collection_id") &&
      parseJson(
        getMetadataValue(ShopMetaContextValue, "searchtap_collection_id")
      )) ||
    config.collectionID;

  React.useEffect(() => {
    setLoading(true);
    searchTapClient
      .search(search, st_collection_id)
      .then(res => {
        if (res && Array.isArray(res.results)) {
          setResults(res.results);
        }
      })
      .catch(err => {
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  function hasSearchPhrase() {
    return search.length > 0;
  }

  function searchQs() {
    return stringify({ searchtext: search });
  }

  const handleInputBlur = () => {
    if (!hasSearchPhrase()) {
      overlay.hide();
    }
  };

  return (
    <Overlay
      testingContext="searchOverlay"
      context={overlay}
      className="overlayFarzicom--no-background"
    >
      <form
        className={classNames("search", {
          "search--has-results": hasSearchPhrase(),
        })}
        onClick={e => e.stopPropagation()}
        // onSubmit={this.handleSubmit}
      >
        <div className="search__input">
          <DebouncedTextField
            onChange={evt => {
              setSearch(evt.target.value);
              if (clevertapEvents.search.enable) {
                const clevertap = makeClevertap();
                //
                clevertap.event.push(clevertapEvents.search.value, {
                  Keyword: evt.target.value as string,
                });
              }
              if (gtmConfig.search.enable) {
                if (window.dataLayer) {
                  window.dataLayer.push({ ecommerce: null });
                }
                // console.log("window.dataLayer", window.dataLayer || []);
                (window.dataLayer = window.dataLayer || []).push({
                  event: gtmConfig.search.value,
                  ecommerce: {
                    Search: {
                      Keyword: evt.target.value as string,
                    },
                  },
                });
              }
            }}
            value={search}
            iconLeft={
              <MemoX onClick={overlay.hide} />
              // <ReactSVG
              //   path={closeImg}
              //   onClick={this.props.overlay.hide}
              //   className="search__input__close-btn"
              // />
            }
            autoFocus
            placeholder="Search"
            onBlur={handleInputBlur}
          />
        </div>
        <div
          className={classNames({
            search__products: true,
            "search__products--expanded": hasSearchPhrase(),
          })}
        >
          <NetworkStatus>
            {isOnline => {
              if (hasSearchPhrase()) {
                if (isOnline) {
                  if (results && Array.isArray(results) && results.length) {
                    return (
                      <>
                        <ResultList data={results} hideFunc={overlay.hide} />
                        <div className="search__products__footer">
                          {loading ? (
                            <Loader />
                          ) : (
                            <MyCustomLink href={`/search-new?${searchQs()}`}>
                              <Button
                                testingContext="searchProductsButton"
                                // btnRef={this.submitBtnRef}
                                type="button"
                                color="secondary"
                                onClick={() => {
                                  overlay.hide();
                                }}
                              >
                                <FormattedMessage defaultMessage="Show all results" />
                              </Button>
                            </MyCustomLink>
                          )}
                        </div>
                      </>
                    );
                  }
                  return <NothingFound search={search} />;
                }
                return <OfflinePlaceholder />;
              }
              return null;
            }}
          </NetworkStatus>
        </div>
      </form>
    </Overlay>
  );
};

export default STSearch;

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
// export default (
//   props: WrappedComponentProps & { overlay: OverlayContextInterface }
// ) => <Search {...props} />;
