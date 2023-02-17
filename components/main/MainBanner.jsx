import classes from "../../styles/mainpage/mainBanner.module.css";
import Link from "next/link";

export const MainBanner = () => {
  return (
    <div className={classes.maincontainer}>
      <div className={classes.smallcontainer}>
        <div className={classes.navbar}>
          <ul>
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
        </div>
        <div className={classes.contact}>
          <Link href="">contact </Link>
        </div>
      </div>

      <div className={classes.title}>
        <p>
          O<span style={{ margin: "0px 20px" }}>'</span>clock
        </p>
        <p>
          Production{" "}
          <span style={{ fontSize: "25px", float: "inline-start" }}>®</span>
        </p>
      </div>
    </div>
  );
};
