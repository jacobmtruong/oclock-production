const images = [
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

export function getAllImage() {
  return images;
}

export function shuffleImages() {
  return images.sort(() => Math.random() - 0.5);
}

export function getImageById(id) {
  return images.find((image) => image.id === id);
}

export default images;
