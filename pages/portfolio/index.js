import { MainBanner } from "../../components/main/MainBanner";
import DisplayImages from "../../components/portfolio/DisplayImages";
import ImageBannerPortfolio from "../../components/portfolio/ImageBannerPortfolio";
import Footer from "../../components/main/Footer";
import Head from "next/head";

export default function Portfolio() {
  return (
    <div>
      <Head>
        <title>PORTFOLIO | O'CLOCK</title>
      </Head>
      <MainBanner />
      <ImageBannerPortfolio />
      <DisplayImages />
      <Footer />
    </div>
  );
}
