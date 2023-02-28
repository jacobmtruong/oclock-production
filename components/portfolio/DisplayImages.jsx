import { getAllImage } from "../../data/images";
import Fade from "react-reveal/Fade";
import classes from "../../styles/portfoliostyles/displayimages.module.css";
import React, { useState } from "react";
import ModalImage from "react-modal-image";

import Link from "next/link";

const DisplayImages = () => {
  const data = getAllImage();
  const [show, setShow] = useState(false);

  return (
    <Fade>
      <div className={classes.container}>
        {data.map((image, i) => (
          <ModalImage
            small={image.url}
            large={image.url}
            className={classes.card}
            alt={image.content}
            hideDownload="true"
          />
        ))}
      </div>
    </Fade>
  );
};

export default DisplayImages;
