import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntentList from "../pages/IntentList";
import NotFound from "../pages/NotFound";
import IntentInfo from "../pages/IntentInfo";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntentList />}></Route>
        <Route path="/intent/*" element={<IntentInfo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default PageRoutes;
