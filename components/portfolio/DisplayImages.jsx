import { getAllImage } from "../../data/images";
import Fade from "react-reveal/Fade";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";

const DisplayImages = () => {
  const data = getAllImage();

  return (
    <div className={classes.container}>
      {data.map((image, i) => (
        <ModalImage
          small={image.url}
          large={image.url}
          className={classes.card}
          alt={image.content}
          hideDownload="true"
          key={i}
        />
      ))}
    </div>
  );
};

export default DisplayImages;
