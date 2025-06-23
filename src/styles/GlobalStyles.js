import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
button,
input,
body,
a {
    cursor: url(/etcIcon/cursor-default.png), auto !important;
    }
    
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh; 
    overflow: hidden;
  }
`;

export default GlobalStyles;
