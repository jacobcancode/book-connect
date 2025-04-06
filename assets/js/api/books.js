import { pythonURI, fetchOptions } from './config.js';

export async function getCurrentlyReading() {
    try {
        console.log('Fetching currently reading book from:', `${pythonURI}/api/books/currently-reading`);
        const response = await fetch(`${pythonURI}/api/books/currently-reading`, {
            ...fetchOptions,
            method: 'GET'
        });
        
        if (!response.ok) {
            console.error('Failed to fetch currently reading book. Status:', response.status);
            if (response.status === 401) {
                window.location.href = '/login';
                return null;
            }
            throw new Error(`Failed to fetch currently reading book: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Currently reading book data:', data);
        return data;
    } catch (error) {
        console.error('Error in getCurrentlyReading:', error);
        throw error;
    }
}

export async function getReadingStats() {
    const response = await fetch(`${pythonURI}/api/books/stats`, {
        ...fetchOptions,
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch reading stats');
    return response.json();
}

export async function getReadingGoals() {
    const response = await fetch(`${pythonURI}/api/books/goals`, {
        ...fetchOptions,
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch reading goals');
    return response.json();
}

export async function getBookRecommendations() {
    const response = await fetch(`${pythonURI}/api/books/recommendations`, {
        ...fetchOptions,
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch book recommendations');
    return response.json();
}

export async function getReadingHistory() {
    const response = await fetch(`${pythonURI}/api/books/history`, {
        ...fetchOptions,
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch reading history');
    return response.json();
}

export async function updateReadingProgress(bookId, progress) {
    const response = await fetch(`${pythonURI}/api/books/progress`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ bookId, progress })
    });
    if (!response.ok) throw new Error('Failed to update reading progress');
    return response.json();
}

export async function addBookToLibrary(bookData) {
    const response = await fetch(`${pythonURI}/api/books/add`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify(bookData)
    });
    if (!response.ok) throw new Error('Failed to add book to library');
    return response.json();
}

export async function getBookClubs() {
    const response = await fetch(`${pythonURI}/api/books/clubs`, {
        ...fetchOptions,
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch book clubs');
    return response.json();
}

export async function joinBookClub(clubId) {
    const response = await fetch(`${pythonURI}/api/books/clubs/join`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ clubId })
    });
    if (!response.ok) throw new Error('Failed to join book club');
    return response.json();
} 