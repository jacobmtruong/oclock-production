import classes from "../../styles/mainpage/portfolioboard.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      <p className={classes.title}>Portfolio | Works</p>
      <div className={classes.cardcontainer}>
        {data?.map((card, i) => (
          <Link href="" key={i}>
            <div className={classes.cardcover}>
              <img src={card.url} className={classes.card} />
              <p className={classes.content}>{card.content}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="">Get in touch</Link>
    </div>
  );
};

export default Portfolio;
