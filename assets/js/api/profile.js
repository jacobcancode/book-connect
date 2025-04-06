import { fetchOptions, pythonURI } from './config.js';

// Update User Data with "Put"
export function putUpdate(options) {
    const requestOptions = {
        ...fetchOptions,
        method: 'PUT',
        body: JSON.stringify(options.body)
    };

    fetch(options.URL, requestOptions)
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
    const requestOptions = {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify(options.body)
    };

    if (options.message) {
        document.getElementById(options.message).textContent = "";
    }

    fetch(options.URL, requestOptions)
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
    const requestOptions = {
        ...fetchOptions,
        method: 'DELETE',
        body: JSON.stringify(options.body)
    };

    fetch(options.URL, requestOptions)
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
            ...fetchOptions,
            method: 'DELETE'
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