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
        <HeaderItem>
          <Navigation>{navigation}</Navigation>
          <UserWrap>
            {/* <span>{userInfo.userName}</span> */}
            <span>이름</span>
            <span onClick={handlelogout}>로그아웃</span>
          </UserWrap>
        </HeaderItem>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35px 0 35px 35px;
  height: 40px;
  max-width: 1600px;

`;

const Navigation = styled.span`
  font-size: 1.7em;
  font-weight: 800;
`;

const UserWrap = styled.div`
  padding-right: 30px;
`;

export default Header;
