import React from "react";
import icon from "../../styles/images/circleicon.png";
import classes from "../../styles/mainpage/oclockIcon.module.css";
import Image from "next/image";

const OclockIcon = () => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>PR</p>
      <Image src={icon} className={classes.image} alt="brand-icon" />
      <p className={classes.text}>DUCTION</p>
    </div>
  );
};

export default OclockIcon;
