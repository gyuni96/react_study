import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

import PageRoutes from "./routes/PageRoutes";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";

import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  // const login = useSelector((state) => state.isLogin);
  const login = true;


  return (
    <BrowserRouter basename="/">
      <GlobalStyle />
      <Container>
        {!login && <Login />}
        {login && (
          <>
            <SideMenu />
            <ContentWrap>
              <Header />
              <PageRoutes />
            </ContentWrap>
          </>
        )}
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  display: flex;
  /* background-color: #eff2f8; */
  background-color: #f5f4f6;
  height: 100vh;
`;
const ContentWrap = styled.div`
  width: calc(100% - 200px);
  overflow-y: hidden;
`;

export default App;
