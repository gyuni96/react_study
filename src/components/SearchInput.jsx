import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const SearchInput = ({
  type,
  label,
  inputProps,
  button,
  handleButton,
  setSelectedOption
}) => {
  const handleChange = (item) => {
    setSelectedOption(item);
  };

  // Select 컴포넌트에 적용할 스타일
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "12rem",
      height: "3rem",
      border: "1px solid rgba(0,0,0,0.1)"
    })
  };

  return (
    <SearchInputWrap>
      <Label>{label}</Label>
      {type === "text" ? (
        <InputWrap>
          <Input type="text" {...inputProps} />
          {button && <InputBtn onClick={handleButton}>{button}</InputBtn>}
        </InputWrap>
      ) : type === "select" ? (
        <Select {...inputProps} onChange={handleChange} styles={customStyles} />
      ) : type === "date" ? (
        <InputWrap>
          <Input type="date" {...inputProps} />
          {button && <InputBtn onClick={handleButton}>{button}</InputBtn>}
        </InputWrap>
      ) : null}
    </SearchInputWrap>
  );
};

export default SearchInput;

const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #464646;
  white-space: nowrap;
  flex-shrink: 0;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  /* padding: 0.5rem; */
  border: none;
  outline: none;
`;

const InputBtn = styled.button`
  padding: 0.5rem;
  color: rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #c5c5c5;
    color: #fff;
  }
`;
