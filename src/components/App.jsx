import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Header from "../components/Header";
import SideMenu from "./SideMenu";

import PageRoutes from "../routes/PageRoutes";

function App() {
  return (
    <>
      <Container>
        <SideMenu />
        <ContentWrap>
          <Header />
          <PageRoutes />
        </ContentWrap>
      </Container>
      <GlobalStyle />
    </>
  );
}

const Container = styled.div`
  display: flex;
  /* background-color: black; */
  background-color: #eff2f8;
`;
const ContentWrap = styled.div`
  width: 90%;
  /* background-color: blue; */
`;

export default App;
