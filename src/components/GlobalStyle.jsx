import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  body{
    font-family: 'NotoSansKR';
    font-size: 12px;
  }
`;

export default GlobalStyle;
