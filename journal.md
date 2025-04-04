---
layout: base
title: Reading Journal
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-indigo-900">Reading Journal</h1>
            <p class="text-gray-600 mt-2">Track your thoughts and insights while reading</p>
        </div>

        <!-- Book Selection -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">Enter Book Details</h2>
            <div class="space-y-4">
                <div>
                    <label for="book-title" class="block text-sm font-medium text-gray-700">Book Title</label>
                    <input type="text" id="book-title" name="book-title" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter book title..." required>
                </div>
                <div>
                    <label for="book-author" class="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" id="book-author" name="book-author" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter author name..." required>
                </div>
            </div>
        </div>

        <!-- Journal Entry Form -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">New Journal Entry</h2>
            <div id="error-message" class="hidden mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"></div>
            <form id="journal-form" class="space-y-4">
                <div>
                    <label for="page-number" class="block text-sm font-medium text-gray-700">Page Number</label>
                    <input type="number" id="page-number" name="page-number" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                </div>
                <div>
                    <label for="journal-content" class="block text-sm font-medium text-gray-700">Your Thoughts</label>
                    <textarea id="journal-content" name="journal-content" rows="6" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                    Save Entry
                </button>
            </form>
        </div>

        <!-- Journal Entries -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-4">Your Journal Entries</h2>
            <div id="loading-message" class="hidden text-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p class="mt-2 text-gray-600">Loading entries...</p>
            </div>
            <div id="no-entries-message" class="hidden text-center py-4 text-gray-600">
                No entries yet. Start by adding your first journal entry!
            </div>
            <div id="journal-entries" class="space-y-4">
                <!-- Entries will be dynamically inserted here -->
            </div>
        </div>
    </div>
</div>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
    import { ReadingJournal } from "{{site.baseurl}}/assets/js/features/reading/journal.js";

    document.addEventListener('DOMContentLoaded', async function() {
        const journal = new ReadingJournal();
        const bookTitleInput = document.getElementById('book-title');
        const bookAuthorInput = document.getElementById('book-author');
        const journalForm = document.getElementById('journal-form');
        const errorMessage = document.getElementById('error-message');
        const loadingMessage = document.getElementById('loading-message');
        const noEntriesMessage = document.getElementById('no-entries-message');

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
            setTimeout(() => errorMessage.classList.add('hidden'), 5000);
        }

        function showLoading() {
            loadingMessage.classList.remove('hidden');
            noEntriesMessage.classList.add('hidden');
        }

        function hideLoading() {
            loadingMessage.classList.add('hidden');
        }

        function showNoEntries() {
            noEntriesMessage.classList.remove('hidden');
        }

        // Handle form submission
        journalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = bookTitleInput.value.trim();
            const author = bookAuthorInput.value.trim();
            const pageNumber = document.getElementById('page-number').value;
            const content = document.getElementById('journal-content').value;

            if (!title || !author) {
                showError('Please enter both book title and author');
                return;
            }

            if (!pageNumber || !content) {
                showError('Please fill in all fields');
                return;
            }

            try {
                const book = {
                    title: title,
                    author: author
                };
                await journal.setCurrentBook(book);
                await journal.addEntry(content, parseInt(pageNumber));
                journalForm.reset();
                bookTitleInput.value = title;
                bookAuthorInput.value = author;
            } catch (error) {
                console.error('Error saving journal entry:', error);
                showError('Failed to save journal entry. Please try again.');
            }
        });

        // Check authentication status
        try {
            const response = await fetch(`${pythonURI}/api/user`, {
                ...fetchOptions,
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                throw new Error('Failed to check authentication status');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            window.location.href = '/login';
        }
    });
</script> 