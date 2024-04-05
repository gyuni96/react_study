import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../reducers/action";

const Header = () => {
  // const navigation = use

  const navigation = useSelector((state) => state.selectMenu);

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <HeaderWrap>
        <Navigation>{navigation}</Navigation>
        <UserWrap>
          <span>{userInfo.userName}</span>/
          <span onClick={handlelogout}>로그아웃</span>
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
