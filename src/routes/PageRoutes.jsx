import React from "react";
import { Routes, Route } from "react-router-dom";
import IntentList from "../pages/IntentList";
import NotFound from "../pages/NotFound";
import IntentInfo from "../pages/IntentInfo";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntentList />}></Route>
        <Route path="/intent/:intentId" exact element={<IntentInfo />}></Route>
        {/* <Route path="/entity" element={<EntityList />}></Route> */}
        {/* <Route path="/intent/:intentId" exact element={<IntentInfo />}></Route> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default PageRoutes;
