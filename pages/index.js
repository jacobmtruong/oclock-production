import Head from "next/head";
import "@nextcss/reset";
import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {!ready && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            <FullPageLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional: prevent user interaction while loading */}
      <div
        style={{
          pointerEvents: ready ? "auto" : "none",
          visibility: ready ? "visible" : "hidden",
        }}
      >
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
