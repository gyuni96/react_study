import { createGlobalStyle } from "styled-components";
// import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
/* 모든 요소 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 기본 폰트 설정 */
html {
  font-family: sans-serif;
  /* color: #2a313f; */
  color: #1f2839;
  font-size: 14px;
  font-family: 'NotoSansKR';
  font-weight: 300;
  /* line-height: 1.5; */
}

/* 기본 태그 스타일 제거 */
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 10px;
}

/* 링크 스타일 설정 */
a {
  color: #333;
  text-decoration: none;
}

/* 이미지 스타일 설정 */
img {
  max-width: 100%;
  height: auto;
}

/* 리스트 스타일 설정 */
ul, ol {
  list-style: none;
  padding: 0;
}

/* 테이블 스타일 설정 */
table {
  border-collapse: collapse;
  width: 100%;
}

/* 폼 요소 스타일 설정 */
input, textarea, select {
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* 버튼 스타일 설정 */
button {
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}  

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
  ::-webkit-scrollbar {width: 10px}
  ::-webkit-scrollbar-thumb {background-color: #b4b4b4; border-radius: 10px; background-clip: padding-box}
  ::-webkit-scrollbar-track {background-color: #f1f1f1; border-radius: 10px; }
  ::-webkit-scrollbar-button:vertical:start:decrement,
  ::-webkit-scrollbar-button:vertical:start:increment {
    display: block; height: 10px;
  }
`;

export default GlobalStyle;
