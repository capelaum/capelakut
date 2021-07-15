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
import myProjects from "../services/myProjects.json";

export default function Home() {
  const githubUser = "capelaum";
  const [friendsList, setFriendsList] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("followers").then(response => setFriendsList(response.data));
    setProjects(myProjects);
  }, []);

  function handleCreateProject(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const image = formData.get("image");

    if (title.trim() === "" || image.trim() === "") {
      return;
    }

    const newProject = {
      id: new Date().toISOString(),
      title,
      image,
    };

    setProjects([...projects, newProject]);
    event.target.title.value = "";
    event.target.image.value = "";
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
            <form onSubmit={handleCreateProject}>
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
                  <a
                    href={`https://github.com/${friend.login}`}
                    target="_blank"
                  >
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
            <a href="/friends" className="boxLink">
              Ver Todos
            </a>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Projetos ({projects.length})</h2>
            <ul>
              {projects.slice(0, 6).map(project => (
                <li key={`${project.title}`}>
                  <a href={project.url} target="_blank">
                    <img
                      src={`https://luis-capelletto-portfolio.netlify.app/assets/img/projects/${project.img}`}
                      alt={project.title}
                    />
                    <span>{project.title}</span>
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
