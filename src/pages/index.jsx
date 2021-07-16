import { useEffect, useState } from "react";
import Head from "next/head";

import { Box } from "../components/Box";
import { MainGrid } from "../components/MainGrid";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProfileRelationsBox } from "../components/ProfileRelationsBox";
import { OrkutNostalgicIconSet } from "../components/OrkutNostalgicIconSet";

import { CapelakutMenu } from "../lib/CapelakutCommons";

import { githubApi } from "../services/github";
import { getAllComunities, getAllComunityRecords } from "../services/datoCms";
import myProjects from "../services/myProjects.json";

export default function Home({ allComunityRecords }) {
  const [friendsList, setFriendsList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allComunities, setAllComunities] = useState([...allComunityRecords]);
  const githubUser = "capelaum";

  useEffect(() => {
    githubApi
      .get("followers")
      .then(response => setFriendsList(response.data))
      .catch(error => console.error(error));
    setProjects(myProjects);
  }, []);

  function handleCreateCommunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const imageUrl = formData.get("image");

    if (title.trim() === "" || imageUrl.trim() === "") {
      alert("Por favor preencha os campos para criar um novo projeto 🙃");
      return;
    }

    const newComunity = {
      title,
      imageUrl,
      creatorSlug: githubUser,
    };

    fetch("api/comunities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComunity),
    }).then(async response => {
      const data = await response.json();
      setAllComunities([...allComunities, data.record]);
    });

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
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Qual vai ser o nome da Comunidade?"
                  aria-label="Qual vai ser o nome da Comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox data={projects} isProjectsList />
          <ProfileRelationsBox data={friendsList} isFriendsList />
          <ProfileRelationsBox data={allComunities} isComunitiesList />
        </div>
      </MainGrid>
    </>
  );
}

export async function getStaticProps() {
  const COMUNITY_QUERY = `query {
    allComunities {
      id
      title
      creatorSlug
      imageUrl
    }
  }`;

  const data = await getAllComunities({
    query: COMUNITY_QUERY,
  });

  const allComunityRecords = await getAllComunityRecords();

  return {
    props: { allComunityRecords },
  };
}
