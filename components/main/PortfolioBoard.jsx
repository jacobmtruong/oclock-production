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
      });
  }, [data]);

  return (
    <div className={classes.container}>
      <p className={classes.title}>Portfolio | Works</p>
      <div className={classes.cardcontainer}>
        {data?.map((card, i) => (
          <div key={i} style={{ position: "relative" }}>
            <Link href="">
              <img src={card.url} className={classes.card} />
              <p className={classes.content}>{card.content}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
