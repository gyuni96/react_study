import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { selectMenu } from "../reducers/action";

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    let menu = e.target.innerText.trim().toLowerCase();
    menu === "intent" || menu === "chatbot" ? (menu = "intent") : menu;

    // dispatch(selectMenu(menu.toUpperCase()));
    dispatch(selectMenu(menu.toUpperCase()));
    menu === "intent" ? navigate(`/`) : navigate(`/${menu}`);
  };

  return (
    <MenuWrap>
      <LogoWrap onClick={clickHandler}>
        <p>CHATBOT</p>
      </LogoWrap>
      <Ul>
        <Li onClick={clickHandler}>
          <FontAwesomeIcon icon={faMessage} size="sm" /> INTENT
        </Li>
        <Li onClick={clickHandler}>
          <FontAwesomeIcon icon={faSitemap} size="sm" /> ENTITY
        </Li>
      </Ul>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-left: 70px;
`;

const LogoWrap = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 50px;
  cursor: pointer;
`;

const Ul = styled.ul``;

const Li = styled.li`
  padding: 25px 0;
  cursor: pointer;
  font-size: 1.3em;

  transition: 0.1s ease;
  &:hover {
    color: #146ebe;
    border-right: 2px solid #146ebe;
  }
`;

export default SideMenu;
