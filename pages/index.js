import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { MainBanner } from "../components/main/MainBanner";
import OclockIcon from "../components/main/OclockIcon.jsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <MainBanner />
        <OclockIcon />
      </Head>
    </>
  );
}
