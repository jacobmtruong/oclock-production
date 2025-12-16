import { getAllImage } from "../../data/images";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";
import { useMemo, useState } from "react";

const CATEGORY_TABS = [
  { key: "fnb", label: "Food & Beverage" },
  { key: "product", label: "Product" },
  { key: "architecture", label: "Architecture" },
  { key: "lifestyle", label: "Lifestyle" },
];

const FILTER_TABS = [
  { key: "all", label: "all" },
  { key: "landscape", label: "landscape" },
  { key: "portrait", label: "portrait" },
  { key: "favorites", label: "favorites" },
];

const DisplayImages = () => {
  const data = useMemo(() => getAllImage(), []);

  const [activeCategory, setActiveCategory] = useState("fnb");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredImages = useMemo(() => {
    let result = [...data];

    // category filter
    if (activeCategory === "fnb") {
      result = result.filter(
        (img) => img.category === "food" || img.category === "beverage"
      );
    } else {
      result = result.filter((img) => img.category === activeCategory);
    }

    // view/favorite filter
    if (activeFilter === "favorites") {
      result = result.filter((img) => img.favorite);
    } else if (activeFilter === "landscape" || activeFilter === "portrait") {
      result = result.filter((img) => img.view === activeFilter);
    }

    return result;
  }, [data, activeCategory, activeFilter]);

  const title =
    CATEGORY_TABS.find((t) => t.key === activeCategory)?.label || "Portfolio";

  return (
    <div className={classes.bigcontainer}>
      {/* TITLE + TOGGLES */}
      <div className={classes.title}>
        <h1>{title}</h1>
        <p>Click any image to view it larger.</p>

        {/* ✅ Category Tabs (no routing) */}
        <div className={classes.categoryBar}>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveCategory(tab.key);
                setActiveFilter("all"); // optional reset on category switch
              }}
              className={`${classes.categoryTab} ${
                activeCategory === tab.key ? classes.categoryActive : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ Filter Tabs */}
        <div className={classes.filterBar}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`${classes.filterBtn} ${
                activeFilter === tab.key ? classes.filterActive : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className={classes.container}>
        {filteredImages.length === 0 ? (
          <p style={{ color: "white" }}>No images found.</p>
        ) : (
          filteredImages.map((image) => (
            <ModalImage
              small={image.url}
              large={image.url}
              className={classes.card}
              alt={image.content}
              hideDownload
              key={`${image.category}-${image.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayImages;
