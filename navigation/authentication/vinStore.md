---
layout: needsAuth
title: vinStore
permalink: /vinStore
search_exclude: true
menu: nav/home.html 
---

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Add a Vehicle</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-4 mt-4" id="vehicle-form">
      <div>
        <label for="vin-input" class="block text-sm/6 font-medium text-gray-900">VIN</label>
        <div class="mt-2">
          <input type="text" id="vin-input" placeholder="Enter VIN" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6">
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">Add Vehicle</button>
      </div>
    </form>
    <div id="message" class="mt-4 text-center text-red-500"></div>
  </div>
</div>

<script type='module'>
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  document.getElementById('vehicle-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const vinInput = document.getElementById('vin-input');
    const vin = vinInput.value.trim();
    const messageElement = document.getElementById('message');
    
    // Reset message
    messageElement.textContent = '';

    // Validate VIN length
    if (vin.length !== 17) {
        messageElement.textContent = 'VIN must be 17 characters long.';
        return;
    }

    try {
        // Create the request body
        const requestBody = JSON.stringify({ vin });

        // Make the fetch request to the API
        const response = await fetch(`${pythonURI}/api/vinStore`, {
            method: "POST",
            cache: "default",
            mode: "cors",
            credentials: "include",
            body: requestBody,
            headers: {
            'Content-Type': 'application/json',
            'X-Origin': 'client'
            },
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = `Vehicle added successfully: ${data.make} ${data.model} (${data.year})`;
            messageElement.classList.remove('text-red-500');
            messageElement.classList.add('text-green-500');
            vinInput.value = '';
        } else {
            messageElement.textContent = data.message || 'Failed to add vehicle';
        }
    } catch (error) {
        messageElement.textContent = 'Error connecting to the server: ' + error.message;
    }
  });
</script>