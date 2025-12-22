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
    <div className={classes.container}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <p>Crisp and compelling photography for your brand</p>

        <div className={classes.rightcontainer}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
            recusandae consequuntur consequatur maiores quibusdam voluptatem aut
            maxime repudiandae nobis quisquam labore molestiae voluptas,
            praesentium.
          </p>

          <Link href="/portfolio">Explore</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TextBanner;
