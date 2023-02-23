import Head from "next/head";
import { MainBanner } from "../components/main/MainBanner";
import icon from "../styles/images/circleicon.png";
import { LandscapeCarousel } from "../components/sliders/LandscapeCarousel.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>O'CLOCK PRODUCTION</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBanner />
      <LandscapeCarousel />
    </>
  );
}
