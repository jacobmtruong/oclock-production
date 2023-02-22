import Head from "next/head";
import { Inter } from "@next/font/google";
import { MainBanner } from "../components/main/MainBanner";
import { Food } from "../components/sliders/Food.jsx";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <MainBanner />
        <Food />
      </Head>
    </>
  );
}
