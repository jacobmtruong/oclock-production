import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";
import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState("fnb");
  const [activeFilter, setActiveFilter] = useState("all");

  // store scroll position when user clicks tabs
  const scrollYRef = useRef(0);
  const shouldRestoreScrollRef = useRef(false);

  const rememberScroll = () => {
    if (typeof window === "undefined") return;
    scrollYRef.current = window.scrollY;
    shouldRestoreScrollRef.current = true;
  };

  // ✅ fetch from MongoDB API once
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolio/photos");
        const json = await res.json();

        if (!ignore) {
          // json is array of docs
          setData(Array.isArray(json) ? json : []);
        }
      } catch (e) {
        console.error(e);
        if (!ignore) setData([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

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
      result = result.filter((img) => !!img.favorite);
    } else if (activeFilter === "landscape" || activeFilter === "portrait") {
      result = result.filter((img) => img.view === activeFilter);
    }

    return result;
  }, [data, activeCategory, activeFilter]);

  // ✅ restore scroll AFTER render (and again after images settle)
  useLayoutEffect(() => {
    if (!shouldRestoreScrollRef.current) return;
    if (typeof window === "undefined") return;

    const y = scrollYRef.current;

    // 1) restore immediately after layout
    window.scrollTo({ top: y, left: 0, behavior: "auto" });

    // 2) restore again next frame (some layouts shift)
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    });

    // 3) restore again slightly later (images load async → height changes)
    const t = setTimeout(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
      shouldRestoreScrollRef.current = false;
    }, 250);

    return () => clearTimeout(t);
  }, [activeCategory, activeFilter, filteredImages.length]);

  const title =
    CATEGORY_TABS.find((t) => t.key === activeCategory)?.label || "Portfolio";

  return (
    <div className={classes.bigcontainer}>
      <div className={classes.title}>
        <h1>{title}</h1>
        <p>Click any image to view it larger.</p>

        {/* CATEGORY TABS */}
        <div className={classes.categoryBar}>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                rememberScroll();
                setActiveCategory(tab.key);
                setActiveFilter("all"); // optional reset
              }}
              className={`${classes.categoryTab} ${
                activeCategory === tab.key ? classes.categoryActive : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FILTER TABS */}
        <div className={classes.filterBar}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                rememberScroll();
                setActiveFilter(tab.key);
              }}
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
        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : filteredImages.length === 0 ? (
          <p style={{ color: "white" }}>No images found.</p>
        ) : (
          filteredImages.map((image) => (
            <ModalImage
              key={
                image._id || `${image.category}-${image.legacyId || image.url}`
              }
              small={image.url}
              large={image.url}
              className={classes.card}
              alt={image.content || "Portfolio image"}
              hideDownload
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayImages;
