---
layout: needsAuth
title: Mechanics Tips
permalink: /mechanicsTips
search_exclude: true
menu: nav/home.html
---

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Manage Mechanics Tips</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- Add Mechanics Tip Form -->
    <form class="space-y-4 mt-4" id="add-tip-form">
      <div>
        <label for="make" class="block text-sm/6 font-medium text-gray-900">Make</label>
        <input type="text" id="make" placeholder="Enter Make" required class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900">
      </div>
      <div>
        <label for="model" class="block text-sm/6 font-medium text-gray-900">Model</label>
        <input type="text" id="model" placeholder="Enter Model" required class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900">
      </div>
      <div>
        <label for="year" class="block text-sm/6 font-medium text-gray-900">Year</label>
        <input type="number" id="year" placeholder="Enter Year" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900">
      </div>
      <div>
        <label for="issue" class="block text-sm/6 font-medium text-gray-900">Issue</label>
        <textarea id="issue" placeholder="Describe Issue" required class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"></textarea>
      </div>
      <div>
        <label for="tip" class="block text-sm/6 font-medium text-gray-900">Tip</label>
        <textarea id="tip" placeholder="Provide Repair Tip" required class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"></textarea>
      </div>
      <div>
        <button type="submit" class="w-full bg-red-600 text-white py-1.5 rounded-md">Add Tip</button>
      </div>
    </form>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  document.getElementById('add-tip-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form values
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const issue = document.getElementById('issue').value;
    const tip = document.getElementById('tip').value;

    // Prepare request data
    const requestData = {
      make: make,
      model: model,
      year: year || null, // Optional field
      issue: issue,
      tip: tip
    };

    try {
      // Make a POST request to the API
      const response = await fetch(`${pythonURI}/api/mechanicsTips`, {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Add token if needed
        },
        body: JSON.stringify(requestData), // Attach the form data
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        alert('Mechanics Tip added successfully!');
        document.getElementById('add-tip-form').reset(); // Reset form on success
        console.log(result); // Log result for debugging
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to add tip'}`);
        console.error(error);
      }
    } catch (err) {
      alert('An error occurred while processing your request. Please try again.');
      console.error(err);
    }
  });
</script>
