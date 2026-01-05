import Head from "next/head";
import "@nextcss/reset";
import { useMemo, useState, useCallback } from "react";

import { MainBanner } from "../components/main/MainBanner";
import ImageBannerMain from "../components/main/ImageBannerMain";
import { LandscapeCarousel } from "../components/sliders/LandscapeCarousel.jsx";
import TextBanner from "../components/main/TextBanner";
import Portfolio from "../components/main/PortfolioBoard";
import Footer from "../components/main/Footer";

import FullPageLoader from "../components/ui/FullPageLoader";

export default function Home() {
  const TOTAL = useMemo(() => 2, []);
  const [readyCount, setReadyCount] = useState(0);

  const markReady = useCallback(() => {
    setReadyCount((c) => (c < TOTAL ? c + 1 : c));
  }, [TOTAL]);

  const ready = readyCount >= TOTAL;

  return (
    <>
      <Head>
        <title>O'CLOCK PRODUCTION</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ✅ show loader OVER the page, but keep page mounted so effects run */}
      {!ready && <FullPageLoader />}

      {/* Optional: prevent user interaction while loading */}
      <div style={{ pointerEvents: ready ? "auto" : "none" }}>
        <MainBanner />
        <ImageBannerMain />

        <LandscapeCarousel onReady={markReady} />
        <TextBanner />
        <Portfolio onReady={markReady} />

        <Footer />
      </div>
    </>
  );
}
