import { useState } from "react";
import { Box } from "../Box";

export function FormBox({ handleCreateCommunity, handleCreateTestimonial }) {
  const [isComunityOption, setIsComunityOption] = useState(true);

  function handleSetActiveButton(e) {
    e.preventDefault();

    const optionButtons = document.getElementsByClassName("option-btn");
    Array.from(optionButtons).forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    const isComunityOption = e.target.id === "comunity-btn" ? true : false;
    setIsComunityOption(isComunityOption);
  }

  return (
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
  );
}
