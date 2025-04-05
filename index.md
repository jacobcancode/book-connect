---
layout: base
title: Book Connect
search_exclude: true
menu: nav/home.html
---

<style>
    /* Enhanced fade-in animation */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Gradient Animation */
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 15s ease infinite;
    }

    /* Infinite scroll animation */
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }

    .animate-scroll {
        animation: scroll 30s linear infinite;
    }

    /* Glass morphism effect */
    .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #4f46e5;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #4338ca;
    }

    /* Section transitions */
    .section-transition {
        transition: all 0.5s ease-in-out;
    }

    /* Card hover effects */
    .card-hover {
        transition: all 0.3s ease-in-out;
    }
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Button animations */
    .btn-animate {
        transition: all 0.3s ease-in-out;
    }
    .btn-animate:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
</style>

<!-- Public View (Non-authenticated) -->
<div id="public-view" class="hidden">
    <!-- Hero Section -->
    <div id="hero-section" class="relative isolate px-6 pt-14 lg:px-8 hidden">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-indigo-900 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
                <h1 class="fade-in bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text font-extrabold text-transparent tracking-tight sm:text-7xl">Connect Through Books</h1>
                <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Join the ultimate hub for book lovers—track your reading journey, connect with fellow readers, and discover your next favorite book.</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a href="{{site.baseurl}}/signup" class="btn-animate rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</a>
                    <a href="{{site.baseurl}}/login" class="btn-animate rounded-md bg-white px-6 py-3 text-lg font-bold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log In</a>
                </div>
            </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-500 to-indigo-900 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
    </div>

    <!-- Welcome Section -->
    <section class="py-32 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
        <div class="container mx-auto px-4 relative">
            <div class="max-w-5xl mx-auto text-center">
                <h2 class="text-6xl font-bold mb-12 fade-in">Welcome to Book Connect</h2>
                <p class="text-2xl text-indigo-100 mb-20 fade-in max-w-3xl mx-auto">Your personal reading companion that helps you track your progress, connect with fellow readers, and discover new books to love.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div class="card-hover p-10 bg-indigo-800/30 rounded-2xl backdrop-blur-sm fade-in transform hover:scale-105 transition-all duration-300">
                        <div class="text-6xl mb-8">📚</div>
                        <h3 class="text-2xl font-semibold mb-6">Track Your Reading</h3>
                        <p class="text-indigo-100 text-lg">Keep track of books you've read, are reading, and want to read.</p>
                    </div>
                    <div class="card-hover p-10 bg-indigo-800/30 rounded-2xl backdrop-blur-sm fade-in transform hover:scale-105 transition-all duration-300">
                        <div class="text-6xl mb-8">👥</div>
                        <h3 class="text-2xl font-semibold mb-6">Connect</h3>
                        <p class="text-indigo-100 text-lg">Join a community of book lovers and share your reading journey.</p>
                    </div>
                    <div class="card-hover p-10 bg-indigo-800/30 rounded-2xl backdrop-blur-sm fade-in transform hover:scale-105 transition-all duration-300">
                        <div class="text-6xl mb-8">🎯</div>
                        <h3 class="text-2xl font-semibold mb-6">Set Goals</h3>
                        <p class="text-indigo-100 text-lg">Set and achieve your reading goals with our tracking tools.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Us Section -->
    <section class="py-32 bg-white relative">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNzksNzAsMjI5LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div class="container mx-auto px-4 relative">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-6xl font-bold text-center mb-20 text-indigo-900 fade-in">About Us</h2>
                <div class="card-hover bg-indigo-50 p-16 rounded-3xl shadow-2xl fade-in">
                    <p class="text-2xl text-indigo-900 mb-10 leading-relaxed">Book Connect was created by passionate readers who wanted to make reading more social and engaging. We believe that sharing your reading journey with others can make the experience even more enjoyable.</p>
                    <p class="text-2xl text-indigo-900 mb-10 leading-relaxed">Our platform combines powerful reading tracking tools with social features to help you stay motivated and discover new books. Whether you're a casual reader or a bookworm, Book Connect is here to enhance your reading experience.</p>
                    <p class="text-2xl text-indigo-900 leading-relaxed">Join our community today and start your reading journey with Book Connect!</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="py-32 bg-gradient-to-b from-indigo-800 to-indigo-900 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
        <div class="container mx-auto px-4 relative">
            <h2 class="text-6xl font-bold text-center mb-20 text-white fade-in">What Our Readers Say</h2>
            <div class="overflow-hidden">
                <div class="animate-scroll flex space-x-8">
                    <!-- Review 1 -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">JD</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">John Doe</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"Book Connect has transformed how I track my reading journey. The community features are amazing!"</p>
                    </div>

                    <!-- Review 2 -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">AS</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">Alice Smith</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"The reading tracker is incredible! It helps me stay motivated to read more."</p>
                    </div>

                    <!-- Review 3 -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">MJ</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">Mike Johnson</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"Found my new favorite book through the recommendations feature. Highly recommend!"</p>
                    </div>

                    <!-- Duplicate reviews for infinite scroll effect -->
                    <!-- Review 1 (Duplicate) -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">JD</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">John Doe</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"Book Connect has transformed how I track my reading journey. The community features are amazing!"</p>
                    </div>

                    <!-- Review 2 (Duplicate) -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">AS</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">Alice Smith</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"The reading tracker is incredible! It helps me stay motivated to read more."</p>
                    </div>

                    <!-- Review 3 (Duplicate) -->
                    <div class="flex-shrink-0 w-[32rem] glass-effect p-10 rounded-2xl shadow-xl">
                        <div class="flex items-center mb-8">
                            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="text-white text-3xl font-bold">MJ</span>
                            </div>
                            <div class="ml-8">
                                <h4 class="text-2xl font-semibold text-white">Mike Johnson</h4>
                                <div class="flex text-yellow-400 text-2xl mt-2">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <p class="text-xl text-indigo-100 leading-relaxed">"Found my new favorite book through the recommendations feature. Highly recommend!"</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="py-32 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
        <div class="container mx-auto px-4 text-center relative">
            <h2 class="text-6xl font-bold mb-12 fade-in">Start Your Reading Journey</h2>
            <p class="text-2xl max-w-3xl mx-auto mb-16 fade-in leading-relaxed">
                Connect with fellow readers, track your progress, and discover your next favorite book!
            </p>
            <button id="get-started-btn" class="btn-animate bg-white text-indigo-900 text-2xl px-16 py-8 rounded-2xl shadow-2xl font-bold transition-all transform hover:scale-110 hover:shadow-3xl fade-in">
                Get Started Now
            </button>
        </div>
    </section>
