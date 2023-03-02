import { getAllImage } from "../../data/images";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import ModalImage from "react-modal-image";
import { useState } from "react";

const DisplayImages = () => {
  const data = getAllImage();
  const [images, setImages] = useState(data);

  const getAll = () => {
    setImages(data);
  };

  const getFoodBeverage = () => {
    const food = data.filter(
      (image) => image.category === "food" || image.category === "beverage"
    );
    setImages(food);
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

  const getProduct = () => {
    const product = data.filter((image) => image.category === "product");
    setImages(product);
  };

  return (
    <div className={classes.bigcontainer}>
      <div className={classes.filter}>
        <button onClick={getAll}>All</button>
        <button onClick={getFoodBeverage}>F&B</button>
        <button onClick={getArchitecture}>Architecure</button>
        <button onClick={getLifestyle}>Lifestyle</button>
        <button onClick={getProduct}>Product</button>
      </div>

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
    </div>
  );
};

export default DisplayImages;
