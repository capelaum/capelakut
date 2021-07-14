import { useEffect, useState } from "react";
import { api } from "../services/github";
import { MainGrid } from "../components/MainGrid";
import { Box } from "../components/Box";
import { CapelakutMenu, OrkutNostalgicIconSet } from "../lib/CapelakutCommons";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";

export default function Home() {
  const githubUser = "capelaum";
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    api.get("followers").then(response => setFriendsList(response.data));
  }, []);

  return (
    <>
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
