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

    dispatch(selectMenu(menu.toUpperCase()));
    menu === "intent" ? navigate(`/`) : navigate(`/${menu}`);
  };

  return (
    <MenuWrap>
      <LogoWrap onClick={clickHandler}>
        <p>CHATBOT</p>
      </LogoWrap>
      <Ul>
        <MenuList id="intent" className="active" onClick={clickHandler}>
          <MenuItem>
            <FontAwesomeIcon icon={faMessage} size="sm" />
            <ListName>INTENT</ListName>
          </MenuItem>
        </MenuList>
        <MenuList id="entity" onClick={clickHandler}>
          <MenuItem>
            <FontAwesomeIcon icon={faSitemap} size="sm" /> 
            <ListName>ENTITY</ListName>
          </MenuItem>
          
        </MenuList>
      </Ul>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-left: 15px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoWrap = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 50px;
  cursor: pointer;
`;

const Ul = styled.ul`
  /* color: "#626b79";   */
  color: "#3f4049";
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;
`;

const MenuItem = styled.div`
  padding: 8px 10px;
  /* background-color: red; */
  border-radius: 10px;

  &:hover {
    background-color: #f2f5f9;
  }
  
`;

const MenuList = styled.li`
  margin-bottom: 10px;
  width: 100%;
  padding-right: 15px;
  cursor: pointer;
  font-size: 1.1em;
  transition: 0.1s ease;

  &:last-child{
    margin-bottom: 0;
  }

  &.active {
    border-right: 3px solid ${props=>props.theme.hoverColor};

    ${MenuItem}{
    background-color: ${props=>props.theme.lightColor};
    color: ${props=>props.theme.hoverColor};
  }
  }
`;



const ListName = styled.span`
  margin-left: 10px;
`;



export default SideMenu;
