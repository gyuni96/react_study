import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Card = ({ name, id, desc, clickHandler, deletHandler }) => {
  return (
    <>
      <CardWrap>
        <ContentItem onClick={clickHandler} data-itemid={id}>
          <ContentTitle>{name}</ContentTitle>
          <ContentDescription>{desc}</ContentDescription>
        </ContentItem>
        <ContentDeletedButton onClick={deletHandler}>
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </ContentDeletedButton>
      </CardWrap>
    </>
  );
};

const CardWrap = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding-left: 30px;
  transition: 0.3s ease;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: #2d2ddd;
    color: #fff;
  }
`;

const ContentItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;
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
  cursor: pointer;
`;

export default Card;
