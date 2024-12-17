import { fetchOptions, pythonURI } from "./config.js";

export async function getPostsByType(carType) {
  const possibleCarTypes = ["gas", "electric", "hybrid", "dream"];
  if (!possibleCarTypes.includes(carType)) {
    throw new Error("Invalid car type");
  }

  const endpoint = pythonURI + "/api/carPost/allPosts/" + carType;

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return null;
  }
}

export async function getImagesByPostId(postId) {
  const endpoint = pythonURI + "/api/carPost/" + postId + "/images";

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return null;
  }
}
