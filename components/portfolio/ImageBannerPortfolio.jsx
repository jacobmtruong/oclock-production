import classes from "../../styles/portfoliostyles/imagebannerportfolio.module.css";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ImageBannerPortfolio = () => {
  return (
    <div className={classes.container}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className={classes.title}>Portfolio</p>
        <p className={classes.subtitle}></p>
      </motion.div>
    </div>
  );
};

export default ImageBannerPortfolio;
