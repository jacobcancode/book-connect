import { fetchOptions, pythonURI } from "./config.js";

export async function getAllChat() {
    const endpoint = `${pythonURI}/api/carChat`;
    try {
        const response = await fetch(endpoint, {
            ...fetchOptions,
            method: 'GET'
        });
        
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
    const requestOptions = {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ message: content })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
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
        ...fetchOptions,
        method: 'DELETE',
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
        ...fetchOptions,
        method: 'PUT',
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
