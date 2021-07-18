import { Box } from "../Box";
import { OrkutNostalgicIconSet } from "../OrkutNostalgicIconSet";

export function WelcomeBox({ githubUser }) {
  return (
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
  );
}
