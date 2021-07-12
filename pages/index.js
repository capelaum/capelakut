import styled from "styled-components";
import { MainGrid } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";
import {
  CapelakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/CapelakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt={githubUser} />
    </Box>
  );
}

export default function Home() {
  const githubUser = "capelaum";
  const favoriteFriends = ["peas", "omariosouto", "diego3g", "felipefialho"];

  return (
    <>
      <CapelakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus Amigos ({favoriteFriends.length})
            </h2>
            <ul>
              {favoriteFriends.map(friend => (
                <li>
                  <a href={`/users/${friend}`} key={friend}>
                    <img
                      src={`https://github.com/${friend}.png`}
                      alt={friend}
                    />
                    <span>{friend}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
