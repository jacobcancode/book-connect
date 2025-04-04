export class ReadingSpeedCalculator {
    constructor() {
        this.wordsRead = 0;
        this.timeInMinutes = 0;
        this.history = this.loadHistory();
    }

    calculateSpeed(words, minutes) {
        if (minutes === 0) return 0;
        return Math.round(words / minutes);
    }

    getReadingLevel(speed) {
        if (speed < 150) return "Beginner";
        if (speed < 250) return "Intermediate";
        if (speed < 350) return "Advanced";
        return "Expert";
    }

    displayResults(speed, level) {
        const resultsDiv = document.getElementById('speed-results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="bg-indigo-50 p-4 rounded-lg mt-4">
                    <p class="text-lg font-semibold text-indigo-900">Your Reading Speed: ${speed} WPM</p>
                    <p class="text-sm text-indigo-600">Level: ${level}</p>
                    <div class="mt-2">
                        <p class="text-sm text-gray-600">Words Read: ${this.wordsRead}</p>
                        <p class="text-sm text-gray-600">Time Taken: ${this.timeInMinutes} minutes</p>
                    </div>
                </div>
            `;
        }
    }

    saveResult(words, minutes) {
        // Validate inputs
        if (!words || !minutes) {
            throw new Error('Words and minutes are required');
        }

        const wordsNum = parseInt(words);
        const minutesNum = parseInt(minutes);

        if (isNaN(wordsNum) || isNaN(minutesNum)) {
            throw new Error('Invalid input values');
        }

        if (wordsNum <= 0 || minutesNum <= 0) {
            throw new Error('Values must be greater than 0');
        }

        this.wordsRead = wordsNum;
        this.timeInMinutes = minutesNum;

        const speed = this.calculateSpeed(wordsNum, minutesNum);
        const level = this.getReadingLevel(speed);
        
        const entry = {
            words_read: wordsNum,
            minutes_taken: minutesNum,
            speed: speed,
            level: level,
            test_date: new Date().toISOString()
        };

        this.history.push(entry);
        this.saveHistory();
        this.displayResults(speed, level); // Display results after saving
        return entry;
    }

    loadHistory() {
        try {
            const history = localStorage.getItem('readingSpeedHistory');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('readingSpeedHistory', JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    getHistory() {
        return this.history;
    }

    displayHistory() {
        const historyDiv = document.getElementById('speed-history');
        if (!historyDiv) return;

        if (!this.history || this.history.length === 0) {
            historyDiv.innerHTML = '<p class="text-gray-600">No history available</p>';
            return;
        }

        historyDiv.innerHTML = `
            <div class="space-y-4">
                ${this.history.map(entry => `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-semibold">${entry.words_read} words</p>
                                <p class="text-sm text-gray-600">${entry.minutes_taken} minutes</p>
                            </div>
                            <div class="text-sm text-gray-500">
                                ${new Date(entry.test_date).toLocaleDateString()}
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-indigo-600">
                                Speed: ${entry.speed} WPM
                            </p>
                            <p class="text-sm text-indigo-600">
                                Level: ${entry.level}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.displayHistory();
    }
} 