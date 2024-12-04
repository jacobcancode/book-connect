---
layout: base
title: Flocker Social Media Site
search_exclude: true
menu: nav/home.html
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Legendary Motorsport</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-900">

    <!-- Welcome Section -->
    <section id="welcome" class="h-screen flex items-center justify-center text-center">
        <h1 class="text-6xl font-extrabold text-red-600 fade-in">
            Welcome to <span class="text-rose-600">Legendary Motorsport</span>
        </h1>
    </section>

    <!-- About Us Section -->
    <section id="about" class="h-screen flex items-center justify-center text-center">
        <h2 class="text-5xl font-extrabold text-rose-600 fade-in">About Us</h2>
        <p class="text-2xl text-gray-700 mt-4 max-w-3xl fade-in">
            Legendary Motorsport is the ultimate social media hub for car enthusiasts! Whether you're looking to share
            your experiences, troubleshoot car issues, or showcase stunning photos of your vehicle, our platform is here 
            for you. We aim to connect gearheads, provide solutions, and celebrate the love of cars.
        </p>
    </section>

    <!-- Our Mission Section -->
    <section id="mission" class="h-screen flex items-center justify-center text-center bg-white">
        <div>
            <img src="images/LegendaryMotorsport-GTAV-Logo.png" 
                alt="Legendary Motorsport Logo" 
                class="h-80 w-auto mx-auto fade-in">
            <h3 class="text-4xl font-bold mt-8 fade-in">Our Mission</h3>
            <p class="text-2xl text-gray-700 mt-4 max-w-3xl fade-in">
                At Legendary Motorsport, we strive to create a community where car lovers can collaborate,
                share, and support each other. From vintage classics to modern supercars, every car has a story,
                and we’re here to help you tell yours.
            </p>
        </div>
    </section>

    <!-- What We Offer Section -->
    <section id="offer" class="h-screen flex items-center justify-center text-center">
        <div>
            <img src="images/964355023c8621887c37e1fcc3c1dc3aa9-koeniggsegg-one1.2x.h473.w710.png" 
                alt="Community Cars" 
                class="h-80 w-auto mx-auto fade-in">
            <h3 class="text-4xl font-bold mt-8 fade-in">What We Offer</h3>
            <p class="text-2xl text-gray-700 mt-4 max-w-3xl fade-in">
                - A platform to showcase your car photography.<br>
                - Forums for advice on car repairs and maintenance.<br>
                - A space to connect with like-minded car enthusiasts.
            </p>
        </div>
    </section>

    <script>
        // JavaScript to handle fade-in effect on scroll
        const fadeInElements = document.querySelectorAll('.fade-in');

        const handleScroll = () => {
            fadeInElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll); // Trigger on page load
    </script>
</body>
</html>
