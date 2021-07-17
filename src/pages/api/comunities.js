import { SiteClient } from "datocms-client";

export default async function createComunity(req, res) {
  if (req.method === "POST") {
    const client = new SiteClient(process.env.DATOCMS_FULL_API_TOKEN);
    const { title, imageUrl, url, creatorSlug } = req.body;

    const record = await client.items.create({
      itemType: "968816", // model ID
      title,
      imageUrl,
      url,
      creatorSlug,
    });

    console.log(record);

    res.json({
      record,
    });

    return;
  }

  res.status(404).json({
    message: "Nada para ver aqui 🙃",
  });
}
