import React from "react";
import { Routes, Route } from "react-router-dom";
import IntentList from "../pages/IntentList";
import NotFound from "../pages/NotFound";
import IntentInfo from "../pages/IntentInfo";
import EntityInfo from "../pages/EntityInfo";
import styled from "styled-components";

const PageRoutes = () => {
  return (
    <RouteWrap>
      <Routes>
        <Route path="/" element={<IntentList />}></Route>
        <Route path="/intent/:intentId" exact element={<IntentInfo />}></Route>
        <Route path="/entity" element={<EntityInfo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </RouteWrap>
  );
};

export default PageRoutes;

const RouteWrap = styled.div`
  height: calc(100% - 60px);
`;
