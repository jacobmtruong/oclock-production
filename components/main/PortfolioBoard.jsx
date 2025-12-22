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
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/photography/portfoliocards")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // ✅ run once (prevents infinite fetch loop)
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

        {data &&
          data.map((card) => (
            <motion.div key={card.id} variants={itemVariants}>
              <Link
                href={`/portfolio/${card.slug}`}
                className={classes.cardlink}
              >
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
