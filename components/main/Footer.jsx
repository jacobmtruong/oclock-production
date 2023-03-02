import classes from "../../styles/mainpage/footer.module.css";
import Link from "next/link";
import Image from "next/image";
import brand from "../../styles/images/iconblack.png";
import igicon from "../../styles/images/igiconblack.png";
import fbicon from "../../styles/images/fbiconblack.jpg";
import pin from "../../styles/images/pin.png";

const Footer = () => {
  return (
    <div className={classes.bigcontainer}>
      <div className={classes.navbar}>
        <ul>
          <li>
            <Link href="">About</Link>
          </li>
          <li>
            <Link href="">Portfolio</Link>
          </li>
        </ul>

        <p>
          <Image src={pin} alt="pin-location" />
          Saigon, Vietnam
        </p>
      </div>
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
