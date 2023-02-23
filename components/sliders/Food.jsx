import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "../../styles/sliders/food.module.css";

export const Food = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/photography/product")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [data]);

  return (
    <div className={classes.container}>
      <Carousel className={classes.carousel} fade>
        {data?.map((picture) => (
          <Carousel.Item className={classes.carouselitem}>
            <img
              className="d-block w-100"
              src={picture.url}
              alt={picture.content}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={classes.content}>
        <p className={classes.title}>Take your business to the next level</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
          repudiandae? Provident officia nisi molestias, repudiandae, sed alias
          voluptatum voluptatibus consectetur repellendus assumenda quo
          temporibus? Autem nemo consequuntur adipisci nam blanditiis!
        </p>
        <Link href="">Find out how</Link>
      </div>
    </div>
  );
};
