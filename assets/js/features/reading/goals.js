export class ReadingGoals {
    constructor() {
        this.yearlyGoal = 0;
        this.dailyGoal = 0;
        this.booksRead = 0;
        this.minutesRead = 0;
    }

    async loadGoals() {
        try {
            const response = await fetch('/api/reading/goals');
            if (response.ok) {
                const data = await response.json();
                this.yearlyGoal = data.yearlyGoal;
                this.dailyGoal = data.dailyGoal;
                this.booksRead = data.booksRead;
                this.minutesRead = data.minutesRead;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error loading reading goals:', error);
        }
    }

    async setYearlyGoal(goal) {
        try {
            const response = await fetch('/api/reading/goals/yearly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ goal })
            });
            
            if (response.ok) {
                this.yearlyGoal = goal;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error setting yearly goal:', error);
        }
    }

    async setDailyGoal(goal) {
        try {
            const response = await fetch('/api/reading/goals/daily', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ goal })
            });
            
            if (response.ok) {
                this.dailyGoal = goal;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error setting daily goal:', error);
        }
    }

    updateDisplay() {
        const yearlyProgress = (this.booksRead / this.yearlyGoal) * 100;
        const dailyProgress = (this.minutesRead / this.dailyGoal) * 100;

        // Update yearly goal display
        const yearlyProgressBar = document.getElementById('yearly-progress');
        const yearlyProgressText = document.getElementById('yearly-progress-text');
        if (yearlyProgressBar && yearlyProgressText) {
            yearlyProgressBar.style.width = `${yearlyProgress}%`;
            yearlyProgressText.textContent = `${this.booksRead}/${this.yearlyGoal} books`;
        }

        // Update daily goal display
        const dailyProgressBar = document.getElementById('daily-progress');
        const dailyProgressText = document.getElementById('daily-progress-text');
        if (dailyProgressBar && dailyProgressText) {
            dailyProgressBar.style.width = `${dailyProgress}%`;
            dailyProgressText.textContent = `${this.minutesRead}/${this.dailyGoal} minutes`;
        }
    }

    async updateProgress(booksRead, minutesRead) {
        try {
            const response = await fetch('/api/reading/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ booksRead, minutesRead })
            });
            
            if (response.ok) {
                this.booksRead = booksRead;
                this.minutesRead = minutesRead;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error updating reading progress:', error);
        }
    }

    getProgress() {
        return {
            yearlyProgress: (this.booksRead / this.yearlyGoal) * 100,
            dailyProgress: (this.minutesRead / this.dailyGoal) * 100,
            booksRead: this.booksRead,
            minutesRead: this.minutesRead
        };
    }
} 