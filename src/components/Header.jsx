import React from "react";
import styled from "styled-components";

import { useLocation } from "react-router-dom";

const Header = (props) => {
  // const navigation = use

  const path = useLocation();

  console.log(path);

  console.log(new URLSearchParams(path.search));

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
  justify-content: space-between;
  height: 40px;
  background-color: #eff2f8;
  position: relative;
  padding: 25px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.span`
  font-size: 1.3em;
`;

const UserWrap = styled.div`
  padding-right: 30px;
`;

export default Header;
