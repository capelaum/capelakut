import Head from "next/head";

export function MyHead({ page }) {
  return (
    <Head>
      <title>Capelakut | {page}</title>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </Head>
  );
}
