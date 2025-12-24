import classes from "../../styles/mainpage/portfolioboard.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Portfolio = () => {
  const [data, setData] = useState([]); // ✅ array default
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/seed/portfoliocards");
        const json = await res.json();

        if (!alive) return;

        if (!res.ok) {
          setError(json?.message || "Failed to load portfolio cards");
          setData([]);
          console.log(setData);

          return;
        }

        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        if (!alive) return;
        console.log(err);
        setError("Network error");
        setData([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className={classes.container}>
      <p className={classes.title}>
        <span
          style={{
            textTransform: "uppercase",
            fontWeight: "300",
            letterSpacing: "5px",
          }}
        >
          Portfolio
        </span>{" "}
      </p>

      <motion.div
        className={classes.cardcontainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {isLoading && <p style={{ color: "white" }}>Loading...</p>}

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {!isLoading && !error && data.length === 0 && (
          <p style={{ color: "white" }}>No portfolio cards found.</p>
        )}

        {data.map((card) => (
          <motion.div key={card._id || card.id} variants={itemVariants}>
            <Link href={`/portfolio/${card.slug}`} className={classes.cardlink}>
              <div className={classes.cardcover}>
                <img
                  src={card.url}
                  className={classes.card}
                  alt={card.content}
                />
                <p className={classes.content}>{card.content}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <Link href="/contact" className={classes.getintouch}>
        Get in touch
      </Link>
    </div>
  );
};

export default Portfolio;
