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

// Update User Data with "Put"
export function putUpdate(options) {
    fetch(options.URL, createRequestOptions('PUT', options.body))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            options.callback();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            if (options.message) {
                document.getElementById(options.message).textContent = error.message;
            }
        });
}

// Update User Data with "POST" 
export function postUpdate(options) {
    if (options.message) {
        document.getElementById(options.message).textContent = "";
    }

    fetch(options.URL, createRequestOptions('POST', options.body))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            options.callback();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            if (options.message) {
                document.getElementById(options.message).textContent = error.message;
            }
        });
}

export function deleteData(options) {
    fetch(options.URL, createRequestOptions('DELETE', options.body))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            options.callback();
        })
        .catch(error => {
            console.error('Error deleting data:', error);
            if (options.message) {
                document.getElementById(options.message).textContent = error.message;
            }
        });
}

export async function logoutUser() {
    const URL = `${pythonURI}/api/authenticate`;
    
    try {
        const response = await fetch(URL, {
            ...createRequestOptions('DELETE')
        });
        
        if (response.ok) {
            window.location.href = "/login";
        } else {
            const errorMessage = await response.text();
            console.error('Logout failed:', errorMessage);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// session
// asynchronous session response
//session call api----?
// then--> javascript promise
// data loaded
// screen establishes 5 different sessions
// talk about play
// iteration style ----> little pieces
// Your teacher likes to iterate -->