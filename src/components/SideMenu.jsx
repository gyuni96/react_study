import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const SideMenu = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const menu = e.target.innerText.trim();
    navigate(`/${menu}`);
  };

  return (
    <MenuWrap>
      <LogoWrap>
        <p>LOGO</p>
      </LogoWrap>
      {/* <Link to="/product/1">1번</Link> */}
      <Ul>
        {/* <Link to="/"> */}
        <Li onClick={clickHandler}>
          <i className="fa-solid fa-message"></i> INTENTD
        </Li>
        {/* </Link> */}
        <Li>
          <i className="fa-solid fa-sitemap"></i> ENTITIES
        </Li>
        <Li>
          <i className="fa-solid fa-lightbulb"></i> ITEMS
        </Li>
      </Ul>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  width: 10%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  /* height: 100%; */
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
  /* font-size: 1.2em; */
  font-size: 1.3em;

  transition: 0.1s ease;
  &:hover {
    font-size: 1.5em;
  }
`;

export default SideMenu;
