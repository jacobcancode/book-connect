---
layout: base
title: Book Discussions
permalink: /Chat
menu: nav/home.html
---

<div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
        <!-- Create Discussion Button -->
        <div class="mb-8">
            <button onclick="location.href='{{site.baseurl}}/make_post'" class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <span>Start a New Discussion</span>
            </button>
        </div>

        <!-- Discussion Feed -->
        <div class="space-y-6" id="discussion-feed">
            <!-- Discussion cards will be dynamically inserted here -->
        </div>
    </div>
</div>

<script type="module">
    import { getPosts } from "{{site.baseurl}}/assets/js/api/posts.js";
    import { makePostElement } from "{{site.baseurl}}/assets/js/posts.js";

    const discussionFeed = document.getElementById("discussion-feed");

    async function loadDiscussions() {
        try {
            const posts = await getPosts();
            discussionFeed.innerHTML = ''; // Clear existing content
            
            posts.forEach(post => {
                const postElement = makePostElement(
                    post.title,
                    post.description,
                    post.date,
                    post.images,
                    post.id,
                    'book', // Changed from carType to 'book'
                    post.username,
                    post.profilePicture
                );
                discussionFeed.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading discussions:', error);
            discussionFeed.innerHTML = '<div class="text-center text-gray-600">Error loading discussions. Please try again later.</div>';
        }
    }

    // Load discussions when the page loads
    document.addEventListener('DOMContentLoaded', loadDiscussions);
</script> 