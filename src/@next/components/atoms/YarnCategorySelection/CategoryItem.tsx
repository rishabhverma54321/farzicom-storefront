import React from "react";
import * as C from "./styles";

function CategoryItem({
  item,
  setCategorySelected,
  categorySelected,
}: {
  item: any;
  setCategorySelected: any;
  categorySelected: any;
}) {
  const handleCategory = (e: any) => {
    const { value } = e.target;
    if (!categorySelected.some((id: any) => id === item.id)) {
      setCategorySelected((prevVal: any) => {
        return [...prevVal, value];
      });
    } else {
      const newList = categorySelected.filter((id: any) => id !== item.id);
      setCategorySelected(newList);
    }
  };
  return (
    <C.CategoryListItem>
      <label htmlFor={item.name}>{item.name}</label>
      <input
        type="checkbox"
        onChange={handleCategory}
        value={item.id}
        checked={categorySelected.some((id: any) => id === item.id)}
      />
    </C.CategoryListItem>
  );
}

export default CategoryItem;
