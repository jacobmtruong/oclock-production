import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "../../styles/sliders/landscapecarousel.module.css";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const LandscapeCarousel = ({ onReady }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // ✅ ensure onReady is called only once
  const didReportReady = useRef(false);
  const reportReadyOnce = () => {
    if (didReportReady.current) return;
    didReportReady.current = true;
    onReady?.();
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/photography/landscape")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);

        // ✅ consider "ready" when data is received (even if empty array)
        reportReadyOnce();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);

        // ✅ still report ready so global loader won't hang forever
        reportReadyOnce();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className={classes.container}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Carousel */}
      <div className={classes.carouselWrap}>
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
      </div>

      {/* Content */}
      <div className={classes.content}>
        <p className={classes.title}>Take your business to the next level</p>

        <p>
          Food and product photography built to take your business to the next
          level. Through refined lighting, modern composition, and visual
          storytelling, brands are elevated and products are brought to life
          across digital and print.
        </p>

        <Link href="/contact">Find out how</Link>
      </div>
    </motion.div>
  );
};

export default LandscapeCarousel;
