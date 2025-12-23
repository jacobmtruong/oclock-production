import React from "react";
import Image from "next/image";
import icon from "../../styles/images/circleicon.png";
import classes from "../../styles/mainpage/oclockIcon.module.css";

const OclockIcon = () => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>PR</p>

      <div className={classes.iconWrap}>
        <Image
          src={icon}
          alt="brand-icon"
          fill
          priority
          sizes="(max-width: 480px) 40vw, (max-width: 800px) 25vw, 8vh"
          className={classes.image}
        />
      </div>

      <p className={classes.text}>DUCTION</p>
    </div>
  );
};

export default OclockIcon;
