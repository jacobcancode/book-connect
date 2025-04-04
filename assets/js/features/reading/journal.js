import { pythonURI, fetchOptions } from "../../api/config.js";

export class ReadingJournal {
    constructor() {
        this.currentBook = null;
        this.entries = [];
    }

    async setCurrentBook(book) {
        if (!book || !book.title || !book.author) {
            throw new Error('Book title and author are required');
        }

        try {
            // First, check if the book exists in the database
            const response = await fetch(`${pythonURI}/api/books/search?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}`, {
                ...fetchOptions,
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                throw new Error('Failed to search for book');
            }

            const data = await response.json();
            let bookId;

            if (data.length > 0) {
                // Book exists, use its ID
                bookId = data[0].id;
            } else {
                // Book doesn't exist, create it
                const createResponse = await fetch(`${pythonURI}/api/books`, {
                    ...fetchOptions,
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({
                        title: book.title,
                        author: book.author
                    })
                });

                if (!createResponse.ok) {
                    if (createResponse.status === 401) {
                        window.location.href = '{{site.baseurl}}/login';
                        return;
                    }
                    throw new Error('Failed to create book');
                }

                const newBook = await createResponse.json();
                bookId = newBook.id;
            }

            this.currentBook = { ...book, id: bookId };
            await this.loadEntries(bookId);
            return this.currentBook;
        } catch (error) {
            console.error('Error setting current book:', error);
            throw error;
        }
    }

    async addEntry(content, pageNumber) {
        if (!this.currentBook || !this.currentBook.id) {
            throw new Error('No book selected');
        }

        if (!content || !pageNumber) {
            throw new Error('Content and page number are required');
        }

        const pageNum = parseInt(pageNumber);
        if (isNaN(pageNum) || pageNum <= 0) {
            throw new Error('Invalid page number');
        }

        try {
            const response = await fetch(`${pythonURI}/api/reading/journal`, {
                ...fetchOptions,
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    book_id: this.currentBook.id,
                    page_number: pageNum,
                    content: content
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                if (response.status === 400) {
                    const error = await response.json();
                    throw new Error(error.message || 'Invalid request data');
                }
                if (response.status === 404) {
                    throw new Error('Book not found');
                }
                throw new Error('Failed to save journal entry');
            }

            const entry = await response.json();
            this.entries.push(entry);
            this.displayEntries();
            return entry;
        } catch (error) {
            console.error('Error adding journal entry:', error);
            throw error;
        }
    }

    async loadEntries(bookId) {
        try {
            const response = await fetch(`${pythonURI}/api/reading/journal/${bookId}`, {
                ...fetchOptions,
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                throw new Error('Failed to load journal entries');
            }

            const data = await response.json();
            this.entries = data;
            this.displayEntries();
            return this.entries;
        } catch (error) {
            console.error('Error loading journal entries:', error);
            throw error;
        }
    }

    async editEntry(entryId, content, pageNumber) {
        if (!entryId || !content || !pageNumber) {
            throw new Error('Entry ID, content, and page number are required');
        }

        const pageNum = parseInt(pageNumber);
        if (isNaN(pageNum) || pageNum <= 0) {
            throw new Error('Invalid page number');
        }

        try {
            const response = await fetch(`${pythonURI}/api/reading/journal/${entryId}`, {
                ...fetchOptions,
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    content: content,
                    page_number: pageNum
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                if (response.status === 404) {
                    throw new Error('Entry not found');
                }
                throw new Error('Failed to update journal entry');
            }

            const updatedEntry = await response.json();
            const index = this.entries.findIndex(e => e.id === entryId);
            if (index !== -1) {
                this.entries[index] = updatedEntry;
                this.displayEntries();
            }
            return updatedEntry;
        } catch (error) {
            console.error('Error editing journal entry:', error);
            throw error;
        }
    }

    async deleteEntry(entryId) {
        if (!entryId) {
            throw new Error('Entry ID is required');
        }

        try {
            const response = await fetch(`${pythonURI}/api/reading/journal/${entryId}`, {
                ...fetchOptions,
                credentials: 'include',
                method: 'DELETE'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                if (response.status === 404) {
                    throw new Error('Entry not found');
                }
                throw new Error('Failed to delete journal entry');
            }

            this.entries = this.entries.filter(e => e.id !== entryId);
            this.displayEntries();
            return true;
        } catch (error) {
            console.error('Error deleting journal entry:', error);
            throw error;
        }
    }

    async loadBooks() {
        try {
            const response = await fetch(`${pythonURI}/api/reading/journal/books`, {
                ...fetchOptions,
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '{{site.baseurl}}/login';
                    return;
                }
                throw new Error('Failed to load books');
            }

            return await response.json();
        } catch (error) {
            console.error('Error loading books:', error);
            throw error;
        }
    }

    displayEntries() {
        const entriesDiv = document.getElementById('journal-entries');
        if (!entriesDiv) return;

        if (!this.entries || this.entries.length === 0) {
            entriesDiv.innerHTML = '<p class="text-gray-600">No entries available</p>';
            return;
        }

        entriesDiv.innerHTML = `
            <div class="space-y-4">
                ${this.entries.map(entry => `
                    <div class="bg-white p-4 rounded-lg shadow">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-semibold">Page ${entry.page_number}</p>
                                <p class="text-sm text-gray-500">${new Date(entry.created_at).toLocaleDateString()}</p>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="journal.editEntry(${entry.id})" class="text-indigo-600 hover:text-indigo-800">Edit</button>
                                <button onclick="journal.deleteEntry(${entry.id})" class="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="text-gray-700">${entry.content}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayEntry(entry) {
        const entryDiv = document.getElementById('journal-entry');
        if (!entryDiv) return;

        entryDiv.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold">Page ${entry.page_number}</p>
                        <p class="text-sm text-gray-500">${new Date(entry.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="mt-2">
                    <p class="text-gray-700">${entry.content}</p>
                </div>
            </div>
        `;
    }
} 