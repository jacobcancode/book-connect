---
layout: post
title: Reading Tracker
permalink: /reading-tracker
menu: nav/home.html
search_exclude: true
---

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Reading Tracker</h1>
    
    <!-- Reading Goals -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Reading Goals</h2>
        <div class="space-y-4">
            <div class="flex items-center space-x-4">
                <input type="number" placeholder="Books to read this year" class="p-2 border rounded w-48">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Set Goal</button>
            </div>
            <div class="flex items-center space-x-4">
                <input type="number" placeholder="Pages per day" class="p-2 border rounded w-48">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Set Goal</button>
            </div>
        </div>
    </div>

    <!-- Currently Reading -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Currently Reading</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border rounded">
                <div>
                    <h3 class="font-semibold">Book Title</h3>
                    <p class="text-gray-600">Author Name</p>
                </div>
                <div class="text-right">
                    <p>Page 123 of 456</p>
                    <div class="w-32 bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27%"></div>
                    </div>
                </div>
            </div>
            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">Add New Book</button>
        </div>
    </div>

    <!-- Reading History -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Reading History</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border rounded">
                <div>
                    <h3 class="font-semibold">Book Title</h3>
                    <p class="text-gray-600">Author Name</p>
                    <p class="text-sm text-gray-500">Completed on: January 1, 2024</p>
                </div>
                <div class="text-right">
                    <p>Rating: 5/5</p>
                    <button class="text-blue-500 hover:text-blue-600">View Notes</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reading tracker functionality
});
</script> 