import { getAllImage } from "../../data/images";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";
import { useState } from "react";

const DisplayImages = () => {
  const data = getAllImage();
  const [images, setImages] = useState(data);

  const getFood = () => {
    const food = data.filter((image) => image.category === "food");
    setImages(food);
  };

  const getBeverage = () => {
    const beverage = data.filter((image) => image.category === "beverage");
    setImages(beverage);
  };

  const getArchitecture = () => {
    const architecture = data.filter(
      (image) => image.category === "architecture"
    );
    setImages(architecture);
  };

  const getLifestyle = () => {
    const lifestyle = data.filter((image) => image.category === "lifestyle");
    setImages(lifestyle);
  };

  return (
    <div className={classes.container}>
      {images.map((image, i) => (
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
