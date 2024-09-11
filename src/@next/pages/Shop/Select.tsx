import React, { useEffect, useState, useRef } from "react";

import DropdownIndicator from "./DropdownIndicator";
import * as S from "./Select.styled";

export interface IOption {
  value: string;
  label: string;
}

export interface ISelect {
  options: IOption[];
  selectedOption: IOption;
  setSelectedOption: (option) => void;
}

const Select: React.FC<ISelect> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = option => () => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      const isCurrentComponent =
        wrapperRef.current && !wrapperRef.current.contains(event.target);
      if (isCurrentComponent && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, false);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [isOpen]);

  return (
    <S.Wrapper>
      <S.DropDownContainer>
        <S.DropDownHeader onClick={toggling}>
          <S.DropDownText>{selectedOption.label}</S.DropDownText>
          <DropdownIndicator />
        </S.DropDownHeader>
        {isOpen && (
          <S.DropDownListContainer ref={wrapperRef}>
            <S.DropDownList>
              {options.map(option => (
                <S.ListItem
                  onClick={onOptionClicked(option)}
                  key={option.label}
                >
                  {option.label}
                </S.ListItem>
              ))}
            </S.DropDownList>
          </S.DropDownListContainer>
        )}
      </S.DropDownContainer>
    </S.Wrapper>
  );
};

export default Select;
