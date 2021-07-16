import React from "react";
import styled, { css } from "styled-components";
import { CapelakutProfileSidebarMenuDefault } from "../components/CapelakutProfileSidebarMenuDefault";
import { Link } from "../components/Link";

const BASE_URL = "http://Alurakut.vercel.app";
const v = "1";

// ================================================================================================================
// Menu
// ================================================================================================================
export function CapelakutMenu({ githubUser }) {
  const [isMenuOpen, setMenuState] = React.useState(false);
  return (
    <CapelakutMenu.Wrapper isMenuOpen={isMenuOpen}>
      <div className="container">
        <CapelakutMenu.Logo src="logo.svg" />

        <nav style={{ flex: 1 }}>
          {[
            { name: "Inicio", slug: "/" },
            { name: "Amigos", slug: "/amigos" },
            { name: "Comunidades", slug: "/comunidades" },
          ].map(menuItem => (
            <Link
              key={`key__${menuItem.name.toLocaleLowerCase()}`}
              href={`${menuItem.slug.toLocaleLowerCase()}`}
            >
              {menuItem.name}
            </Link>
          ))}
        </nav>

        <nav>
          <a href={`/logout`}>Sair</a>
          <div>
            <input placeholder="Pesquisar no Orkut" />
          </div>
        </nav>

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />}
          {!isMenuOpen && (
            <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />
          )}
        </button>
      </div>
      <CapelakutMenuProfileSidebar githubUser={githubUser} />
    </CapelakutMenu.Wrapper>
  );
}
CapelakutMenu.Wrapper = styled.header`
  width: 100%;
  background-color: #308bc5;

  .CapelakutMenuProfileSidebar {
    background: white;
    overflow-y: scroll;
    position: fixed;
    z-index: 100;
    padding: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0;
    transition: 0.3s;
    pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? "all" : "none")};
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? "1" : "0")};

    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? "translateY(0)" : "translateY(calc(-100% - 48px))"};

    @media (min-width: 860px) {
      display: none;
    }

    > div {
      max-width: 400px;
      margin: auto;
    }

    a {
      font-size: 18px;
    }

    .boxLink {
      font-size: 18px;
      color: #2e7bb4;
      -webkit-text-decoration: none;
      text-decoration: none;
      font-weight: 800;
    }

    hr {
      margin-top: 12px;
      margin-bottom: 8px;
      border-color: transparent;
      border-bottom-color: #ecf2fa;
    }
  }

  .container {
    position: ${({ isMenuOpen }) => (isMenuOpen ? "fixed" : "relative")};
    width: ${({ isMenuOpen }) => (isMenuOpen ? "100%" : "auto")};

    background-color: #308bc5;
    padding: 7px 16px;
    max-width: 1110px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    z-index: 101;

    @media (min-width: 860px) {
      justify-content: flex-start;
    }

    button {
      border: 0;
      background: transparent;
      align-self: center;
      display: inline-block;
      @media (min-width: 860px) {
        display: none;
      }
    }
    nav {
      display: none;
      @media (min-width: 860px) {
        display: flex;
      }
      a {
        font-size: 12px;
        color: white;
        padding: 10px 16px;
        position: relative;
        text-decoration: none;
        &:after {
          content: " ";
          background-color: #5292c1;
          display: block;
          position: absolute;
          width: 1px;
          height: 12px;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
    input {
      color: #ffffff;
      background: #5579a1;
      padding: 10px 42px;
      border: 0;
      background-image: url(${`${BASE_URL}/icons/search.svg`});
      background-position: 15px center;
      background-repeat: no-repeat;
      border-radius: 1000px;
      font-size: 12px;
      ::placeholder {
        color: #ffffff;
        opacity: 1;
      }
    }
  }
`;
CapelakutMenu.Logo = styled.img`
  background-color: #ffffff;
  padding: 9px 14px;
  border-radius: 1000px;
  height: 34px;
`;

