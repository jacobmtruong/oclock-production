import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";

// ✅ Paste/import your array here.
// If you already have it in a file like data/images.js, import it instead.
const images = [
  // PASTE YOUR ITEMS HERE (same shape as your images array)
  // { id, url, content, favorite, category, view }
  {
    id: 5,
    url: "https://live.staticflickr.com/65535/52694050803_594338d08a_k.jpg",
    content: "Food Photography",
    favorite: true,
    category: "food",
    view: "landscape",
  },
  {
    id: 6,
    url: "https://live.staticflickr.com/65535/52694043635_95691a8b85_b.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "landscape",
  },
  {
    id: 3,
    url: "https://live.staticflickr.com/65535/52693560371_fea8584439_k.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "landscape",
  },
  {
    id: 18,
    url: "https://live.staticflickr.com/65535/52694185128_9207b10aa5_h.jpg",
    content: "Product Photography",
    favorite: false,
    category: "product",
    view: "portrait",
  },

  {
    id: 12,
    url: "https://live.staticflickr.com/65535/52694048690_6cc8f3b4e3_h.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
  },
  {
    id: 9,
    url: "https://live.staticflickr.com/65535/52694119243_e3216085cf_b.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "portrait",
  },
  {
    id: 7,
    url: "https://live.staticflickr.com/65535/52693627716_148a638a3e_h.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "portrait",
  },
  {
    id: 8,
    url: "https://live.staticflickr.com/65535/52694041290_10ee535607_b.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "portrait",
  },
  {
    id: 10,
    url: "https://live.staticflickr.com/65535/52694047990_1fa6b74637_h.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
  },

  {
    id: 15,
    url: "https://live.staticflickr.com/65535/52693672866_2841c2d5ca_h.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
  },
  {
    id: 16,
    url: "https://live.staticflickr.com/65535/52693161132_02435cb3e7_h.jpg",
    content: "Product Photography",
    favorite: false,
    category: "product",
    view: "landscape",
  },
  {
    id: 23,
    url: "https://live.staticflickr.com/65535/52693748926_a3914559c9_b.jpg",
    content: "Architecture Photography",
    favorite: false,
    category: "architecture",
    view: "landscape",
  },
  {
    id: 25,
    url: "https://live.staticflickr.com/65535/52694171200_660bd7509a_k.jpg",
    content: "Lifestyle Photography",
    favorite: false,
    category: "lifestyle",
    view: "landscape",
  },
  {
    id: 2,
    url: "https://live.staticflickr.com/65535/52693825269_9cf72f651b_k.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "landscape",
  },
  {
    id: 17,
    url: "https://live.staticflickr.com/65535/52694172213_a5e9cce3e2_h.jpg",
    content: "Product Photography",
    favorite: false,
    category: "product",
    view: "landscape",
  },
  {
    id: 19,
    url: "https://live.staticflickr.com/65535/52694092260_a20d1b1a4a_h.jpg",
    content: "Product Photography",
    favorite: false,
    category: "product",
    view: "landscape",
  },
  {
    id: 20,
    url: "https://live.staticflickr.com/65535/52694196418_65e9c0162e_k.jpg",
    content: "Architecture Photography",
    favorite: false,
    category: "architecture",
    view: "portrait",
  },
  {
    id: 21,
    url: "https://live.staticflickr.com/65535/52693742556_be25150f2b_k.jpg",
    content: "Architecture Photography",
    favorite: false,
    category: "architecture",
    view: "landscape",
  },
  {
    id: 4,
    url: "https://live.staticflickr.com/65535/52693970345_69a63631be_k.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
    view: "landscape",
  },
  {
    id: 22,
    url: "https://live.staticflickr.com/65535/52693754566_1f2dcf98af_k.jpg",
    content: "Architecture Photography",
    favorite: false,
    category: "architecture",
    view: "landscape",
  },
  {
    id: 24,
    url: "https://live.staticflickr.com/65535/52694254118_5e76ffea97_k.jpg",
    content: "Lifestyle Photography",
    favorite: false,
    category: "lifestyle",
    view: "landscape",
  },
];

const pickThumbs = (docs) => {
  // choose ONE per boardKey
  const thumbs = {
    fnb:
      docs.find((d) => d.category === "food") ||
      docs.find((d) => d.category === "beverage"),
    product: docs.find((d) => d.category === "product"),
    architecture: docs.find((d) => d.category === "architecture"),
    lifestyle: docs.find((d) => d.category === "lifestyle"),
  };

  // build map url->boardKey for quick assignment
  const urlToKey = {};
  for (const [key, doc] of Object.entries(thumbs)) {
    if (doc?.url) urlToKey[doc.url] = key;
  }
  return urlToKey;
};

export default async function handler(req, res) {
  console.log("✅ SEED route hit", req.method, req.url);

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    console.log("✅ DB connected");

    const existing = await Photo.countDocuments();
    console.log("✅ existing:", existing);

    if (existing > 0 && req.query.force !== "1") {
      return res
        .status(400)
        .json({ ok: false, message: "Not empty. Use ?force=1" });
    }

    if (req.query.force === "1") {
      await Photo.deleteMany({});
      console.log("✅ deleted all");
    }

    const cleaned = images
      .filter((x) => x && x.url)
      .map((x) => ({
        legacyId: x.id,
        url: x.url,
        content: x.content || "",
        favorite: !!x.favorite,
        category: x.category,
        view: x.view,
        boardKey: null,
      }));

    const urlToKey = pickThumbs(cleaned);

    const finalDocs = cleaned.map((d) => ({
      ...d,
      boardKey: urlToKey[d.url] || null,
    }));

    console.log("✅ cleaned length:", cleaned.length);
    console.log("✅ sample doc:", finalDocs[0]);

    const inserted = await Photo.insertMany(finalDocs);
    console.log("✅ inserted:", inserted.length);

    return res.status(200).json({ ok: true, inserted: inserted.length });
  } catch (err) {
    console.error("❌ seed/photos error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
