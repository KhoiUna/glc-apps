import Head from "next/head";
import { useEffect } from "react";
import Header from "../components/header";
import useLogin from "../lib/useLogin";

export default function Layout({ children, componentName }) {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#46166b" />
        <meta name="description" content="GLC Admin app" />
        <link rel="apple-touch-icon" href="/images/192x192.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>GLC | {componentName}</title>
      </Head>

      <header>
        <Header headerText={componentName} />
      </header>

      <main>{children}</main>
    </>
  );
}
