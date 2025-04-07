import { pythonURI } from './config.js';

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

export async function getUserProfile() {
    try {
        const response = await fetch(`${pythonURI}/api/user`, createRequestOptions('GET'));
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}
