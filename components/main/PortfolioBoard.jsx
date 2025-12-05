import classes from "../../styles/mainpage/portfolioboard.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/photography/portfoliocards")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [data]);

  return (
    <div className={classes.container}>
      <p className={classes.title}>
        <span
          style={{
            textTransform: "uppercase",
            fontWeight: "900",
            letterSpacing: "5px",
          }}
        >
          Portfolio
        </span>{" "}
      </p>
      <div className={classes.cardcontainer}>
        {data?.map((card, i) => (
          <Fade bottom>
            <Link href="" key={i}>
              <div className={classes.cardcover}>
                <img src={card.url} className={classes.card} />
                <p className={classes.content}>{card.content}</p>
              </div>
            </Link>
          </Fade>
        ))}
      </div>
      <Link href="/contact" className={classes.getintouch}>
        Get in touch
      </Link>
    </div>
  );
};

export default Portfolio;
