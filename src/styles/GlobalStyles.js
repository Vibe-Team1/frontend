import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  body {
    font-family: monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    user-drag: none;
    -webkit-user-drag: none;
  }

  img {
    user-drag: none;
    -webkit-user-drag: none;
  }

  input {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
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
