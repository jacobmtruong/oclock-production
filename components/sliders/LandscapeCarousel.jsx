import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "../../styles/sliders/landscapecarousel.module.css";

export const LandscapeCarousel = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/photography/landscape")
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
      <Carousel className={classes.carousel}>
        {data?.map((picture, i) => (
          <Carousel.Item className={classes.carouselitem} key={i}>
            <Carousel.Caption className={classes.caption}>
              <h3>{picture.content}</h3>
            </Carousel.Caption>
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
