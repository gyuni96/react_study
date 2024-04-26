import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFileLines } from "@fortawesome/free-solid-svg-icons";

const Card = ({ name, id, desc, clickHandler, deletHandler }) => {
  return (
    <>
      <CardWrap>
        <ContentItem onClick={clickHandler} data-itemid={id}>
          <ContentIcon>
            <FontAwesomeIcon icon={faFileLines} size="lg" />
          </ContentIcon>
          <ContentTitle>{name}</ContentTitle>
          <ContentDescription>{desc}</ContentDescription>
        </ContentItem>
        {deletHandler && (
          <ContentDeletedButton onClick={deletHandler}>
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </ContentDeletedButton>
        )}
      </CardWrap>
    </>
  );
};

const ContentItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;
`;
const ContentIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #f2f5f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.hoverColor};
  margin-bottom: 10px;
  transition: 0.3s ease;
`;
const ContentTitle = styled.span`
  white-space: nowrap;
  font-size: 1.8rem;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-weight: 500;
  margin-bottom: 5px;
`;

const ContentDescription = styled.span`
  font-size: 0.8rem;
`;
const ContentDeletedButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
  cursor: pointer;
  color: ${(props) => props.theme.hoverColor};
  /* color: #5c5c5c; */
  transition: 0.3s ease;
`;

const CardWrap = styled.div`
  position: relative;
  background-color: #fff;
  color: #3b4350;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 170px;
  border-radius: 10px;
  margin-bottom: 45px;
  padding: 0 30px;
  transition: 0.3s ease;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;

    ${ContentDeletedButton} {
      color: #fff;
    }
  }
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.themeColor};

    &:hover {
      background-color: ${(props) => props.theme.hoverColor};
      color: #fff;

      ${ContentDeletedButton} {
        color: #fff;
      }
    }
  }
`;
export default Card;