</div>

<!-- Dashboard View (Authenticated) -->
<div id="dashboard-view" class="hidden">
    <div class="min-h-screen bg-gray-100">
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-8">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-bold mb-2">Welcome back, <span id="user-name">Reader</span>!</h1>
                <p class="text-xl">Continue your reading journey</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8">
            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 class="text-2xl font-bold text-indigo-600" id="books-read">0</h3>
                    <p class="text-gray-600">Books Read</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 class="text-2xl font-bold text-indigo-600" id="reading-streak">0</h3>
                    <p class="text-gray-600">Reading Streak</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 class="text-2xl font-bold text-indigo-600" id="reading-hours">0</h3>
                    <p class="text-gray-600">Reading Hours</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 class="text-2xl font-bold text-indigo-600" id="books-in-progress">0</h3>
                    <p class="text-gray-600">Books in Progress</p>
                </div>
            </div>

            <!-- Reading Tools Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Reading Timer -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4">Reading Timer</h2>
                    <div class="text-center mb-4">
                        <div id="timer-display" class="text-4xl font-bold text-indigo-600">00:00:00</div>
                    </div>
                    <div class="flex justify-center space-x-4">
                        <button id="start-timer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Start</button>
                        <button id="pause-timer" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">Pause</button>
                        <button id="reset-timer" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Reset</button>
                    </div>
                </div>

                <!-- Reading Speed Calculator -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4">Reading Speed Calculator</h2>
                    <form id="speed-form" class="space-y-4">
                        <div>
                            <label for="words-read" class="block text-sm font-medium text-gray-700">Words Read</label>
                            <input type="number" id="words-read" name="words-read" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>
                        <div>
                            <label for="time-taken" class="block text-sm font-medium text-gray-700">Time Taken (minutes)</label>
                            <input type="number" id="time-taken" name="time-taken" class="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>
                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                            Calculate Speed
                        </button>
                    </form>
                </div>

                <!-- Reading Journal Link -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4">Reading Journal</h2>
                    <p class="text-gray-600 mb-6">Track your thoughts and insights while reading</p>
                    <a href="{{site.baseurl}}/journal" class="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300">
                        Go to Journal
                    </a>
                </div>
            </div>

            <!-- Currently Reading -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold mb-4">Currently Reading</h2>
                <div class="flex items-center space-x-4">
                    <img id="current-book-cover" src="placeholder-book.jpg" alt="Book Cover" class="w-24 h-36 object-cover rounded">
                    <div>
                        <h3 class="text-xl font-semibold" id="current-book-title">No book selected</h3>
                        <p class="text-gray-600" id="current-book-author"></p>
                        <div class="mt-2">
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div id="reading-progress" class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
                            </div>
                            <p class="text-sm text-gray-600 mt-1" id="progress-text">0% complete</p>
                        </div>
                        <button id="update-progress" class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Update Progress</button>
                    </div>
                </div>
            </div>

            <!-- Reading Goals -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold mb-4">Reading Goals</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Yearly Goal</h3>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div id="yearly-progress" class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2" id="yearly-progress-text">0/12 books</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Daily Goal</h3>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div id="daily-progress" class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2" id="daily-progress-text">0/30 minutes</p>
                    </div>
                </div>
            </div>

            <!-- Book Clubs -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold mb-4">Book Clubs</h2>
                <div id="book-clubs" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Book clubs will be dynamically inserted here -->
                </div>
            </div>

            <!-- Recommendations -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold mb-4">Recommendations</h2>
                <div id="recommendations" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Recommendations will be dynamically inserted here -->
                </div>
            </div>

            <!-- Reading History -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold mb-4">Reading History</h2>
                <div id="reading-history" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Reading history will be dynamically inserted here -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto text-center">
        <p class="text-lg">&copy; 2024 Book Connect. All rights reserved.</p>
        <div class="mt-4">
            <a href="#" class="text-gray-400 hover:text-white mx-2">Facebook</a>
            <a href="#" class="text-gray-400 hover:text-white mx-2">Twitter</a>
            <a href="#" class="text-gray-400 hover:text-white mx-2">Instagram</a>
        </div>
    </div>
