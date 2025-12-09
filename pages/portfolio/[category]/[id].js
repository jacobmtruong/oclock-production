import { useRouter } from "next/router";
import Head from "next/head";
import photography from "../../../data/data";
import { MainBanner } from "../../../components/main/MainBanner";
import Footer from "../../../components/main/Footer";

export default function ImageDetailPage() {
  const router = useRouter();
  const { category, id } = router.query;

  if (!category || !id) return null;

  function getImage(category, id) {
    const cid = parseInt(id);

    let images = [];

    if (category === "fnb") {
      images = [
        ...(photography.food.landscape || []),
        ...(photography.food.portrait || []),
        ...(photography.beverage.landscape || []).filter(Boolean),
        ...(photography.beverage.portrait || []),
      ];
    }

    if (category === "product") {
      images = [
        ...(photography.product.landscape || []),
        ...(photography.product.portrait || []),
      ];
    }

    return images.find((img) => img.id === cid);
  }

  const image = getImage(category, id);

  if (!image)
    return <p style={{ padding: 50 }}>Image not found or invalid ID.</p>;

  return (
    <>
      <Head>
        <title>{image.content} | O'CLOCK PRODUCTION</title>
      </Head>

      <MainBanner />

      <div
        style={{
          padding: "60px 10vw",
          backgroundColor: "black",
          color: "white",
          minHeight: "70vh",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontSize: "16px",
            opacity: 0.7,
          }}
        >
          {image.content}
        </h1>

        <img
          src={image.url}
          style={{
            width: "100%",
            maxWidth: "1100px",
            borderRadius: "18px",
            display: "block",
            margin: "0 auto",
          }}
        />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "1px solid white",
              padding: "10px 20px",
              borderRadius: "30px",
              color: "white",
              cursor: "pointer",
              letterSpacing: "0.1em",
              fontSize: "12px",
            }}
          >
            GO BACK
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
