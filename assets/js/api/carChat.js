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

export async function getAllChat() {
    const endpoint = `${pythonURI}/api/carChat`;
    try {
        const response = await fetch(endpoint, createRequestOptions('GET'));
        
        if (!response.ok) {
            throw new Error(`Failed to fetch chat: ${response.status}`);
        }
        
        const chat = await response.json();
        return chat;
    } catch (error) {
        console.error("Error fetching chat:", error.message);
        return null;
    }
}

export async function postChat(content) {
    const endpoint = `${pythonURI}/api/carChat`;
    try {
        const response = await fetch(endpoint, createRequestOptions('POST', { message: content }));
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to post chat: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error posting chat:', error);
        return { success: false };
    }
}

export async function deleteChat(id) {
    const endpoint = `${pythonURI}/api/carChat`;
    const requestOptions = {
        ...createRequestOptions('DELETE'),
        body: JSON.stringify({ id })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to delete chat: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error deleting chat:', error);
        return { success: false };
    }
}

export async function updateChat(id, content) {
    const endpoint = `${pythonURI}/api/carChat`;
    const requestOptions = {
        ...createRequestOptions('PUT'),
        body: JSON.stringify({ id, message: content })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to update chat: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error updating chat:', error);
        return { success: false };
    }
}
