---
layout: base
menu: nav/home.html
permalink: /gas/posts
---
<div id="posts-container" class="py-10 space-y-6"></div>

<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.19/dist/full.min.css" rel="stylesheet" type="text/css" />

<script type="module">
import { getPostsByType, getImagesByPostId } from "{{site.baseurl}}/assets/js/api/posts.js";

const carType = "gas";
const postsContainer = document.getElementById("posts-container");

const getPostImages = async (postId) => {
  getImagesByPostId(postId).then((images) => {
    if (images) {
      const formattedImages = [];
      images.forEach((image) => {
        formattedImages.push(`data:image/jpeg;base64,${image}`);
      });
      return formattedImages;
    } else {
      console.error("Failed to fetch images");
    }
  });
}

getPostsByType(carType).then((posts) => {
  if (posts) {
    console.log("Fetched posts:", posts);
    const postsContainer = document.getElementById("posts-container");
    const dateNow = new Date();
    const dateNowString = dateNow.getMonth() + "/" + dateNow.getDate() + "/" + dateNow.getFullYear();
    const dateNowHours = dateNow.getHours();
    posts.forEach((post) => {
      getImagesByPostId(post.id).then((images) => {
        const formattedImages = [];
        images.forEach((image) => {
          formattedImages.push(`data:image/jpeg;base64,${image}`);
        });
        const date = new Date(post.date_posted)
        let dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        if (dateNowString === dateString) {
          dateString = "Today";
        }
        const postElement = makePostElement(post.title, post.description, dateString, formattedImages, post.id);
        postsContainer.appendChild(postElement);
      });
    });
  } else {
    console.error("Failed to fetch posts");
  }
});

function makePostElement(title, description, date, images, postId) {
  const postElement = document.createElement("div");
    postElement.className =
      "w-1/3 max-w-xl mx-auto border border-gray-300 rounded-lg shadow-md bg-white";

    console.log("Images:", images);

    // Add post content
    postElement.innerHTML = `
      <!-- Header -->
      <div class="flex items-center px-4 py-2">
        <div class="ml-3">
          <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
          <p class="text-sm text-gray-500">${date}</p>
        </div>
      </div>
      <hr class="border-gray-300">

      <!-- Carousel -->
      <div class="relative flex w-full overflow-hidden">
        <div class="carousel relative flex w-full">
          ${images
            .map(
              (image, index) =>
                `
                <img src="${image}" alt="${title}" class="carousel-item w-full">
                `
            )
            .join("")}
        </div>
      </div>

      <!-- Description -->
      <div class="px-4 py-2">
        <p class="text-gray-700">${description}</p>
      </div>
      <hr class="border-gray-300">
    `;

    return postElement;
}

</script>
