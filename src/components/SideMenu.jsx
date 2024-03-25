import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const menu = e.target.innerText.trim();

    menu === "INTENT" ? navigate(`/`) : navigate(`/${menu}`);
  };

  return (
    <MenuWrap>
      <LogoWrap>
        <p>LOGO</p>
      </LogoWrap>
      <Ul>
        <Li onClick={clickHandler}>
          <i className="fa-solid fa-message"></i> INTENT
        </Li>
        <Li onClick={clickHandler}>
          <i className="fa-solid fa-sitemap"></i> ENTITIES
        </Li>
        <Li onClick={clickHandler}>
          <i className="fa-solid fa-lightbulb"></i> ITEMS
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
`;

const Ul = styled.ul``;

const Li = styled.li`
  margin-bottom: 50px;
  cursor: pointer;
  font-size: 1.3em;

  transition: 0.1s ease;
  &:hover {
    font-size: 1.5em;
  }
`;

export default SideMenu;
