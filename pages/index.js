import Head from "next/head";
import { MainBanner } from "../components/main/MainBanner";
import "@nextcss/reset";
import { LandscapeCarousel } from "../components/sliders/LandscapeCarousel.jsx";
import TextBanner from "../components/main/TextBanner";
import Portfolio from "../components/main/PortfolioBoard";
import Footer from "../components/main/Footer";
import ImageBannerMain from "../components/main/ImageBannerMain";

export default function Home() {
  return (
    <>
      <Head>
        <title>O'CLOCK PRODUCTION</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBanner />
      <ImageBannerMain />
      <LandscapeCarousel />
      <TextBanner />
      <Portfolio />
      <Footer />
    </>
  );
}
