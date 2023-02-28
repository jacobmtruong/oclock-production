import { shuffleImages } from "../../data/images";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import classes from "../../styles/portfoliostyles/displayimages.module.css";

const DisplayImages = () => {
  const data = shuffleImages();
  return (
    <div className={classes.container}>
      <Fade bottom>
        {data.map((image) => (
          <Image
            src={image.url}
            height={500}
            width={500}
            className={classes.card}
          />
        ))}
      </Fade>
    </div>
  );
};

export default DisplayImages;
