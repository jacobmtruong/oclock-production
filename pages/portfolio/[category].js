import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MainBanner } from "../../components/main/MainBanner";
import Footer from "../../components/main/Footer";
import photography from "../../data/data";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";

const CATEGORY_TABS = [
  { key: "fnb", label: "Food & Beverage" },
  { key: "product", label: "Product" },
  { key: "architecture", label: "Architecture" },
  { key: "lifestyle", label: "Lifestyle" },
];

function getImagesByCategory(category) {
  if (category === "fnb") {
    return [
      ...(photography.food?.landscape || []),
      ...(photography.food?.portrait || []),
      ...(photography.beverage?.landscape || []),
      ...(photography.beverage?.portrait || []),
    ];
  }

  return [
    ...(photography[category]?.landscape || []),
    ...(photography[category]?.portrait || []),
  ];
}

export default function PortfolioCategoryPage() {
  const router = useRouter();
  const category =
    typeof router.query.category === "string" ? router.query.category : "";

  const [filter, setFilter] = useState("all"); // all | landscape | portrait

  const images = useMemo(() => {
    if (!category) return [];

    if (category === "fnb") {
      const foodL = photography.food?.landscape || [];
      const foodP = photography.food?.portrait || [];
      const bevL = photography.beverage?.landscape || [];
      const bevP = photography.beverage?.portrait || [];

      if (filter === "landscape") return [...foodL, ...bevL].filter(Boolean);
      if (filter === "portrait") return [...foodP, ...bevP].filter(Boolean);

      return [...foodL, ...foodP, ...bevL, ...bevP].filter(Boolean);
    }

    const L = photography[category]?.landscape || [];
    const P = photography[category]?.portrait || [];

    if (filter === "landscape") return L.filter(Boolean);
    if (filter === "portrait") return P.filter(Boolean);

    return [...L, ...P].filter(Boolean);
  }, [category, filter]);

  const titleMap = {
    fnb: "Food & Beverage",
    product: "Product",
    architecture: "Architecture",
    lifestyle: "Lifestyle",
  };

  const pageTitle = titleMap[category] || category || "Portfolio";

  if (!category) return null;

  return (
    <>
      <Head>
        <title>{pageTitle} | O&apos;CLOCK PRODUCTION</title>
      </Head>

      <MainBanner />

      <main className={classes.bigcontainer}>
        <div className={classes.title}>
          <h1>{pageTitle}</h1>
          <p>
            Click any image to view it larger.{" "}
            <Link href="/portfolio">Back to portfolio overview</Link>
          </p>

          {/* CATEGORY BAR */}
          <div className={classes.categoryBar}>
            {CATEGORY_TABS.map((tab) => (
              <Link
                key={tab.key}
                href={`/portfolio/${tab.key}`}
                scroll={false}
                onClick={() => setFilter("all")} // reset filter on category change
                className={`${classes.categoryTab} ${
                  category === tab.key ? classes.categoryActive : ""
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* FILTER BAR (Favorites removed) */}
          <div className={classes.filterBar}>
            {["all", "landscape", "portrait"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`${classes.filterBtn} ${
                  filter === key ? classes.filterActive : ""
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className={classes.container}>
          {images.length === 0 ? (
            <p style={{ color: "white" }}>No images found.</p>
          ) : (
            images.map((image, i) => (
              <ModalImage
                key={`${category}-${image.id}-${i}`}
                small={image.url}
                large={image.url}
                className={classes.card}
                alt={image.content}
                hideDownload
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
