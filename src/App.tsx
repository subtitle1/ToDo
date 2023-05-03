import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Bruno Ace', cursive;
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }
  a {
    text-decoration:none;
    color: inherit; /* 부모로부터 속성을 가져오게 한다*/
  }
`;

const ModeContainer = styled.div`
  border-radius: 50px;
`;

const ModeBtn = styled.button`
  width: 75px;
  height: 75px;
  padding: 10px 10px;
  border-radius: 100px;
  position: absolute;
  background-color: #ffffff;
  border-color: none;
  margin-left: 23px;
  top: 3%;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease;

  border: none;
  &:hover {
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
`;

function App() {
  const [mode, setMode] = useState(false);
  const [modeBtn, setModeBtn] = useState(faMoon);

  const theme = mode === false ? darkTheme : lightTheme;
  const icon = modeBtn === faMoon ? faSun : faMoon;

  const toggleTheme = () => {
    setMode(!mode);
    setModeBtn(icon);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ModeContainer>
          <ModeBtn onClick={toggleTheme}>
            <FontAwesomeIcon icon={modeBtn} size="3x" />
          </ModeBtn>
        </ModeContainer>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
