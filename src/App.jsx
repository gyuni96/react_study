import React, { useEffect } from "react";

import PageRoutes from "./routes/PageRoutes";
import GlobalStyle from "./styles/GlobalStyle";
import { blueTheme, orangeTheme } from "./styles/theme.js";
import "./styles/index.css";
import { ThemeProvider } from "styled-components";

function App() {
  // const { isLogin, isChatModal, theme } = useSelector((state) => state);
  // const navigate = useNavigate();

  // const { pathname } = useLocation();
  // useEffect(() => {
  //   const path = pathname == "/" ? "/intent" : pathname;
  //   isLogin
  //     ? navigate(
  //         selectMenu.toLowerCase() === "intent"
  //           ? path
  //           : selectMenu.toLowerCase().replace(/\s/g, "")
  //       )
  //     : navigate("/");
  // }, [isLogin]);

  // useEffect(() => {
  //   const path = location.pathname == "/" ? "/intent" : location.pathname;
  //   isLogin
  //     ? navigate(
  //         selectMenu.toLowerCase() === "intent"
  //           ? path
  //           : selectMenu.toLowerCase().replace(/\s/g, "")
  //       )
  //     : navigate("/");
  // }, [isLogin]);

  return (
    <ThemeProvider theme={blueTheme}>
      <GlobalStyle />
      <PageRoutes />
    </ThemeProvider>
  );
  {
    /* <ThemeProvider theme={theme === "blueTheme" ? blueTheme : orangeTheme}> */
  }
}

export default App;
