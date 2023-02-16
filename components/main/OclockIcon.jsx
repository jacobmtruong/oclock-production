import React from "react";
import icon from "../../styles/images/circleicon.png";
import classes from "../../styles/mainpage/oclockIcon.module.css";
import Image from "next/image";
import Link from "next/link";

const OclockIcon = () => {
  return (
    <div className={classes.container}>
      <Link href="" className={classes.button}>
        Book an Appointment
      </Link>
      <Image src={icon} className={classes.image} />
    </div>
  );
};

export default OclockIcon;
