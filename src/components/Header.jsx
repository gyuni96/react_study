import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  logout,
  CHANGE_THEME,
  selectMenu,
  CHAT_MODAL
} from "../reducers/action";
import { alertConfirm } from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const navigation = useSelector((state) => state.selectMenu);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    alertConfirm({
      icon: "question",
      title: "로그아웃",
      text: "로그아웃 하시겠습니까?",
      callback: () => {
        const param = {
          userId: userInfo.userId,
          compCd: userInfo.compCd
        };

        dispatch(logout(param));
      }
    });
  };

  const handleTheme = () => {
    dispatch({ type: CHANGE_THEME });
  };

  const handleProfile = () => {
    navigate("/userprofile");
    dispatch(selectMenu("USER PROFILE"));
  };

  const handleChatModal = () => {
    dispatch({ type: CHAT_MODAL });
  };

  return (
    <>
      <HeaderWrap>
        <HeaderItem>
          <Navigation>{navigation}</Navigation>
          <UserWrap>
            <Checkbox type="checkbox" id="themeToggle" onChange={handleTheme} />
            <span>{userInfo?.userNm}</span>
            <span onClick={handleProfile}>프로필</span>
            <span onClick={handlelogout}>로그아웃</span>
            <FontAwesomeIcon
              onClick={handleChatModal}
              icon={faRobot}
              size="lg"
            />
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
  height: 70px;
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
  font-size: 1.7rem;
  font-weight: 800;
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;

  span {
    margin-right: 20px;
  }
`;

const Checkbox = styled.input`
  margin-right: 20px;
  width: 3rem;
  height: 1.5rem;
  background: white;
  border-radius: 2rem;
  &::before {
    content: "";
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 25px;
    display: block;
    position: absolute;
    border-radius: 30px;
    background-color: white;
    /* box-shadow: 0 0 16px 1px rgba(0 0 0 / 10%); */
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in;
    cursor: pointer;
  }
  &::after {
    content: "";
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    top: 3px;
    left: 5px;
    border-radius: 50%;
    background: ${(props) => props.theme.hoverColor};
    transition: all 0.2s ease-in;
  }
  &:checked {
    &::before {
      background-color: ${(props) => props.theme.hoverColor};
      border: 1px solid ${(props) => props.theme.hoverColor};
    }
    &::after {
      background-color: white;
      left: calc(100% - 15px);
    }
  }
`;

export default Header;
