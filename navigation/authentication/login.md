---
layout: base
title: Login
permalink: /login
search_exclude: true
menu: nav/home.html
---

<!-- Add CSRF token meta tag -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" id="pythonForm" onsubmit="pythonLogin(); return false;">
      <div>
        <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
        <div class="mt-2">
          <input type="text" name="username" id="username" autocomplete="username" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label type="password" name="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
      </div>
      <p id="message" class="text-indigo-500"></p>
    </form>
  </div>
</div>

<script type="module">
    import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to handle Python login
    window.pythonLogin = async function() {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Logging in...";
        
        try {
            const requestOptions = {
                ...fetchOptions,
                method: "POST",
                headers: {
                    ...fetchOptions.headers,
                    'X-Origin': window.location.origin,
                    'Access-Control-Allow-Origin': window.location.origin,
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify({
                    uid: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                })
            };

            console.log('Sending request with headers:', requestOptions.headers);
            
            const response = await fetch(`${pythonURI}/api/authenticate`, requestOptions);
            
            if (!response.ok) {
                throw new Error(`Login failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data && data.token) {
                // Store token in both localStorage and cookie for consistency
                localStorage.setItem('token', data.token);
                document.cookie = `token=${data.token}; path=/; secure; samesite=lax`;
                
                // Redirect to profile page
                window.location.href = '{{site.baseurl}}/profile';
            } else {
                throw new Error('No token received in response');
            }
        } catch (error) {
            console.error("Login Error:", error);
            messageElement.textContent = `Login failed: ${error.message}`;
        }
    }

    // Function to fetch and display Python data
    async function pythonDatabase() {
        const messageElement = document.getElementById("message");
        
        try {
            const token = localStorage.getItem('token') || 
                         document.cookie.split('; ')
                            .find(row => row.startsWith('token='))
                            ?.split('=')[1];

            if (!token) {
                throw new Error('No authentication token found');
            }

            const requestOptions = {
                ...fetchOptions,
                method: 'GET',
                headers: {
                    ...fetchOptions.headers,
                    'X-Origin': window.location.origin,
                    'Access-Control-Allow-Origin': window.location.origin,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log('Sending request with headers:', requestOptions.headers);
            
            const response = await fetch(`${pythonURI}/api/user`, requestOptions);
            
            if (!response.ok) {
                throw new Error(`Server response: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            window.location.href = '{{site.baseurl}}/profile';
        } catch (error) {
            console.error("Database Error:", error);
            messageElement.textContent = `Error: ${error.message}`;
        }
    }

    // Check for authentication on page load
    window.onload = function() {
        const token = localStorage.getItem('token') || 
                     document.cookie.split('; ')
                        .find(row => row.startsWith('token='))
                        ?.split('=')[1];
                        
        if (token) {
            pythonDatabase();
        }
    };
</script>
