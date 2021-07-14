import { useEffect, useState } from "react";
import Head from "next/head";

import { MainGrid } from "../components/MainGrid";
import { Box } from "../components/Box";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";

import {
  CapelakutMenu,
  CapelakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../lib/CapelakutCommons";

import { api } from "../services/github";

export default function Home() {
  const githubUser = "capelaum";
  const [friendsList, setFriendsList] = useState([]);
  const [comunities, setcomunities] = useState([
    {
      id: new Date().toISOString(),
      title: "Eu odeio acordar cedo",
      image: "https:alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);

  useEffect(() => {
    api.get("followers").then(response => setFriendsList(response.data));
  }, []);

  function handleCreateComunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("🚀 ~ event.target", event.target);

    const title = formData.get("title");
    const image = formData.get("image");

    if (title.trim() === "" || image.trim() === "") {
      return;
    }

    const newComunity = {
      id: new Date().toISOString(),
      title,
      image,
    };

    setcomunities([...comunities, newComunity]);
  }

  return (
    <>
      <Head>
        <title>Capelakut | Home</title>
      </Head>
      <CapelakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <Box as="aside">
            <img
              src={`https://github.com/${githubUser}.png`}
              alt={githubUser}
            />
            <hr />
            <p>
              <a
                href={`https://github.com/${githubUser}`}
                className="boxLink"
                target="_blank"
              >
                @{githubUser}
              </a>
            </p>
            <hr />
            <CapelakutProfileSidebarMenuDefault />
          </Box>
        </div>

        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateComunity}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Amigos ({friendsList.length})</h2>
            <ul>
              {friendsList.slice(0, 6).map(friend => (
                <li key={friend.login}>
                  <a href={`/users/${friend.login}`}>
                    <img
                      src={`https://github.com/${friend.login}.png`}
                      alt={friend.login}
                    />
                    <span>{friend.login}</span>
                  </a>
                </li>
              ))}
            </ul>
            <hr />
            <a href="#" className="boxLink">
              Ver Todos
            </a>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas Comunidades ({comunities.length})
            </h2>
            <ul>
              {comunities.slice(0, 6).map(comunity => (
                <li key={`${comunity.id}`}>
                  <a href={`/comunities/${comunity.title}`}>
                    <img src={comunity.image} alt={comunity.title} />
                    <span>{comunity.title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <hr />
            <a href="#" className="boxLink">
              Ver Todos
            </a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
