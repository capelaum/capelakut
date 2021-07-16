<div align="center">
  <img src=".github/Capelakut.png" />
  <h3>Um clone modificado do falecido orkut</h3>

  <img alt="capelakut size" src="https://img.shields.io/github/repo-size/capelaum/capelakut?color=D81D99">

  <img alt="capelakut language count" src="https://img.shields.io/github/languages/count/capelaum/capelakut?color=D81D99">

  <img alt="capelakut last commit" src="https://img.shields.io/github/last-commit/capelaum/capelakut?color=D81D99">

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=D81D99">
</div>

## Como executar

Instale as dependências do projeto, executando os comandos no diretório raiz

```bash
npm install
# ou
yarn
```

Para buscar dados do [DatoCMS][datocms], precisa-se criar uma conta, configurar o modelo `Comunity` com os campos nomes `title`, `imageUrl` e `creatorSlug`, todos do tipo texto. Após isso, deve-se criar as variaveis de ambiente do seu projeto com os 2 tokens de escrita e acesso geral do seu projeto no arquivo `.env.local`, com os nomes:

- DATOCMS_READ_API_TOKEN
- DATOCMS_FULL_API_TOKEN

Além disso deve-se pegar o ID do modelo Comunity criado em sua conta e trocar pelo valor encontrado no arquivo `src/pages/api/comunities.js`

```javascript
const record = await client.items.create({
  itemType: "YOUR_MODEL_ID", // model ID - troque pelo ID do seu Modelo
  title,
  imageUrl,
  creatorSlug,
});
```

Depois rode o projeto como ambiente de desenvolvimento na porta 3000 com o comando

```bash
npm run dev
# ou
yarn dev
```

## Tecnologias

- [React.js][reactjs]
- [Next.js][next]
- [DatoCMS][datocms]
- [Axios][axios]
- [GraphQL][graphql]

## Layout

[Figma Design][figma]

## Créditos

Projeto feito no evento de Imersão React 3.0 da [Alura][alura] 💙

[reactjs]: https://pt-br.reactjs.org
[next]: https://nextjs.org
[alura]: https://www.alura.com.br
[figma]: https://www.figma.com/file/xHF0n0qxiE2rqjqAILiBUB/Alurakut?node-id=58%3A0
[axios]: https://axios-http.com/docs/intro
[graphql]: https://graphql.org
[datocms]: https://www.datocms.com/
