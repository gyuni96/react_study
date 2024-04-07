import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Item = ({ children, title, buttonList }) => {
  return (
    <ItemWrap>
      <TitleWrap>
        <ItemTitle>{title}</ItemTitle>
        {typeof buttonList !== "undefined"
          ? buttonList.map((btn, idx) => {
              return (
                <Button onClick={btn.onClick} key={idx}>
                  {btn.buttonName}
                </Button>
              );
            })
          : null}
      </TitleWrap>
      {children}
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 100%;
  margin-bottom: 25px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemTitle = styled.h4`
  font-size: 1.3em;
  color: #6a6e79;
`;

const TitleWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

export default Item;
