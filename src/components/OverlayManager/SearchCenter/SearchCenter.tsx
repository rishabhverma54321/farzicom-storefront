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
import { RouteComponentProps, withRouter } from "react-router-dom";
import ReactSVG from "react-svg";

import { commonMessages } from "@temp/intl";
import { Loader } from "@components/atoms/Loader";
import { Button } from "@components/atoms/Button";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import CloseOverlay from "@components/atoms/SvgIcons/CloseOverlay";
import { customWithRouter } from "@hooks/customWithRouter";
import MyCustomLink from "@components/next-react/MyCustomLink";
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
import { TypedSearchResults } from "./queries";

import closeImg from "../../../images/x.svg";
import ResultList from "./ResultList";

interface SearchProps extends WrappedComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
}

class SearchCenter extends React.Component<SearchProps, SearchState> {
  state = { search: "" };

  submitBtnRef = React.createRef<HTMLButtonElement>();

  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({ search: "" });
    }
  }

  get hasSearchPhrase() {
    return this.state.search.length > 0;
  }

  get redirectTo() {
    return { pathname: searchUrl, search: `?${this.searchQs}` };
  }

  get searchQs() {
    return stringify({ query: this.state.search });
  }

  hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  handleSubmit = (evt: React.FormEvent) => {
    if (this.hasSearchPhrase && this.submitBtnRef.current) {
      this.props.overlay.hide();
      // this.props.history.push(`${searchUrl}?${this.searchQs}`);
    }

    evt.preventDefault();
  };

  handleInputBlur = () => {
    if (!this.hasSearchPhrase) {
      this.props.overlay.hide();
    }
  };

  render() {
    return (
      <Overlay
        testingContext="searchOverlay"
        context={this.props.overlay}
        className="overlayFarzicom--no-background"
      >
        <form
          className={classNames("searchCenter", {
            "searchCenter--has-results": this.hasSearchPhrase,
          })}
          onClick={e => e.stopPropagation()}
          onSubmit={this.handleSubmit}
        >
          <div className="searchCenter__input">
            <DebouncedTextField
              onChange={evt => {
                this.setState({ search: evt.target.value });
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
              value={this.state.search}
              iconLeft={
                <CloseOverlay
                  onClick={this.props.overlay.hide}
                  className="searchCenter__input__close-btn"
                />
              }
              autoFocus
              placeholder={this.props.intl.formatMessage(commonMessages.search)}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div
            className={classNames({
              search__products: true,
              "searchCenter__products--expanded": this.hasSearchPhrase,
            })}
          >
            <NetworkStatus>
              {isOnline => {
                if (this.hasSearchPhrase) {
                  return (
                    <TypedSearchResults
                      renderOnError
                      displayError={false}
                      errorPolicy="all"
                      variables={{ query: this.state.search }}
                    >
                      {({ data, error, loading }) => {
                        if (!error) {
                          if (clevertapEvents.search.enable) {
                            const userId = localStorage.getItem("userId");
                            const clevertap = makeClevertap();
                            clevertap.event.push(clevertapEvents.search.value, {
                              timeStamp: Date.now(),
                              searchString: this.state.search,
                              customerID: userId,
                              IsSearchdataFound: this.hasResults(data),
                            });
                          }
                        }
                        if (this.hasResults(data)) {
                          return (
                            <>
                              <ResultList
                                data={data.products.edges}
                                hideFunc={this.props.overlay.hide}
                              />
                              <div className="searchCenter__products__footer">
                                {loading ? (
                                  <Loader />
                                ) : (
                                  <MyCustomLink
                                    href={`${searchUrl}?${this.searchQs}`}
                                  >
                                    <Button
                                      testingContext="searchProductsButton"
                                      btnRef={this.submitBtnRef}
                                      type="button"
                                      color="secondary"
                                      onClick={() => {
                                        this.props.overlay.hide();
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

                        if (error) {
                          return isOnline ? (
                            <Error error={error.message} />
                          ) : (
                            <OfflinePlaceholder />
                          );
                        }

                        return <NothingFound search={this.state.search} />;
                      }}
                    </TypedSearchResults>
                  );
                }
                return null;
              }}
            </NetworkStatus>
          </div>
        </form>
      </Overlay>
    );
  }
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default (
  props: WrappedComponentProps & { overlay: OverlayContextInterface }
) => <SearchCenter {...props} />;
