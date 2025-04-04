---
layout: post
title: Book Recommendations
permalink: /recommendations
menu: nav/home.html
search_exclude: true
---

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Book Recommendations</h1>
    
    <!-- Personalized Recommendations -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Personalized for You</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="border rounded-lg p-4">
                <img src="https://via.placeholder.com/150x200" alt="Book cover" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="font-semibold text-xl mb-2">The Midnight Library</h3>
                <p class="text-gray-600 mb-2">Matt Haig</p>
                <p class="text-sm text-gray-500 mb-4">Based on your interest in contemporary fiction and philosophical themes</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-yellow-400">★★★★★</span>
                        <span class="ml-2 text-sm text-gray-500">4.8/5</span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add to List</button>
                </div>
            </div>
            <div class="border rounded-lg p-4">
                <img src="https://via.placeholder.com/150x200" alt="Book cover" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="font-semibold text-xl mb-2">Atomic Habits</h3>
                <p class="text-gray-600 mb-2">James Clear</p>
                <p class="text-sm text-gray-500 mb-4">Recommended based on your interest in personal development</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-yellow-400">★★★★★</span>
                        <span class="ml-2 text-sm text-gray-500">4.9/5</span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add to List</button>
                </div>
            </div>
            <div class="border rounded-lg p-4">
                <img src="https://via.placeholder.com/150x200" alt="Book cover" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="font-semibold text-xl mb-2">The Seven Husbands of Evelyn Hugo</h3>
                <p class="text-gray-600 mb-2">Taylor Jenkins Reid</p>
                <p class="text-sm text-gray-500 mb-4">Based on your interest in historical fiction and romance</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-yellow-400">★★★★★</span>
                        <span class="ml-2 text-sm text-gray-500">4.7/5</span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add to List</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Popular This Month -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Popular This Month</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="border rounded-lg p-4">
                <img src="https://via.placeholder.com/150x200" alt="Book cover" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="font-semibold">Book Title</h3>
                <p class="text-gray-600 text-sm">Author Name</p>
                <div class="mt-2">
                    <span class="text-yellow-400">★★★★★</span>
                    <span class="text-sm text-gray-500">4.5/5</span>
                </div>
            </div>
            <!-- Repeat for more books -->
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize recommendations functionality
});
</script> 