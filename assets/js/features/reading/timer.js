import { pythonURI, fetchOptions } from "../../api/config.js";

export class ReadingTimer {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.currentSessionId = null;
    }

    async start(bookId = null) {
        if (!this.isRunning) {
            this.startTime = Date.now();
            this.isRunning = true;
            
            try {
                const response = await fetch(`${pythonURI}/api/reading/sessions`, {
                    ...fetchOptions,
                    method: 'POST',
                    body: JSON.stringify({ book_id: bookId })
                });
                
                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = '{{site.baseurl}}/login';
                        return;
                    }
                    throw new Error('Failed to start session');
                }
                
                const data = await response.json();
                this.currentSessionId = data.id;
            } catch (error) {
                console.error('Error starting reading session:', error);
                // Continue timer even if API call fails
            }
            
            this.timerInterval = setInterval(() => this.updateDisplay(), 1000);
        }
    }

    async pause() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
            this.elapsedTime += Date.now() - this.startTime;
            
            if (this.currentSessionId) {
                try {
                    const response = await fetch(`${pythonURI}/api/reading/sessions/${this.currentSessionId}`, {
                        ...fetchOptions,
                        method: 'PUT'
                    });
                    
                    if (!response.ok) {
                        if (response.status === 401) {
                            window.location.href = '{{site.baseurl}}/login';
                            return;
                        }
                        throw new Error('Failed to end session');
                    }
                } catch (error) {
                    console.error('Error ending reading session:', error);
                }
            }
        }
    }

    reset() {
        this.pause();
        this.startTime = null;
        this.elapsedTime = 0;
        this.currentSessionId = null;
        this.updateDisplay();
    }

    updateDisplay() {
        const totalSeconds = Math.floor((this.elapsedTime + (this.isRunning ? Date.now() - this.startTime : 0)) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const display = document.getElementById('timer-display');
        if (display) {
            display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    getElapsedTime() {
        return this.elapsedTime + (this.isRunning ? Date.now() - this.startTime : 0);
    }

    // Cleanup method to be called when component is unmounted
    cleanup() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
} 