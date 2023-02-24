import classes from "../../styles/mainpage/footer.module.css";
import Link from "next/link";
import Image from "next/image";
import brand from "../../styles/images/iconblack.png";
import igicon from "../../styles/images/igiconblack.png";
import fbicon from "../../styles/images/fbiconblack.jpg";

const Footer = () => {
  return (
    <div className={classes.bigcontainer}>
      <ul className={classes.navbar}>
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="">Portfolio</Link>
        </li>
      </ul>
      <div className={classes.container}>
        <div className={classes.leftnest}>
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
    </div>
  );
};

export default Footer;
