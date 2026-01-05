import Head from "next/head";
import "@nextcss/reset";
import { useEffect, useState } from "react";

import { MainBanner } from "../components/main/MainBanner";
import ImageBannerMain from "../components/main/ImageBannerMain";
import { LandscapeCarousel } from "../components/sliders/LandscapeCarousel.jsx";
import TextBanner from "../components/main/TextBanner";
import Portfolio from "../components/main/PortfolioBoard";
import Footer from "../components/main/Footer";

import FullPageLoader from "../components/ui/FullPageLoader";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // If everything already loaded (bfcache / fast reload)
    if (document.readyState === "complete") {
      // small delay prevents flash on fast connections
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 250);
      return;
    }

    const onLoad = () => {
      // Optional: small delay so carousel has time to mount smoothly
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 250);
    };

    window.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!ready) return <FullPageLoader />;

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
