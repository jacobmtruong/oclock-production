import { MainBanner } from "../../components/main/MainBanner";
import DisplayImages from "../../components/portfolio/DisplayImages";
import ImageBannerPortfolio from "../../components/portfolio/ImageBannerPortfolio";
import Footer from "../../components/main/Footer";

export default function Portfolio() {
  return (
    <div>
      <MainBanner />
      <ImageBannerPortfolio />
      <DisplayImages />
      <Footer />
    </div>
  );
}
