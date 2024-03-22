import React from "react";
import styled from "styled-components";

const Content = ({ name, id, desc, clickHandler }) => {
  return (
    <>
      <ContentItem>
        <ContentTitle>{name}</ContentTitle>
        <ContentDescription>{desc}</ContentDescription>
        <ContentDeletedButton>
          <i className="fa-regular fa-trash-can"></i>
        </ContentDeletedButton>
      </ContentItem>
    </>
  );
};

const ContentItem = styled.div`
  background-color: #fff;
  width: 320px;
  height: 200px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  padding-left: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  transition: 0.3s ease;
  &:hover {
    background-color: blue;
    color: #fff;
  }
`;

const ContentTitle = styled.span`
  font-size: 2em;
`;

const ContentDescription = styled.span`
  font-size: 0.8em;
`;
const ContentDeletedButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
  font-size: 2em;
`;

export default Content;