</footer>

<script type="module">
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    import {
        getCurrentlyReading,
        getReadingStats,
        getReadingGoals,
        getBookRecommendations,
        getReadingHistory,
        getBookClubs,
        updateReadingProgress
    } from '{{site.baseurl}}/assets/js/api/books.js';
    import { ReadingTimer } from '{{site.baseurl}}/assets/js/features/reading/timer.js';
    import { ReadingSpeedCalculator } from '{{site.baseurl}}/assets/js/features/reading/speedCalculator.js';
    import { ReadingJournal } from '{{site.baseurl}}/assets/js/features/reading/journal.js';

    document.addEventListener('DOMContentLoaded', async function() {
        const publicView = document.getElementById('public-view');
        const dashboardView = document.getElementById('dashboard-view');
        const heroSection = document.getElementById('hero-section');
        const getStartedBtn = document.getElementById('get-started-btn');

        // Add click handler for Get Started button
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                if (heroSection) {
                    heroSection.classList.remove('hidden');
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        try {
            // Check authentication status
            const response = await fetch(`${pythonURI}/api/user`, {
                ...fetchOptions,
                credentials: 'include'  // Ensure cookies are sent with the request
            });
            
            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const userData = await response.json();
            
            if (userData && userData.id) {
                // User is authenticated
                if (publicView) publicView.classList.add('hidden');
                if (dashboardView) dashboardView.classList.remove('hidden');
                
                // Load user data
                const userNameElement = document.getElementById('user-name');
                if (userNameElement) {
                    userNameElement.textContent = userData.name || 'Reader';
                }
                
                // Initialize reading tools
                const timer = new ReadingTimer();
                const speedCalculator = new ReadingSpeedCalculator();
                const journal = new ReadingJournal();

                // Timer event listeners
                document.getElementById('start-timer').addEventListener('click', () => timer.start());
                document.getElementById('pause-timer').addEventListener('click', () => timer.pause());
                document.getElementById('reset-timer').addEventListener('click', () => timer.reset());

                // Speed calculator event listener
                document.getElementById('speed-form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const words = parseInt(document.getElementById('words-read').value);
                    const minutes = parseInt(document.getElementById('time-taken').value);
                    if (words && minutes) {
                        const speed = speedCalculator.calculateSpeed(words, minutes);
                        const level = speedCalculator.getReadingLevel(speed);
                        speedCalculator.displayResults(speed, level);
                        await speedCalculator.saveResult(words, minutes);
                    }
                });

                // Load all dashboard data
                await loadDashboardData();
            } else {
                // User is not authenticated
                if (publicView) publicView.classList.remove('hidden');
                if (dashboardView) dashboardView.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            if (publicView) publicView.classList.remove('hidden');
            if (dashboardView) dashboardView.classList.add('hidden');
        }
    });

    async function loadDashboardData() {
        try {
            // Load currently reading book
            try {
                const currentBook = await getCurrentlyReading();
                const currentBookSection = document.getElementById('current-book');
                if (currentBook) {
                    document.getElementById('current-book-title').textContent = currentBook.title;
                    document.getElementById('current-book-author').textContent = currentBook.author;
                    document.getElementById('reading-progress').style.width = `${currentBook.progress}%`;
                    document.getElementById('progress-text').textContent = `${currentBook.progress}% complete`;
                    if (currentBookSection) currentBookSection.classList.remove('hidden');
                } else {
                    if (currentBookSection) currentBookSection.classList.add('hidden');
                }
            } catch (bookError) {
                console.error('Error loading currently reading book:', bookError);
                const currentBookSection = document.getElementById('current-book');
                if (currentBookSection) currentBookSection.classList.add('hidden');
            }

            // Load reading stats
            try {
                const stats = await getReadingStats();
                if (stats) {
                    document.getElementById('books-read').textContent = stats.booksRead;
                    document.getElementById('reading-streak').textContent = stats.readingStreak;
                    document.getElementById('reading-hours').textContent = stats.readingHours;
                    document.getElementById('books-in-progress').textContent = stats.booksInProgress;
                }
            } catch (statsError) {
                console.error('Error loading reading stats:', statsError);
            }

            // Load reading goals
            try {
                const goals = await getReadingGoals();
                if (goals) {
                    updateGoalProgress(goals);
                }
            } catch (goalsError) {
                console.error('Error loading reading goals:', goalsError);
            }

            // Load book recommendations
            try {
                const recommendations = await getBookRecommendations();
                if (recommendations) {
                    displayRecommendations(recommendations);
                }
            } catch (recError) {
                console.error('Error loading recommendations:', recError);
            }

            // Load reading history
            try {
                const history = await getReadingHistory();
                if (history) {
                    displayReadingHistory(history);
                }
            } catch (historyError) {
                console.error('Error loading reading history:', historyError);
            }

            // Load book clubs
            try {
                const clubs = await getBookClubs();
                if (clubs) {
                    displayBookClubs(clubs);
                }
            } catch (clubsError) {
                console.error('Error loading book clubs:', clubsError);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    function updateGoalProgress(goals) {
        const yearlyProgress = (goals.booksRead / goals.yearlyGoal) * 100;
        const dailyProgress = (goals.minutesRead / goals.dailyGoal) * 100;

        document.getElementById('yearly-progress').style.width = `${yearlyProgress}%`;
        document.getElementById('yearly-progress-text').textContent = `${goals.booksRead}/${goals.yearlyGoal} books`;
        
        document.getElementById('daily-progress').style.width = `${dailyProgress}%`;
        document.getElementById('daily-progress-text').textContent = `${goals.minutesRead}/${goals.dailyGoal} minutes`;
    }

    function displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations');
        container.innerHTML = recommendations.map(book => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-600">${book.author}</p>
            </div>
        `).join('');
    }

    function displayReadingHistory(history) {
        const container = document.getElementById('reading-history');
        container.innerHTML = history.map(book => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-600">${book.author}</p>
                <p class="text-sm text-gray-500">Completed on ${new Date(book.completedDate).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    function displayBookClubs(clubs) {
        const container = document.getElementById('book-clubs');
        container.innerHTML = clubs.map(club => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <h3 class="text-lg font-semibold">${club.name}</h3>
                <p class="text-gray-600">${club.currentBook}</p>
                <p class="text-sm text-gray-500">${club.members} members</p>
                <button class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Join Club</button>
            </div>
        `).join('');
    }

    // Add event listener for progress update
    document.getElementById('update-progress')?.addEventListener('click', async () => {
        const progress = prompt('Enter your current page number:');
        if (progress) {
            try {
                await updateReadingProgress(currentBook.id, progress);
                await loadDashboardData(); // Reload data to reflect changes
            } catch (error) {
                console.error('Error updating progress:', error);
            }
        }
    });

    // Handle scroll animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    const handleScroll = () => {
        fadeInElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
</script>
