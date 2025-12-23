import classes from "../../styles/mainpage/textbanner.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const TextBanner = () => {
  return (
    <motion.div
      className={classes.container}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <p>Crisp and compelling photography for your brand</p>

      <div className={classes.rightcontainer}>
        <p>
          Rooted in visual storytelling, each frame balances clarity and mood
          through thoughtful composition and light, resulting in imagery that
          feels composed, modern, and quietly confident.
        </p>

        <Link href="/portfolio">Explore</Link>
      </div>
    </motion.div>
  );
};

export default TextBanner;
