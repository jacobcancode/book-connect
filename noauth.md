---
layout: base
title: Book Connect
search_exclude: true
menu: nav/home.html
---

<script type="module">
    import {
        pythonURI,
        fetchOptions,
    } from "{{site.baseurl}}/assets/js/api/config.js";

    document.addEventListener("DOMContentLoaded", () => {
        getCredentials() // Call the function to get credentials
            .then((data) => {
                if (data) {
                    //IF DATA THEN THE USER IS AUTHENTICATED/LOGGED IN
                    console.log("LOGGED IN");
                    window.location.href = "{{site.baseurl}}/profile";
                }
            })
            .catch((err) => {
                // General error handler
                console.error("Error fetching credentials: ", err);
            });
    });

    function getCredentials() {
        const URL = pythonURI + "/api/user";
        return fetch(URL, fetchOptions)
            .then((response) => {
                // API response handler
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null; // prepares to stop the chain by returning null.
                }
                return response.json(); // plans to continue the chain with the data.
            })
            .then((data) => {
                // Data handler from the previous promise
                if (data === null) return null; // stops the chain, returns null.
                console.log(data); // logs data with should contain uid, name, etc.
                return data; // returns data to caller
            })
            .catch((err) => {
                // General error handler
                console.error("Fetch error: ", err);
                return null;
            });
    }
</script>

<div class="relative isolate px-6 pt-14 lg:px-8">
  <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div class="text-center">
      <h1 class="fade-in bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text font-extrabold text-transparent tracking-tight sm:text-7xl">Connect Through Books</h1>
      <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Join the ultimate hub for book lovers—track your reading journey, connect with fellow readers, and discover your next favorite book.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="{{site.baseurl}}/signup" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</a>
        <a href="{{site.baseurl}}/login" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-bold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log In</a>
      </div>
    </div>
  </div>
</div>
