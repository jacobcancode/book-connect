export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:4888";
} else {
    pythonURI = import.meta.env.VITE_API_URL || "https://bookconnect-832734119496.us-west1.run.app";
}

// Base headers for all requests
const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Origin': import.meta.env.VITE_CORS_ORIGIN || 'client',
    'Access-Control-Allow-Origin': import.meta.env.VITE_CORS_ORIGIN || '*',
    'Access-Control-Allow-Methods': import.meta.env.VITE_CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': import.meta.env.VITE_CORS_HEADERS || 'Content-Type,Authorization,X-Requested-With,X-Origin',
    'Access-Control-Allow-Credentials': 'true'
};

export const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: baseHeaders
};

// User Login Function 
export async function login(options) {
    const requestOptions = {
        method: options.method,
        mode: 'cors',
        cache: options.cache,
        credentials: 'include',
        headers: {
            ...baseHeaders,
            ...options.headers,
            'Authorization': options.token ? `Bearer ${options.token}` : undefined
        },
        body: JSON.stringify(options.body)
    };

    // Clear the message area
    if (options.message) {
        document.getElementById(options.message).textContent = "";
    }

    try {
        const response = await fetch(options.URL, requestOptions);
        
        if (!response.ok) {
            let errorMessage;
            switch (response.status) {
                case 401:
                    errorMessage = 'Invalid username or password';
                    break;
                case 403:
                    errorMessage = 'Access forbidden. Please try logging in again';
                    break;
                case 404:
                    errorMessage = 'Login endpoint not found';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later';
                    break;
                default:
                    errorMessage = `Login failed: ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        if (!data || !data.token) {
            throw new Error('No authentication token received');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        if (options.message) {
            document.getElementById(options.message).textContent = error.message;
        }
        throw error;
    }
}


// config.js

