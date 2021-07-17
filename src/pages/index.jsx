import { useEffect, useState } from "react";
import Head from "next/head";
import nookies from "nookies";
import { toast } from "react-toastify";

import { Box } from "../components/Box";
import { MainGrid } from "../components/MainGrid";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProfileRelationsBox } from "../components/ProfileRelationsBox";
import { OrkutNostalgicIconSet } from "../components/OrkutNostalgicIconSet";

import { CapelakutMenu } from "../lib/CapelakutCommons";

import { githubApi } from "../services/github";
import myProjects from "../services/myProjects.json";
import { getAllComunityRecords } from "../services/datoCms";

export default function Home({ allComunityRecords, githubUser }) {
  const [friendsList, setFriendsList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allComunities, setAllComunities] = useState([...allComunityRecords]);
  const [activeButton, setActiveButton] = useState(false);

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
    const url = formData.get("url");

    if (title.trim() === "" || imageUrl.trim() === "" || url.trim() === "") {
      toast.error(
        "Por favor preencha todos os campos para criar uma nova Comunidade 🙃"
      );
      return;
    }

    const newComunity = {
      title,
      imageUrl,
      url,
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
    event.target.url.value = "";
  }

  function handleSetActiveButton(e) {
    e.preventDefault();

    const optionButtons = document.getElementsByClassName("option-btn");
    Array.from(optionButtons).forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active");
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
            <OrkutNostalgicIconSet
              recados={5}
              fotos={33}
              videos={15}
              fas={999}
              mensagens={666}
              confiavel={3}
              legal={3}
              sexy={3}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <button
              className="option-btn active"
              onClick={e => handleSetActiveButton(e)}
            >
              Criar Comunidade
            </button>

            <button
              className="option-btn"
              onClick={e => handleSetActiveButton(e)}
            >
              Escrever depoimento
            </button>

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
                  name="url"
                  placeholder="Coloque uma URL para a Comunidade"
                  aria-label="Coloque uma URL para a Comunidade"
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

              <button className="submit-btn">Criar Comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox data={projects} isProjectsList />
          <ProfileRelationsBox data={allComunities} isComunitiesList />
          <ProfileRelationsBox data={friendsList} isFriendsList />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated, githubUser } = await fetch(
    "https://capelakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then(response => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const allComunityRecords = await getAllComunityRecords();

  return {
    props: { allComunityRecords, githubUser },
  };
}
