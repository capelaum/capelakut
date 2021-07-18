import { useEffect, useState } from "react";
import Head from "next/head";
import nookies from "nookies";
import { toast } from "react-toastify";

import { FormBox } from "../components/FormBox";
import { MainGrid } from "../components/MainGrid";
import { WelcomeBox } from "../components/WelcomeBox";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { TestimonialsBox } from "../components/TestimonialsBox";
import { ProfileRelationsBox } from "../components/ProfileRelationsBox";

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
  const [projects, setProjects] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const allComunitiesData = allComunityRecords ?? [];
  const allTestimonialsData = allTestimonialRecords ?? [];

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

    if (text.trim() === "") {
      toast.error("Por favor preencha o campo para Enviar Depoimento 🙃");
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

    e.target.testimonial.value = "";
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
          <WelcomeBox githubUser={githubUser} />

          <FormBox
            handleCreateCommunity={handleCreateCommunity}
            handleCreateTestimonial={handleCreateTestimonial}
          />

          <TestimonialsBox allTestimonials={allTestimonials} />
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
