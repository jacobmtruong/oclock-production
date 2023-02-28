import classes from "../../styles/mainpage/mainBanner.module.css";
import Link from "next/link";
import OclockIcon from "../main/OclockIcon";
import Image from "next/image";
import igicon from "../../styles/images/ig-icon.png";
import { useRouter } from "next/router";

export const MainBanner = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div className={classes.maincontainer}>
      <div className={classes.navcontainer}>
        <Link href="/">
          <OclockIcon />
        </Link>
        <ul className={classes.navbar}>
          {/* <li>
            <Link href="">Home</Link>
          </li> */}
          <li>
            <Link
              href="/portfolio"
              className={
                currentRoute === "/portfolio"
                  ? classes.active
                  : classes.nonActive
              }
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={
                currentRoute === "/about" ? classes.active : classes.nonActive
              }
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className={
                currentRoute === "/contact" ? classes.active : classes.nonActive
              }
            >
              Contact
            </Link>
          </li>
          <Link href="" className={classes.instagram}>
            <Image src={igicon} className={classes.image} alt="igicon" />
          </Link>
        </ul>
      </div>
    </div>
  );
};
