import { createGlobalStyle, ThemeProvider } from "styled-components";
import { CapelakutStyles } from "../lib/CapelakutCommons";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    font-size: 16px;
  }

  body {
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${CapelakutStyles}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
