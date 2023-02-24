import classes from "../../styles/mainpage/footer.module.css";
import Link from "next/link";
import Image from "next/image";
import brand from "../../styles/images/iconblack.png";
import igicon from "../../styles/images/igiconblack.png";
import fbicon from "../../styles/images/fbiconblack.jpg";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.leftnest}>
        <Image src={brand} alt="brand-icon" />
        <p className={classes.footerlegal}>© 2023 O'CLOCK PRODUCTION</p>
      </div>
      <div className={classes.rightnest}>
        <Link href="">
          <Image src={igicon} alt="ig-icon" />
        </Link>
        <Link href="">
          <Image src={fbicon} alt="ig-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
