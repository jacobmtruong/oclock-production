import classes from "../../styles/mainpage/mainBanner.module.css";
import Link from "next/link";
import OclockIcon from "../main/OclockIcon";
import Image from "next/image";
import igicon from "../../styles/images/ig-icon.png";

export const MainBanner = () => {
  return (
    <div className={classes.maincontainer}>
      <div className={classes.navcontainer}>
        <OclockIcon />
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

          <li>
            <Link href="">Contact</Link>
          </li>
          <li>
            <Link href="" className={classes.instagram}>
              <Image src={igicon} className={classes.image} alt="igicon" />
            </Link>
          </li>
        </ul>
      </div>

      <div className={classes.banner}></div>
    </div>
  );
};
