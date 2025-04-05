export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:4888";
} else {
    pythonURI = "https://bookconnect-832734119496.us-west1.run.app";
}

export const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

// User Login Function 
export function login(options) {
    const requestOptions = {
        ...fetchOptions,
        method: options.method,
        cache: options.cache,
        body: JSON.stringify(options.body)
    };

    // Clear the message area
    document.getElementById(options.message).textContent = "";

    // Fetch JWT
    fetch(options.URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid credentials');
                } else if (response.status === 403) {
                    throw new Error('Access forbidden');
                } else if (response.status === 404) {
                    throw new Error('Endpoint not found');
                } else {
                    throw new Error(`Server error: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            if (data && data.token) {
                // Store the token if provided
                localStorage.setItem('auth_token', data.token);
            }
            options.callback();
        })
        .catch(error => {
            console.error('Login error:', error);
            document.getElementById(options.message).textContent = error.message;
        });
}


// config.js

