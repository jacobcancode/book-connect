import { fetchOptions, pythonURI } from "./config.js";

export async function getAllComments() {
  const endpoint = pythonURI + "/api/carComment";

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return null;
  }
}
