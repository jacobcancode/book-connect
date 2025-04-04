export class BookProgress {
    constructor() {
        this.currentBook = null;
        this.currentPage = 0;
        this.totalPages = 0;
    }

    async loadCurrentBook() {
        try {
            const response = await fetch('/api/books/currently-reading');
            if (response.ok) {
                const book = await response.json();
                this.currentBook = book;
                this.currentPage = book.currentPage;
                this.totalPages = book.totalPages;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error loading current book:', error);
        }
    }

    async updateProgress(pageNumber) {
        if (!this.currentBook) return;

        try {
            const response = await fetch('/api/books/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookId: this.currentBook.id,
                    pageNumber
                })
            });
            
            if (response.ok) {
                this.currentPage = pageNumber;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error updating book progress:', error);
        }
    }

    updateDisplay() {
        if (!this.currentBook) return;

        const progressPercentage = (this.currentPage / this.totalPages) * 100;
        
        // Update book title and author
        const titleElement = document.getElementById('current-book-title');
        const authorElement = document.getElementById('current-book-author');
        if (titleElement) titleElement.textContent = this.currentBook.title;
        if (authorElement) authorElement.textContent = this.currentBook.author;

        // Update progress bar
        const progressBar = document.getElementById('reading-progress');
        const progressText = document.getElementById('progress-text');
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        if (progressText) progressText.textContent = `${this.currentPage}/${this.totalPages} pages (${Math.round(progressPercentage)}%)`;

        // Update book cover image
        const coverImage = document.getElementById('current-book-cover');
        if (coverImage && this.currentBook.coverUrl) {
            coverImage.src = this.currentBook.coverUrl;
            coverImage.alt = `${this.currentBook.title} cover`;
        }
    }

    getProgress() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            percentage: (this.currentPage / this.totalPages) * 100
        };
    }

    async addBook(bookData) {
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
            
            if (response.ok) {
                const newBook = await response.json();
                this.currentBook = newBook;
                this.currentPage = 0;
                this.totalPages = newBook.totalPages;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error adding new book:', error);
        }
    }

    async markAsComplete() {
        if (!this.currentBook) return;

        try {
            const response = await fetch(`/api/books/${this.currentBook.id}/complete`, {
                method: 'POST'
            });
            
            if (response.ok) {
                this.currentBook = null;
                this.currentPage = 0;
                this.totalPages = 0;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error marking book as complete:', error);
        }
    }
} 