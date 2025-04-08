// API Configuration
const config = {
    // API endpoints
    baseUrl: "https://bookconnect-832734119496.us-west1.run.app",
    
    // Token management
    getToken: () => {
        return localStorage.getItem('token') || 
               document.cookie.split('; ')
                  .find(row => row.startsWith('token='))
                  ?.split('=')[1];
    },

    setToken: (token) => {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/; secure; samesite=lax`;
    },

    clearToken: () => {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
    },
    
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
export { config };

// Login function
export async function login(credentials) {
    const url = config.getApiUrl('/api/authenticate');
    console.log('Login URL:', url);
    console.log('Login credentials:', credentials);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': window.location.origin
            },
            body: JSON.stringify(credentials)
        });

        console.log('Login response status:', response.status);
        console.log('Login response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            if (response.status === 503) {
                throw new Error('Service Unavailable: The backend service is currently down. Please try again later.');
            }
            const errorData = await response.json().catch(() => ({}));
            console.error('Login error response:', errorData);
            throw new Error(errorData.message || `Login failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('Login response data:', data);

        // Check for token in different possible locations
        const token = data?.token || data?.access_token || data?.jwt;
        if (!token) {
            console.error('No token found in response. Response data:', data);
            throw new Error('No authentication token received');
        }

        // Store the token
        config.setToken(token);

        // Return the token and any other user data
        return {
            token,
            ...data
        };
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
    const token = config.getToken();
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
            if (response.status === 401) {
                // Token might be expired, clear it
                config.clearToken();
                throw new Error('Session expired. Please log in again.');
            }
            throw new Error(`Request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
}

// Export token management functions
export const getToken = config.getToken;
export const setToken = config.setToken;
export const clearToken = config.clearToken;

// config.js

