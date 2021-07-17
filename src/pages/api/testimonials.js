import { SiteClient } from "datocms-client";

export default async function createComunity(req, res) {
  if (req.method === "POST") {
    const client = new SiteClient(process.env.DATOCMS_FULL_API_TOKEN);
    const { text, githubUser } = req.body;

    const record = await client.items.create({
      itemType: "976161", // model ID
      text,
      username: githubUser,
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
