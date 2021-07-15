import { useEffect, useState } from "react";
import Head from "next/head";

import { MainGrid } from "../components/MainGrid";
import { Box } from "../components/Box";
import { ProfileRelationsBox } from "../components/ProfileRelationsBox";

import {
  CapelakutMenu,
  CapelakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../lib/CapelakutCommons";

import { githubApi } from "../services/github";
import myProjects from "../services/myProjects.json";

export default function Home() {
  const [friendsList, setFriendsList] = useState([]);
  const [projects, setProjects] = useState([]);
  const githubUser = "capelaum";

  useEffect(() => {
    githubApi
      .get("followers")
      .then(response => setFriendsList(response.data))
      .catch(error => console.error(error));
    setProjects(myProjects);
  }, []);

  function handleCreateProject(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const image = formData.get("image");

    if (title.trim() === "" || image.trim() === "") {
      alert("Por favor preencha os campos para criar um novo projeto 🙃");
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
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateProject}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome do projeto?"
                  name="title"
                  aria-label="Qual vai ser o nome do projeto?"
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

              <button>Criar Projeto</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox data={friendsList} isFriendsList />
          <ProfileRelationsBox data={projects} />
        </div>
      </MainGrid>
    </>
  );
}
