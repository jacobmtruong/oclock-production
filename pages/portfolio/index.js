import { MainBanner } from "../../components/main/MainBanner";
import DisplayImages from "../../components/portfolio/DisplayImages";
import ImageBannerPortfolio from "../../components/portfolio/ImageBannerPortfolio";

export default function Portfolio() {
  return (
    <div>
      <MainBanner />
      <ImageBannerPortfolio />
      <DisplayImages />
    </div>
  );
}
