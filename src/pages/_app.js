import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatoProvider } from "../hooks/useDato";
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
    background: url("https://source.unsplash.com/1920x1080/?space") ;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
        <DatoProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </DatoProvider>
      </ThemeProvider>
    </>
  );
}
