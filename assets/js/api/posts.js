import { fetchOptions, pythonURI } from "./config.js";

export async function getPostsByType(carType) {
  const possibleCarTypes = ["gas", "electric", "hybrid", "dream", "all"];
  if (!possibleCarTypes.includes(carType)) {
    throw new Error("Invalid car type");
  }

  let endpoint = `${pythonURI}/api/carPost/allPosts/${carType}`;

  if (carType == "all") {
    endpoint = `${pythonURI}/api/carPost`;
  }

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      method: 'GET'
    });
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

export async function getPostsByUser(uid) {
  const endpoint = `${pythonURI}/api/carPost`;

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const posts = await response.json();

    console.log(posts);

    return posts.filter((post) => post.user.id === uid);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return null;
  }
}

export async function getImagesByPostId(postId) {
  const endpoint = `${pythonURI}/api/carPost/${postId}/images`;

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      method: 'GET'
    });
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

export async function createPost(post) {
  const endpoint = `${pythonURI}/api/carPost`;
  const requestOptions = {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({
      title: post.title,
      description: post.description,
      car_type: post.car_type,
      image_base64_table: post.image_base64_table
    })
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }
    
    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Error creating post:", error.message);
    return false;
  }
}

export async function removePostById(id) {
  const endpoint = `${pythonURI}/api/carPost`;
  const requestOptions = {
    ...fetchOptions,
    method: 'DELETE',
    body: JSON.stringify({ id })
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }
    
    const data = await response.json();
    return data.deleted;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return null;
  }
}

export async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
