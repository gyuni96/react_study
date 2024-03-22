import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <HeaderWrap>
        <Navigation>네비게이션</Navigation>
        <UserWrap>
          <span>김남균</span>/<span>로그아웃</span>
        </UserWrap>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #eff2f8;
  position: relative;
  padding: 15px 0 0 25px;
  max-width: 1500px;
`;

const Navigation = styled.span`
  font-size: 1.3em;
`;

const UserWrap = styled.div`
  position: absolute;
  top: 10;
  right: 45px;
`;

export default Header;
