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

    // Default request options
    getDefaultOptions: () => ({
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
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


// config.js

