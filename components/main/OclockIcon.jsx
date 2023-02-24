import React from "react";
import icon from "../../styles/images/circleicon.png";
import classes from "../../styles/mainpage/oclockIcon.module.css";
import Image from "next/image";

const OclockIcon = () => {
  return (
    <div className={classes.container}>
      {/* <Link href="" className={classes.button}>
        Book an Appointment
      </Link> */}

      <p className={classes.text}>PR</p>
      <Image src={icon} className={classes.image} />
      <p className={classes.text}>DUCTION</p>
    </div>
  );
};

export default OclockIcon;
