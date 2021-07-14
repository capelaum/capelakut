import { useEffect, useState } from "react";

import { MyHead } from "../components/Head";
import { MainGrid } from "../components/MainGrid";
import { Box } from "../components/Box";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";

import { CapelakutMenu, OrkutNostalgicIconSet } from "../lib/CapelakutCommons";

import { api } from "../services/github";

export default function Home() {
  const githubUser = "capelaum";
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    api.get("followers").then(response => setFriendsList(response.data));
  }, []);

  return (
    <>
      <MyHead page="Home" />
      <CapelakutMenu />
      <MainGrid>
        <div className="profileArea">
          <Box>
            <img
              src={`https://github.com/${githubUser}.png`}
              alt={githubUser}
            />
          </Box>
        </div>
        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
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
            <a href="#">Ver Todos</a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
