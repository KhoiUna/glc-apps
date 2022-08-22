import Head from "next/head";
import { ReactChild } from "react";
import Header from "../components/header";
import useAuth from "../lib/useAuth";
import Link from "next/link";

export default function Layout({
  children,
  componentName,
}: {
  children: ReactChild | ReactChild[];
  componentName: string;
}) {
  const { data } = useAuth();

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
        <Header headerText={componentName} username={data?.user.username} />
      </header>

      <main>{children}</main>

      <footer
        style={{ margin: "4rem 2rem", textAlign: "center", fontWeight: "bold" }}
      >
        &copy; {new Date().getFullYear()} A product of{" "}
        <Link href={"https://www.khoiuna.info"} passHref>
          <a
            target={"_blank"}
            style={{ textDecoration: "underline", color: "#000" }}
          >
            Khoi Nguyen
          </a>
        </Link>
      </footer>
    </>
  );
}
