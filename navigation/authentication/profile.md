---
layout: needsAuth
title: Profile
permalink: /profile
menu: nav/home.html
---

<style>
    .book-container {
        -webkit-perspective: 1000px;
        perspective: 1000px;
        -webkit-perspective-origin: 50% 50%;
        perspective-origin: 50% 50%;
        position: relative;
        width: 250px;
        height: 350px;
        margin: 2rem auto;
    }

    .book {
        width: 100%;
        height: 100%;
        position: relative;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        cursor: pointer;
        -webkit-transition: -webkit-transform 0.3s ease;
        transition: transform 0.3s ease;
        will-change: transform;
    }

    .book-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        border-radius: 8px;
        -webkit-transform: translateZ(15px);
        transform: translateZ(15px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        will-change: box-shadow;
    }

    .book-spine {
        position: absolute;
        width: 25px;
        height: 100%;
        background: linear-gradient(90deg, #4338ca, #5b21b6);
        left: 0;
        -webkit-transform: rotateY(90deg) translateZ(-15px);
        transform: rotateY(90deg) translateZ(-15px);
        border-radius: 4px 0 0 4px;
    }

    .book-pages {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f3f4f6;
        -webkit-transform: translateZ(-15px);
        transform: translateZ(-15px);
        border-radius: 8px;
        overflow: hidden;
    }

    .page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        border: 1px solid #e5e7eb;
        -webkit-transform-origin: left;
        transform-origin: left;
        border-radius: 8px;
        will-change: transform;
    }

    .book-title {
        color: white;
        font-size: 1.8rem;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        margin-bottom: 1rem;
    }

    .book-author {
        color: white;
        font-size: 1.2rem;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        margin-bottom: 0.5rem;
    }

    .book-details {
        color: white;
        font-size: 1rem;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }
        50% {
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.8);
        }
    }

    @keyframes turn {
        0%, 100% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(90deg);
        }
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    .animate-glow {
        animation: glow 3s ease-in-out infinite;
    }

    .animate-turn {
        animation: turn 3s ease-in-out infinite;
    }
</style>

<body class="bg-gray-100 flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md w-full py-4 px-6 flex justify-between items-center">
        <h1 class="text-xl font-bold">Book Connect</h1>
    </nav>
    
    <div class="flex justify-center items-center flex-col flex-grow">
        <div class="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center space-x-8">
                    <img id="profile-picture" src="default-profile.jpg" alt="Profile Picture" class="w-36 h-36 rounded-full object-cover border-4 border-gray-300">
                    <div>
                        <h2 class="text-3xl font-bold" id="username">Username</h2>
                        <p class="text-gray-600">Book Enthusiast</p>
                        <button class="mt-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 transition" onclick="location.href='{{site.baseurl}}/settings'">Edit Profile</button>
                    </div>
                </div>
                <div class="flex space-x-8 text-center">
                    <div>
                        <p class="text-2xl font-semibold" id="books-read">0</p>
                        <p class="text-gray-500">Books Read</p>
                    </div>
                    <div>
                        <p class="text-2xl font-semibold" id="reading-streak">0</p>
                        <p class="text-gray-500">Reading Streak</p>
                    </div>
                    <div>
                        <p class="text-2xl font-semibold" id="reading-hours">0</p>
                        <p class="text-gray-500">Reading Hours</p>
                    </div>
                </div>
            </div>

            <!-- Enhanced Book Animation -->
            <div class="book-container">
                <div class="book">
                    <div class="book-cover">
                        <div class="book-title">Currently Reading</div>
                        <div class="book-author">Your Latest Book</div>
                        <div class="book-details">Page 123 of 456</div>
                    </div>
                    <div class="book-spine"></div>
                    <div class="book-pages">
                        <div class="page"></div>
                        <div class="page"></div>
                        <div class="page"></div>
                        <div class="page"></div>
                        <div class="page"></div>
                    </div>
                </div>
            </div>

            <!-- Reading Progress -->
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Reading Progress</h3>
                <div class="w-full bg-gray-200 rounded-full h-4">
                    <div class="bg-indigo-600 h-4 rounded-full" style="width: 27%"></div>
                </div>
                <p class="text-sm text-gray-600 mt-2">27% complete</p>
            </div>

            <!-- Reading History -->
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Reading History</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Book cards will be dynamically inserted here -->
                </div>
            </div>
        </div>
    </div>
</body>

<script type="module">
    import { getUserProfile } from "{{site.baseurl}}/assets/js/api/user.js";

    function startAnimations() {
        const book = document.querySelector('.book');
        const bookCover = document.querySelector('.book-cover');
        const pages = document.querySelectorAll('.page');

        // Add animation classes
        book.classList.add('animate-float');
        bookCover.classList.add('animate-glow');
        
        // Add staggered page turn animations
        pages.forEach((page, index) => {
            page.classList.add('animate-turn');
            page.style.animationDelay = `${index * 0.2}s`;
        });
    }

    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const profile = await getUserProfile();
            if (profile) {
                document.getElementById("username").textContent = profile.name;
                document.getElementById("profile-picture").src = profile.avatar || "default-profile.jpg";
                document.getElementById("books-read").textContent = profile.booksRead || "0";
                document.getElementById("reading-streak").textContent = profile.readingStreak || "0";
                document.getElementById("reading-hours").textContent = profile.readingHours || "0";
            }

            // Start animations after a short delay to ensure DOM is ready
            setTimeout(startAnimations, 100);
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    });
</script>

