---
layout: needsAuth
menu: nav/home.html
permalink: /make_post
---

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Create a Book Discussion</h2>
    <div class="space-y-4">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Discussion Title</label>
        <input type="text" id="title" name="title" placeholder="Enter a title for your discussion" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Discussion Content</label>
        <textarea id="description" name="description" placeholder="Share your thoughts about the book..." rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>

      <!-- Book Cover Upload -->
      <div id="image-upload-container" class="space-y-2">
        <label for="images" class="block text-sm font-medium text-gray-700">Upload Book Cover</label>
        <div class="flex items-center space-x-2">
          <input type="file" id="images" name="images[]" accept="image/*" class="img_file block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
          <button type="button" id="add-image" class="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700">+</button>
        </div>
      </div>

      <!-- Book Title -->
      <div>
        <label for="car" class="block text-sm font-medium text-gray-700">Book Title</label>
        <input type="text" id="car" name="car" placeholder="Enter the book title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button id="submitBtn" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create Discussion</button>
      </div>
    </div>
  </div>
</div>

<script type="module">
    import { createPost } from "{{site.baseurl}}/assets/js/api/posts.js"

    const submitBtn = document.getElementById("submitBtn")
    const submit = () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const bookTitle = document.getElementById('car').value;
        const images = document.getElementById('images').files;

        createPost(title, description, images, bookTitle, 'book')
    }

    document.addEventListener("DOMContentLoaded", () => {
        submitBtn.addEventListener("click", submit)
    })
</script>
