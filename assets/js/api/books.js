import { pythonURI, fetchOptions } from './config.js';

// Helper function to get token
const getToken = () => {
    return localStorage.getItem('token') || 
           document.cookie.split('; ')
              .find(row => row.startsWith('token='))
              ?.split('=')[1];
};

// Helper function to create request options
const createRequestOptions = (method, body = null) => {
    const token = getToken();
    return {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Origin': 'client',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...(body && { body: JSON.stringify(body) })
    };
};

export async function getCurrentlyReading() {
    try {
        console.log('Fetching currently reading book from:', `${pythonURI}/api/books/currently-reading`);
        const response = await fetch(`${pythonURI}/api/books/currently-reading`, createRequestOptions('GET'));
        
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
    const response = await fetch(`${pythonURI}/api/books/stats`, createRequestOptions('GET'));
    if (!response.ok) throw new Error('Failed to fetch reading stats');
    return response.json();
}

export async function getReadingGoals() {
    const response = await fetch(`${pythonURI}/api/books/goals`, createRequestOptions('GET'));
    if (!response.ok) throw new Error('Failed to fetch reading goals');
    return response.json();
}

export async function getBookRecommendations() {
    const response = await fetch(`${pythonURI}/api/books/recommendations`, createRequestOptions('GET'));
    if (!response.ok) throw new Error('Failed to fetch book recommendations');
    return response.json();
}

export async function getReadingHistory() {
    const response = await fetch(`${pythonURI}/api/books/history`, createRequestOptions('GET'));
    if (!response.ok) throw new Error('Failed to fetch reading history');
    return response.json();
}

export async function updateReadingProgress(bookId, progress) {
    const response = await fetch(`${pythonURI}/api/books/progress`, 
        createRequestOptions('POST', { bookId, progress }));
    if (!response.ok) throw new Error('Failed to update reading progress');
    return response.json();
}

export async function addBookToLibrary(bookData) {
    const response = await fetch(`${pythonURI}/api/books/add`, 
        createRequestOptions('POST', bookData));
    if (!response.ok) throw new Error('Failed to add book to library');
    return response.json();
}

export async function getBookClubs() {
    const response = await fetch(`${pythonURI}/api/books/clubs`, createRequestOptions('GET'));
    if (!response.ok) throw new Error('Failed to fetch book clubs');
    return response.json();
}

export async function joinBookClub(clubId) {
    const response = await fetch(`${pythonURI}/api/books/clubs/join`, 
        createRequestOptions('POST', { clubId }));
    if (!response.ok) throw new Error('Failed to join book club');
    return response.json();
} 