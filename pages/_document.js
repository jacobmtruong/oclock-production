import { Html, Head, Main, NextScript } from "next/document";
import loader from "../src/loader";

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Raleway:wght@200;400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <head>
        <style>{loader}</style>
      </head>
      <body>
        <div id={"globalLoader"}>
          <div className="loader">
            <div />
            <div />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
