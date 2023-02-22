import classes from "../../styles/mainpage/mainBanner.module.css";
import Link from "next/link";
import OclockIcon from "../main/OclockIcon";
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
        </ul>
      </div>

      {/* <div className={classes.title}>
        <p>
          O<span style={{ margin: "0px 20px" }}>'</span>clock
        </p>
        <p>
          Production{" "}
          <span style={{ fontSize: "25px", float: "inline-start" }}>®</span>
        </p>
      </div> */}
    </div>
  );
};
