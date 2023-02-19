import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";

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
    <Carousel style={{ width: "20px" }}>
      {data?.map((picture) => (
        <div>
          <img src={picture.url} alt={picture.name} />
          <p className="legend">{picture.content}</p>
        </div>
      ))}
    </Carousel>
  );
};
