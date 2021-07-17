import jwt from "jsonwebtoken";

export default async function githubAuth(req, res) {
  const { authorization } = req.headers;
  const tokenDecoded = jwt.decode(authorization);

  if (!tokenDecoded) {
    return res.send({
      isAuthenticated: false,
    });
  }

  const { githubUser } = tokenDecoded;
  const data = await fetch(`https://api.github.com/users/${githubUser}`).then(
    response => response.json()
  );

  const isTokenValid = data.message === "Not Found" || !data ? false : true;

  res.send({
    isAuthenticated: isTokenValid,
    githubUser,
  });
}
