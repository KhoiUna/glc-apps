import Head from "next/head";

export default function Layout({ children, componentName }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Reserve your cooking time slot here"
        />
        <link rel="apple-touch-icon" href="/images/192x192.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>GLC | {componentName}</title>
      </Head>

      <main>{children}</main>
    </>
  );
}
