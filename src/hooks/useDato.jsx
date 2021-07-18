import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAllComunityRecords,
  getAllTestimonialRecords,
} from "../services/datoCms";

const DatoContext = createContext({});

export function DatoProvider({ children }) {
  // const allComunityRecords = getAllComunityRecords();
  // const allTestimonialRecords = getAllTestimonialRecords();

  // const allComunitiesData = allComunityRecords ?? [];
  // console.log("🚀 ~ allComunitiesData", allComunitiesData);

  // const allTestimonialsData = allTestimonialRecords ?? [];
  // console.log("🚀 ~ allTestimonialsData", allTestimonialsData);

  const [allComunities, setAllComunities] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);

  const fetchDatoCMS = useCallback(async () => {
    const allComunityRecords = await getAllComunityRecords();
    const allTestimonialRecords = await getAllTestimonialRecords();

    const allComunitiesData = allComunityRecords ?? [];
    console.log("🚀 ~ allComunitiesData", allComunitiesData);

    const allTestimonialsData = allTestimonialRecords ?? [];
    console.log("🚀 ~ allTestimonialsData", allTestimonialsData);

    setAllComunities([...allComunitiesData]);
    setAllTestimonials([...allTestimonialsData]);
  }, []);

  useEffect(() => {
    fetchDatoCMS();
  }, [fetchDatoCMS]);

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
    <DatoContext.Provider
      value={{
        allComunities,
        allTestimonials,
        handleCreateCommunity,
        handleCreateTestimonial,
      }}
    >
      {children}
    </DatoContext.Provider>
  );
}

export function useDato() {
  return useContext(DatoContext);
}
