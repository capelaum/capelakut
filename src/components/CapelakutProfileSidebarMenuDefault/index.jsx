import Router from "next/router";
import { destroyCookie } from "nookies";

import { CapelakutProfileSidebarMenuDefaultWrapper } from "./styles";

export function CapelakutProfileSidebarMenuDefault() {
  const BASE_URL = "http://Alurakut.vercel.app";

  function signOut() {
    destroyCookie(undefined, "USER_TOKEN");
    Router.push("/login");
  }

  return (
    <CapelakutProfileSidebarMenuDefaultWrapper>
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/user.svg`} />
          Perfil
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/book.svg`} />
          Recados
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/camera.svg`} />
          Fotos
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/sun.svg`} />
          Depoimentos
        </a>
      </nav>
      <hr />
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/plus.svg`} />
          GitHub Trends
        </a>
        <a href="#" onClick={signOut}>
          <img src={`${BASE_URL}/icons/logout.svg`} />
          Sair
        </a>
      </nav>
    </CapelakutProfileSidebarMenuDefaultWrapper>
  );
}