function CapelakutMenuProfileSidebar({ githubUser }) {
  return (
    <div className="CapelakutMenuProfileSidebar">
      <div>
        <img
          src={`https://github.com/${githubUser}.png`}
          style={{ borderRadius: "8px" }}
        />
        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />

        <CapelakutProfileSidebarMenuDefault />
      </div>
    </div>
  );
}

// ================================================================================================================
// CapelakutProfileSidebarMenuDefault
// ================================================================================================================

// ================================================================================================================
// OrkutNostalgicIconSet
// ================================================================================================================

// ================================================================================================================
// Login Page
// ================================================================================================================
const CapelakutLoginScreen = css`
  :root {
    --backgroundPrimary: #d9e6f6;
    --backgroundSecondary: #f1f9fe;
    --backgroundTertiary: #ffffff;
    --backgroundQuarternary: #bbcde8;
    --colorPrimary: #2e7bb4;
    --colorSecondary: #388bb0;
    --colorTertiary: #2f4a71;
    --colorQuarternary: #d81d99;
    --textPrimaryColor: #333333;
    --textSecondaryColor: #ffffff;
    --textTertiaryColor: #5a5a5a;
    --textQuarternaryColor: #c5c6ca;
    --commonRadius: 8px;
  }
  .loginScreen {
    padding: 16px;
    max-width: 1110px;
    display: grid;
    --gap: 12px;
    --gutter: 16px;
    grid-gap: var(--gap);
    grid-template-areas:
      "logoArea"
      "formArea"
      "footerArea";
    @media (min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas:
        "logoArea formArea"
        "logoArea formArea"
        "footerArea footerArea";
    }
    .logoArea {
      grid-area: logoArea;
      background-color: var(--backgroundTertiary);
      border-radius: var(--commonRadius);
      padding: var(--gutter);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 263px;
      @media (min-width: 860px) {
        min-height: 368px;
      }
      p {
        font-size: 12px;
        line-height: 1.2;
        &:not(:last-child) {
          margin-bottom: 12px;
        }
        strong {
          color: var(--colorQuarternary);
        }
      }
      img {
        max-height: 45px;
        margin-bottom: 36px;
      }
    }
    .formArea {
      grid-area: formArea;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--gutter);
        padding-left: 50px;
        padding-right: 50px;
        background-color: var(--backgroundSecondary);
        border-radius: var(--commonRadius);
        flex: 1;
        &:not(:last-child) {
          margin-bottom: var(--gap);
        }
        &:first-child {
          min-height: 224px;
          @media (min-width: 860px) {
            min-height: 282px;
          }
        }
        p {
          font-size: 14px;
        }
        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
        input {
          width: 100%;
          display: block;
          border: 1px solid var(--textQuarternaryColor);
          padding: 12px;
          background-color: var(--backgroundTertiary);
          border-radius: var(--commonRadius);
          margin-top: 24px;
          margin-bottom: 16px;
        }
        button {
          width: 100%;
          display: block;
          border: 0;
          padding: 12px;
          border-radius: var(--commonRadius);
          background-color: var(--colorPrimary);
          color: var(--textSecondaryColor);
        }
      }
    }
    .footerArea {
      grid-area: footerArea;
      background-color: var(--backgroundQuarternary);
      border-radius: var(--commonRadius);
      padding: 8px;
      p {
        font-size: 12px;
        text-align: center;
        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
      }
    }
  }
`;

// ================================================================================================================
// Reset Styles
// ================================================================================================================
export const CapelakutStyles = css`
  *::-webkit-scrollbar {
    width: 8px;
  }
  *::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  *::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  a,
  button {
    cursor: pointer;
    transition: 0.3s;
    outline: 0;
    &:hover,
    &:focus {
      opacity: 0.8;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  input {
    transition: 0.3s;
    outline: 0;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 0px 5px #33333357;
    }
  }

  #__next {
    overflow-y: ${({ isMenuOpen }) => (isMenuOpen ? "none" : "scroll")};
    max-height: 100vh;
  }

  ${CapelakutLoginScreen}
`;
