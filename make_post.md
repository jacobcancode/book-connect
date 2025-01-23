---
layout: base
menu: nav/home.html
permalink: /make_post
---
<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
<h2 class="text-2xl font-bold mb-4 text-center">Create A Post</h2>
<div class="space-y-4">
<!-- Title -->
<div>
    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
    <input type="text" id="title" name="title" placeholder="Enter a title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
</div>

  <!-- Description -->
  <div>
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <textarea id="description" name="description" placeholder="Enter a description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
  </div>

  <!-- Image Upload -->
  <div id="image-upload-container" class="space-y-2">
    <label for="images" class="block text-sm font-medium text-gray-700">Upload Images</label>
    <div class="flex items-center space-x-2">
      <input type="file" id="images" name="images[]" accept="image/*" class="img_file block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
      <button type="button" id="add-image" class="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">+</button>
    </div>
  </div>

  <!-- Car -->
  <div>
    <label for="car" class="block text-sm font-medium text-gray-700">Car</label>
    <input type="text" id="car" name="car" placeholder="Enter car name or model" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
  </div>

  <!-- Submit Button -->
  <div class="text-center">
    <button id="submit-btn" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      Submit
    </button>
  </div>
</div>
</div>

<script type="module">
  import { convertToBase64, createPost } from "{{site.baseurl}}/assets/js/api/posts.js";


  const imgContainer = document.getElementById('image-upload-container');
  const addImageButton = document.getElementById('add-image');
  const submitButton = document.getElementById('submit-btn')

  addImageButton.addEventListener('click', () => {
    const newInput = document.createElement('div');
    newInput.classList.add('flex', 'items-center', 'space-x-2');
    newInput.innerHTML = `
      <input type="file" name="images[]" accept="image/*" class="img_file block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
      <button type="button" class="remove-image px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">-</button>
    `;
    imgContainer.appendChild(newInput);

    // Add event listener to remove button
    newInput.querySelector('.remove-image').addEventListener('click', () => {
      imgContainer.removeChild(newInput);
    });
  });

  async function submit() {
    const imageDivs = document.getElementsByClassName('img_file')
    const imageBase64Table = []
    for (let i = 0; i < imageDivs.length; i++) {
      if (imageDivs[i].files.length == 0) {
        return
      }
      const img = await convertToBase64(imageDivs[i].files[0])
      imageBase64Table.push({
        "name": imageDivs[i].files[0].name,
        "base64": img
      })
    }

    createPost({
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      car_type: "gas",
      image_base64_table: imageBase64Table
    })
  }

  submitButton.addEventListener('click', submit)
</script>
