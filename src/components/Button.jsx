import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트를 사용하여 버튼 스타일링
const ButtonStyled = styled.button`
  padding: 5px 12px;
  font-size: 16px;
  background-color: ${({ bgColor }) =>
    bgColor || "rgba(0,0,0,0.4)"}; /* props로 받은 배경색 또는 기본 색상 */
  color: ${({ color }) => color || "#fff"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ bgColor }) => bgColor || "#007bff"}; /* 호버 색상 */
  }

  &:focus {
    outline: none;
  }
`;

// 공통으로 사용할 버튼 컴포넌트 정의
const Button = ({ children, onClick, bgColor, color }) => {
  return (
    <ButtonStyled onClick={onClick} bgColor={bgColor} color={color}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
