import classes from "../../styles/mainpage/textbanner.module.css";
import Link from "next/link";

const TextBanner = () => {
  return (
    <div className={classes.container}>
      <p>Crisp and compelling photography for your brand</p>
      <div className={classes.rightcontainer}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
          recusandae consequuntur consequatur maiores quibusdam voluptatem aut
          maxime repudiandae nobis quisquam labore molestiae voluptas,
          praesentium.
        </p>
        <Link href="">Explore</Link>
      </div>
    </div>
  );
};

export default TextBanner;
