// API Configuration
const config = {
    // API endpoints
    baseUrl: "https://bookconnect-832734119496.us-west1.run.app",
    
    // Get the appropriate API URL based on environment
    getApiUrl: (endpoint = '') => {
        const url = `${config.baseUrl}${endpoint}`;
        console.log('Constructed URL:', url);
        return url;
    },

    // Default request options for unauthenticated requests
    getDefaultOptions: () => ({
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': window.location.origin
        }
    }),

    // Request options for authenticated requests
    getAuthOptions: (token) => ({
        ...config.getDefaultOptions(),
        credentials: 'include',
        headers: {
            ...config.getDefaultOptions().headers,
            'Authorization': `Bearer ${token}`
        }
    })
};

// Export the configuration
export const pythonURI = config.baseUrl;
export const fetchOptions = config.getDefaultOptions();

// Login function
export async function login(credentials) {
    const url = config.getApiUrl('/api/authenticate');
    console.log('Login URL:', url);
    
    try {
        const response = await fetch(url, {
            ...config.getDefaultOptions(),
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            if (response.status === 503) {
                throw new Error('Service Unavailable: The backend service is currently down. Please try again later.');
            }
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Login failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data?.token) {
            throw new Error('No authentication token received');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
        }
        throw error;
    }
}

// Function to make authenticated requests
export async function authenticatedRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    const url = config.getApiUrl(endpoint);
    const requestOptions = {
        ...config.getAuthOptions(token),
        ...options
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
}

// config.js

