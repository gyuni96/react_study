import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faSitemap } from "@fortawesome/free-solid-svg-icons";

const SideMenu = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const menu = e.target.innerText.trim().toLowerCase();

    menu === "intent" || menu === "logo" ? navigate(`/`) : navigate(`/${menu}`);
  };

  return (
    <MenuWrap>
      <LogoWrap onClick={clickHandler}>
        <p>LOGO</p>
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
