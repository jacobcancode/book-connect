import { fetchOptions, pythonURI } from "./config.js";

export async function getAllComments() {
    const endpoint = `${pythonURI}/api/carComment`;
    try {
        const response = await fetch(endpoint, {
            ...fetchOptions,
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch comments: ${response.status}`);
        }
        
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        return null;
    }
}

export async function getCommentsByPostId(postId) {
    const endpoint = `${pythonURI}/api/carComment/${postId}`;
    try {
        const response = await fetch(endpoint, {
            ...fetchOptions,
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch comments: ${response.status}`);
        }
        
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        return null;
    }
}

export async function postComment(comment) {
    const endpoint = `${pythonURI}/api/carComment`;
    const requestOptions = {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({
            content: comment.content,
            post_id: comment.post_id
        })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to post comment: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error posting comment:', error);
        return { success: false };
    }
}

export async function deleteComment(id) {
    const endpoint = `${pythonURI}/api/carComment`;
    const requestOptions = {
        ...fetchOptions,
        method: 'DELETE',
        body: JSON.stringify({ id })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to delete comment: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error deleting comment:', error);
        return { success: false };
    }
}

export async function updateComment(id, content) {
    const endpoint = `${pythonURI}/api/carComment`;
    const requestOptions = {
        ...fetchOptions,
        method: 'PUT',
        body: JSON.stringify({ id, content })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to update comment: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        console.error('Error updating comment:', error);
        return { success: false };
    }
}

