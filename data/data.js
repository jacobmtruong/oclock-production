import images from "./images";

const photography = images.reduce((acc, img) => {
  const { category, view, ...rest } = img;

  if (!acc[category]) {
    acc[category] = { landscape: [], portrait: [] };
  }

  acc[category][view].push(rest);

  return acc;
}, {});

export default photography;
