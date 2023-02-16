import { Html, Head, Main, NextScript } from "next/document";
import loader from "../src/loader";

export default function Document() {
  return (
    <Html>
      <Head />
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
