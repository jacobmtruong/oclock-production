import classes from "../../styles/portfoliostyles/imagebannerportfolio.module.css";
import Fade from "react-reveal/Fade";

const ImageBannerPortfolio = () => {
  return (
    <Fade>
      <div className={classes.container}>
        <div className={classes.banner}></div>
        <p className={classes.title}>Portfolio</p>
      </div>
    </Fade>
  );
};

export default ImageBannerPortfolio;
