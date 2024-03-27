import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 100;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2)
        format("opentype");
  }
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 200;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2)
        format("opentype");
  }
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 300;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2)
        format("opentype");
  }
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 400;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2)
        format("opentype");
  }
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 500;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2)
        format("opentype");
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 600;
    src:
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2)
        format("woff2"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2)
        format("woff"),
      url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2)
        format("opentype");
  }

  body *{
    font-family: 'NotoSansKR';
    font-size: 14px;
    font-weight: 300;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
