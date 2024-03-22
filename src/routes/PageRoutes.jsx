import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intentd from "../pages/intentd/Itentd";
import NotFound from "../pages/NotFound";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Intentd />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
