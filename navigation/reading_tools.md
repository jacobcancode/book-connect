---
layout: post
title: Reading Tools
permalink: /reading-tools
menu: nav/home.html
search_exclude: true
---

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Reading Tools</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Reading Timer -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center mb-4">
                <img src="{{site.baseurl}}/assets/images/timer-icon.svg" alt="Timer" class="w-8 h-8 mr-2">
                <h2 class="text-2xl font-semibold">Reading Timer</h2>
            </div>
            <p class="mb-4 text-gray-600">Track your reading sessions with our built-in timer. Set goals and monitor your progress.</p>
            <div class="text-center">
                <div id="timer-display" class="text-4xl font-mono mb-4">00:00:00</div>
                <div class="flex justify-center space-x-4">
                    <button id="start-timer" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Start</button>
                    <button id="pause-timer" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Pause</button>
                    <button id="reset-timer" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Reset</button>
                </div>
            </div>
        </div>

        <!-- Reading Speed Calculator -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center mb-4">
                <img src="{{site.baseurl}}/assets/images/speed-icon.svg" alt="Speed" class="w-8 h-8 mr-2">
                <h2 class="text-2xl font-semibold">Reading Speed Calculator</h2>
            </div>
            <p class="mb-4 text-gray-600">Calculate your reading speed and track improvements over time.</p>
            <div class="space-y-4">
                <input type="number" id="words-read" placeholder="Words read" class="w-full p-2 border rounded">
                <input type="number" id="reading-time" placeholder="Time (minutes)" class="w-full p-2 border rounded">
                <button id="calculate-speed" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">Calculate</button>
                <div id="speed-results" class="mt-4"></div>
            </div>
        </div>

        <!-- Reading Journal -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-center mb-4">
                <img src="{{site.baseurl}}/assets/images/journal-icon.svg" alt="Journal" class="w-8 h-8 mr-2">
                <h2 class="text-2xl font-semibold">Reading Journal</h2>
            </div>
            <p class="mb-4 text-gray-600">Keep track of your thoughts and insights while reading.</p>
            <div class="space-y-4">
                <input type="number" id="journal-page" placeholder="Page number" class="w-full p-2 border rounded">
                <textarea id="journal-entry" placeholder="Write your thoughts here..." class="w-full p-2 border rounded h-32"></textarea>
                <button id="save-journal" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">Save Entry</button>
                <div id="journal-entries" class="mt-4"></div>
            </div>
        </div>
    </div>
</div>

<script type="module">
    import { ReadingTimer } from "{{site.baseurl}}/assets/js/features/reading/timer.js";
    import { ReadingSpeedCalculator } from "{{site.baseurl}}/assets/js/features/reading/speedCalculator.js";
    import { ReadingJournal } from "{{site.baseurl}}/assets/js/features/reading/journal.js";

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Reading Timer
        const timer = new ReadingTimer();
        document.getElementById('start-timer').addEventListener('click', () => timer.start());
        document.getElementById('pause-timer').addEventListener('click', () => timer.pause());
        document.getElementById('reset-timer').addEventListener('click', () => timer.reset());

        // Initialize Reading Speed Calculator
        const speedCalculator = new ReadingSpeedCalculator();
        document.getElementById('calculate-speed').addEventListener('click', () => {
            const words = parseInt(document.getElementById('words-read').value);
            const minutes = parseInt(document.getElementById('reading-time').value);
            if (words && minutes) {
                const speed = speedCalculator.calculateSpeed(words, minutes);
                const level = speedCalculator.getReadingLevel(speed);
                speedCalculator.displayResults(speed, level);
                speedCalculator.saveResult(speed, level);
            }
        });

        // Initialize Reading Journal
        const journal = new ReadingJournal();
        document.getElementById('save-journal').addEventListener('click', () => {
            const page = parseInt(document.getElementById('journal-page').value);
            const content = document.getElementById('journal-entry').value;
            if (page && content) {
                journal.addEntry(content, page);
                document.getElementById('journal-entry').value = '';
                document.getElementById('journal-page').value = '';
            }
        });
    });
</script> 