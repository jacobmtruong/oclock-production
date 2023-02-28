const images = [
  {
    id: 1,
    url: "https://live.staticflickr.com/65535/52693970615_34efb6d5fd_k.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
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
    id: 3,
    url: "https://live.staticflickr.com/65535/52693560371_fea8584439_k.jpg",
    content: "Food Photography",
    favorite: false,
    category: "food",
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
    id: 9,
    url: "https://live.staticflickr.com/65535/52694119243_e3216085cf_b.jpg",
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
    id: 12,
    url: "https://live.staticflickr.com/65535/52694048690_6cc8f3b4e3_h.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
  },
  {
    id: 13,
    url: "https://live.staticflickr.com/65535/52694128513_846a95eaa5_b.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
  },
  {
    id: 14,
    url: "https://live.staticflickr.com/65535/52693119702_7c48febda6_h.jpg",
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
    url: "https://live.staticflickr.com/65535/52693938494_ecbb3e6b6b_h.jpg",
    content: "Beverage Photography",
    favorite: false,
    category: "beverage",
    view: "portrait",
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
