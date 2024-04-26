import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import IntentList from "../pages/IntentList";
import NotFound from "../pages/NotFound";
import IntentInfo from "../pages/IntentInfo";
import EntityInfo from "../pages/EntityInfo";
import Login from "../pages/Login";
import styled from "styled-components";
import Signup from "../pages/SignUp";
import FindUserId from "../pages/FindUserId";
import FindUserPwd from "../pages/FindUserPwd";
import UserProfile from "../pages/UserProfile";
import Fallback from "../pages/Fallback";
import AnswerFailed from "../pages/AnswerFailed";
import History from "../pages/History";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import ChatModal from "../pages/ChatModal";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageRoutes = () => {
  const { isLogin, isChatModal, selectMenu } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    isLogin ? navigate(`/${selectMenu}`) : navigate("/");
  }, [isLogin]);
  return (
    <Container>
      {isLogin && <SideMenu />}
      <ContentWrap $islogin={isLogin.toString()}>
        {isLogin && <Header />}
        <RouteWrap $islogin={isLogin.toString()}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/findUserId" element={<FindUserId />} />
            <Route path="/findUserPwd" element={<FindUserPwd />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/intent" element={<IntentList />} />
            <Route path="/intent/:intentId" exact element={<IntentInfo />} />
            <Route path="/fallback" element={<Fallback />} />
            <Route path="/entity" element={<EntityInfo />} />
            <Route path="/answerfailed" element={<AnswerFailed />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteWrap>
      </ContentWrap>
      {isChatModal && <ChatModal />}
    </Container>
  );
};

export default PageRoutes;

const Container = styled.div`
  display: flex;
  background-color: #f7f7f7;
  height: 100vh;
  overflow: hidden;
`;
const ContentWrap = styled.div`
  ${(prop) =>
    prop.$islogin === "true" ? "width: calc(100% - 200px);" : "width: 100%;"}
`;

const RouteWrap = styled.div`
  padding: 1rem 3rem 1rem;
  height: calc(100% - 70px);
  ${(prop) => prop.$islogin === "true" && "max-width: 1600px;"}
  width: 100%;
  border-radius: 1.5rem;
`;
