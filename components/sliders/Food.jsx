import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

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
    <Carousel>
      {data?.map((picture) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={picture.url}
            alt={picture.content}
          />
          <Carousel.Caption>
            <h3>{picture.content}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
