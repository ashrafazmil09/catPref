// api/cats.js
export const fetchAndPreloadCats = async (limit = 10) => {
  // 1. Fetch all JSONs in parallel (much faster than a loop)
  const jsonPromises = Array.from({ length: limit }, () =>
    fetch("https://cataas.com/cat?json=true").then((res) => res.json())
  );

  const results = await Promise.all(jsonPromises);

  const urls = results.map((data) => `https://cataas.com/cat/${data.id}`);

  // 2. Preload images in parallel
  const imagePromises = urls.map(
    (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // ignore failed loads
      })
  );

  await Promise.all(imagePromises);

  return urls; // only return after all images are ready
};