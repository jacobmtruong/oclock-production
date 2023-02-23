import { Inter } from "@next/font/google";
import { MainBanner } from "../components/main/MainBanner";
import { LandscapeCarousel } from "../components/sliders/LandscapeCarousel.jsx";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainBanner />
      <LandscapeCarousel />
    </>
  );
}
