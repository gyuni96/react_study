import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <h3>메인</h3>
      <ul>
        <Link to="/product/1">1번</Link>
        <Link to="/product/2">2번</Link>
      </ul>
    </>
  );
};

export default Main;
