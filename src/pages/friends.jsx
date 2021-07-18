import { useEffect, useState } from "react";
import Head from "next/head";
import nookies from "nookies";

import { getAllComunityRecords } from "../services/datoCms";

import { MainGrid } from "../components/MainGrid";
import { WelcomeBox } from "../components/WelcomeBox";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProfileRelationsBox } from "../components/ProfileRelationsBox";

import { CapelakutMenu } from "../lib/CapelakutCommons";
import myProjects from "../services/myProjects.json";
import { githubApi } from "../services/github";
import { Box } from "../components/Box";

export default function Comunities({ allComunities, githubUser }) {
  const [projects, setProjects] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    githubApi
      .get(`${githubUser}/followers`)
      .then(response => setFriendsList(response.data))
      .catch(error => console.error(error));

    setProjects(myProjects);
  }, []);

  return (
    <>
      <Head>
        <title>Capelakut | Comunities</title>
      </Head>
      <CapelakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea">
          <Box>
            <h2 className="title">Meus Amigos</h2>

            <span className="path">
              <a className="boxLink" href="/">
                Início
              </a>
              {" > "}
              Meus Amigos
            </span>

            <hr />
            <ul className="comunity-list">
              {friendsList.map(friend => (
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
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox data={projects} isProjectsList />
          <ProfileRelationsBox data={allComunities} isComunitiesList />
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

  const allComunities = await getAllComunityRecords();

  return {
    props: { allComunities, githubUser },
  };
}
