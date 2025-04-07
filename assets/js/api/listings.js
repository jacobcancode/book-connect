import { pythonURI } from "./config.js";

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

export async function getListings() {
    const endpoint = `${pythonURI}/api/fetchListings`;
    try {
        const response = await fetch(endpoint, createRequestOptions('GET'));
        
        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.status}`);
        }
        
        const listings = await response.json();
        return listings;
    } catch (error) {
        console.error("Error fetching listings:", error.message);
        return null;
    }
}