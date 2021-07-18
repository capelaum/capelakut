import { useEffect, useState } from "react";
import { Box } from "../Box";
import { OrkutNostalgicIconSet } from "../OrkutNostalgicIconSet";

export function WelcomeBox({ githubUser }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => setQuote(data.content));
  }, []);
  return (
    <Box>
      <h1 className="title">Bem vindo(a), {githubUser}</h1>
      <span className="quote">
        <strong>Sorte de hoje:</strong> {quote}
      </span>
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
