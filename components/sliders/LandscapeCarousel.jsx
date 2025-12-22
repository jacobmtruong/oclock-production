import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "../../styles/sliders/landscapecarousel.module.css";
import { motion } from "framer-motion";

/* =========================
   Animation variants
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const LandscapeCarousel = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  /* =========================
     Fetch once (FIXED)
  ========================= */
  useEffect(() => {
    setLoading(true);

    fetch("/api/photography/landscape")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []); // ✅ run once only

  return (
    <div className={classes.container}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* =========================
            Carousel
        ========================= */}
        <Carousel className={classes.carousel} fade>
          {isLoading && (
            <Carousel.Item>
              <div style={{ height: "60vh" }} />
            </Carousel.Item>
          )}

          {data?.map((picture, i) => (
            <Carousel.Item className={classes.carouselitem} key={i}>
              <Carousel.Caption className={classes.caption}>
                <h3>{picture.content}</h3>
              </Carousel.Caption>

              <img
                className="d-block w-100"
                src={picture.url}
                alt={picture.content}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* =========================
            Content
        ========================= */}
        <div className={classes.content}>
          <p className={classes.title}>Take your business to the next level</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
            repudiandae? Provident officia nisi molestias, repudiandae, sed
            alias voluptatum voluptatibus consectetur repellendus assumenda quo
            temporibus? Autem nemo consequuntur adipisci nam blanditiis!
          </p>

          <Link href="/contact">Find out how</Link>
        </div>
      </motion.div>
    </div>
  );
};
