import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
