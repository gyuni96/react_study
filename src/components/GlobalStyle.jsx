import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  body *{
    font-family: 'NotoSansKR';
    font-size: 14px;
    font-weight: 300;
  }
`;

export default GlobalStyle;
