import React from "react";
import icon from "../../styles/images/circleicon.jpg";
import classes from "../../styles/mainpage/oclockIcon.module.css";
import Image from "next/image";

const OclockIcon = () => {
  return (
    <div className={classes.container}>
      <Image src={icon} className={classes.image} />
    </div>
  );
};

export default OclockIcon;
