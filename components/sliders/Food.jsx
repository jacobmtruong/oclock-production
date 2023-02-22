import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "../../styles/sliders/food.module.css";

export const Food = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/photography/food")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [data]);

  return (
    <div className={classes.container}>
      {/* <p style={{ color: "white" }}>Food Photography</p> */}
      <Carousel className={classes.carousel} fade>
        {data?.map((picture) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={picture.url}
              alt={picture.content}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
