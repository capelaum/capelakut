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
import {
  getAllComunityRecords,
  getAllTestimonialRecords,
} from "../services/datoCms";

export default function Home({
  allComunityRecords,
  allTestimonialRecords,
  githubUser,
}) {
  const allComunitiesData = allComunityRecords ? allComunityRecords : [];
  const allTestimonialsData = allTestimonialRecords
    ? allTestimonialRecords
    : [];

  const [projects, setProjects] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isComunityOption, setIsComunityOption] = useState(true);
  const [allComunities, setAllComunities] = useState([...allComunitiesData]);

  const [allTestimonials, setAllTestimonials] = useState([
    ...allTestimonialsData,
  ]);

  useEffect(() => {
    githubApi
      .get(`${githubUser}/followers`)
      .then(response => setFriendsList(response.data))
      .catch(error => console.error(error));
    setProjects(myProjects);
  }, []);

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
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

    e.target.title.value = "";
    e.target.image.value = "";
    e.target.url.value = "";
  }

  function handleCreateTestimonial(e) {
    e.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("testimonial");
    console.log("🚀 ~ testimonial", text);

    if (text.trim() === "") {
      toast.error("Por favor preencha o campo para Criar Depoimento 🙃");
      return;
    }

    const newTestimonial = {
      text,
      githubUser,
    };

    fetch("api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTestimonial),
    }).then(async response => {
      const data = await response.json();
      setAllTestimonials([...allTestimonials, data.record]);
    });

    event.target.testimonial.value = "";
  }

  function handleSetActiveButton(e) {
    e.preventDefault();

    const optionButtons = document.getElementsByClassName("option-btn");
    Array.from(optionButtons).forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    const isComunityOption = e.target.id === "comunity-btn" ? true : false;
    setIsComunityOption(isComunityOption);
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
              id="comunity-btn"
              className="option-btn active"
              onClick={e => handleSetActiveButton(e)}
            >
              Criar Comunidade
            </button>

            <button
              id="testimonial-btn"
              className="option-btn"
              onClick={e => handleSetActiveButton(e)}
            >
              Escrever depoimento
            </button>

            {isComunityOption ? (
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
            ) : (
              <form onSubmit={handleCreateTestimonial}>
                <div>
                  <textarea
                    name="testimonial"
                    placeholder="Deixe um depoimento 🙃"
                    aria-label="Deixe um depoimento 🙃"
                  ></textarea>
                </div>
                <button className="submit-btn">Enviar Depoimento</button>
              </form>
            )}
          </Box>

          <Box>
            <h2 className="smallTitle">
              Depoimentos ({allTestimonials.length})
            </h2>
            <ul className="testimonials-list">
              {allTestimonials.sort().map(testimonial => (
                <li key={testimonial.id}>
                  <figure>
                    <a
                      href={`https://github.com/${testimonial.username}`}
                      target="_blank"
                      className="username"
                    >
                      <img
                        src={`https://github.com/${testimonial.username}.png`}
                        alt={testimonial.username}
                      />
                    </a>
                  </figure>

                  <div className="content">
                    <a href="" className="boxLink">
                      @{testimonial.username}
                    </a>
                    <p>{testimonial.text}</p>
                  </div>
                </li>
              ))}
            </ul>
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
  const allTestimonialRecords = await getAllTestimonialRecords();

  return {
    props: { allComunityRecords, allTestimonialRecords, githubUser },
  };
}
