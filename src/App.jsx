import React from "react";
import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

import PageRoutes from "./routes/PageRoutes";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Container>
        <SideMenu />
        <ContentWrap>
          <Header />
          <PageRoutes />
        </ContentWrap>
      </Container>
      <GlobalStyle />
    </BrowserRouter>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #eff2f8;
`;
const ContentWrap = styled.div`
  width: calc(100% - 240px);
`;

export default App;
