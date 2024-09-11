import React, { useCallback, useState } from "react";
import { TypedUpdateUserMetaMutation } from "@components/organisms/YarnLogin/mutations";
import * as C from "./styles";
import SearchIcon from "../CustomInput/Search";
import RightClick from "../../../../images/profileSvg/GreenTickProfile";
import CategoryItem from "./CategoryItem";
import { TypedCategoryListQuery } from "./queries";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { useCustomHistory } from "@hooks/useCustomHistory";

export interface IYarnCategorySelectionProps {}

export const YarnCategorySelection: React.FC<IYarnCategorySelectionProps> = () => {
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [active, setActive] = useState<any>({
    id: "",
    itemData: [],
  });
  const history = useCustomHistory();
  const location = useCustomLocation();
  const { userMetaId } = location.state;
  const handleSubmitCategory = (mutation: any) => {
    mutation({
      variables: {
        userId: userMetaId,
        input: { categories: categorySelected },
      },
    });
  };
  const selectAll = (list: any, id: any) => {
    const selectedListIDs = list.map(({ node }: { node: any }) => node.id);
    setCategorySelected((prevValue: any) => [...prevValue, ...selectedListIDs]);
  };
  const getListOfItems = (val: string) => {
    setSearchInput(val);
  };
  const debounceFunction = (funct: any, delay: number) => {
    let timer: any;
    const debounceEngine = (...rest: any) => {
      const self: any = this;
      const args = rest;
      clearTimeout(timer);
      timer = setTimeout(() => {
        funct.apply(self, args);
      }, delay);
    };
    return debounceEngine;
  };
  const debounceListOfItems = useCallback(
    debounceFunction((nextValue: string) => getListOfItems(nextValue), 500),
    []
  );
  const onInputChangeHandler = (e: any) => {
    const nextVal = e.target.value;
    setSearchString(nextVal);
    debounceListOfItems(nextVal);
  };
  return (
    <TypedCategoryListQuery
      variables={{
        filter: {
          search: searchInput,
        },
      }}
    >
      {({ data, loading }) => {
        if (data && active.id === "") {
          const node = data?.categories?.edges.filter(
            ({ node }: { node: any }) => node.children?.edges.length !== 0
          )[0].node;
          setActive((prev: any) => ({
            ...prev,
            id: node?.id,
            itemData: node?.children?.edges,
          }));
        }
        return (
          <TypedUpdateUserMetaMutation
            onCompleted={data => {
              if (data?.updateUserMeta?.userMeta?.id) {
                history.push({
                  pathname: "/",
                  state: {
                    showOnBoardingLogo: true,
                  },
                });
              }
            }}
          >
            {mutation => {
              return (
                <C.CategorySection>
                  <C.CategoryContainer>
                    <C.Body className="category-body">
                      <C.H1>Select categories</C.H1>
                      <C.P>
                        Select the categories of yarn you are interested in.
                      </C.P>
                      <C.Search>
                        <C.Input
                          placeholder="Search"
                          onChange={onInputChangeHandler}
                          value={searchString}
                          type="search"
                        />
                        <span className="search-icon">
                          <SearchIcon />
                        </span>
                      </C.Search>
                      <C.Content>
                        {data?.categories?.edges.length ? (
                          <>
                            <C.CategoryList>
                              {data?.categories?.edges.map(({ node }) => {
                                if (node.children?.edges.length) {
                                  return (
                                    <Category
                                      key={node.id}
                                      item={node}
                                      active={active}
                                      setActive={setActive}
                                    />
                                  );
                                }
                              })}
                            </C.CategoryList>
                            <C.RespectiveCategoryItem>
                              {active.itemData && (
                                <ContentListing
                                  selectAll={selectAll}
                                  active={active}
                                  categorySelected={categorySelected}
                                  setCategorySelected={setCategorySelected}
                                />
                              )}
                            </C.RespectiveCategoryItem>
                          </>
                        ) : (
                          "no match found!!"
                        )}
                      </C.Content>
                      <C.FinishBtn
                        onClick={() => handleSubmitCategory(mutation)}
                      >
                        <span>Finish</span>{" "}
                        <RightClick className="right-click" />
                      </C.FinishBtn>
                    </C.Body>
                  </C.CategoryContainer>
                </C.CategorySection>
              );
            }}
          </TypedUpdateUserMetaMutation>
        );
      }}
    </TypedCategoryListQuery>
  );
};
YarnCategorySelection.displayName = "YarnCategorySelection";
export default YarnCategorySelection;

export const Category = ({
  item,
  active,
  setActive,
}: {
  item: any;
  active: any;
  setActive: any;
}) => {
  return (
    <C.Category
      onClick={() =>
        setActive((prev: any) => ({
          ...prev,
          id: item.id,
          itemData: item.children.edges,
        }))
      }
      className={`${active.id === item.id && "category-selected"}`}
    >
      <p className="category-name">{item.name}</p>
      <C.ActiveBorder
        className={`${active.id === item.id ? "active" : "not-active"}`}
      />
    </C.Category>
  );
};

export const ContentListing: React.FC<any> = ({
  selectAll,
  active,
  categorySelected,
  setCategorySelected,
}) => {
  const { itemData } = active;
  const check = () => {
    let count = 0;
    const arrLength = itemData.length;
    for (let i = 0; i < arrLength; i++) {
      if (categorySelected.some((e: string) => e === itemData[i].node.id)) {
        count += 1;
      }
    }
    return count === arrLength;
  };
  return (
    <>
      <C.SelectAll
        onClick={() => selectAll(active.itemData, active.id)}
        disabled={check()}
      >
        Select All
      </C.SelectAll>
      {active.itemData.map(({ node }: any) => (
        <CategoryItem
          key={node.id}
          item={node}
          setCategorySelected={setCategorySelected}
          categorySelected={categorySelected}
        />
      ))}
    </>
  );
};
