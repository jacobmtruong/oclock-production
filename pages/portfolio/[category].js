import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { MainBanner } from "../../components/main/MainBanner";
import Footer from "../../components/main/Footer";
import photography from "../../data/data";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";

function getImagesByCategory(category) {
  // always return an array of image objects { id, url, content, favorite }
  switch (category) {
    case "fnb":
      // combine food + beverage, both landscape + portrait
      return [
        ...(photography.food.landscape || []),
        ...(photography.food.portrait || []),
        ...(photography.beverage.landscape || []).filter(Boolean),
        ...(photography.beverage.portrait || []),
      ];

    case "product":
      return [
        ...(photography.product.landscape || []),
        ...(photography.product.portrait || []),
      ];

    // you can add more when you have data:
    // case "architecture":
    // case "lifestyle":
    //   return [...]

    default:
      return [];
  }
}

export default function PortfolioCategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category) return null;

  const images = (getImagesByCategory(category) || []).filter(Boolean);

  const titleMap = {
    fnb: "Food & Beverage",
    product: "Product",
  };

  const pageTitle = titleMap[category] || category;

  return (
    <>
      <Head>
        <title>{pageTitle} Photography | O&apos;CLOCK PRODUCTION</title>
      </Head>

      <MainBanner />

      {/* reuse displayimages.module.css for consistent look */}
      <main className={classes.bigcontainer}>
        <div className={classes.title}>
          <h1>{pageTitle}</h1>
          <p>
            Click any image to view it larger.{" "}
            <Link href="/portfolio">Back to portfolio overview</Link>
          </p>
        </div>

        <div className={classes.container}>
          {images.length === 0 ? (
            <p style={{ color: "white" }}>No images yet for this category.</p>
          ) : (
            images.map((image, i) => (
              <ModalImage
                key={`${category}-${image.id}-${i}`}
                small={image.url}
                large={image.url}
                className={classes.card}
                alt={image.content}
                hideDownload={true}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
