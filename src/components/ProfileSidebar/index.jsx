import { CapelakutProfileSidebarMenuDefault } from "../../lib/CapelakutCommons";
import { Box } from "../Box";

export function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} alt={githubUser} />
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
  );
}
