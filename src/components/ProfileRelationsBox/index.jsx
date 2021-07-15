import { ProfileRelationsBoxWrapper } from "./styles";

export function ProfileRelationsBox({ data, isFriendsList }) {
  if (isFriendsList) {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Meus Amigos ({data.length})</h2>
        <ul>
          {data.slice(0, 6).map(friend => (
            <li key={friend.login}>
              <a href={`https://github.com/${friend.login}`} target="_blank">
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
    );
  } else {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Meus Projetos ({data.length})</h2>
        <ul>
          {data.slice(0, 6).map(project => (
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
    );
  }
}
