// API Configuration
const config = {
    // API endpoints
    baseUrl: "https://bookconnect-832734119496.us-west1.run.app",
    
    // Get the appropriate API URL based on environment
    getApiUrl: (endpoint = '') => {
        return `${config.baseUrl}${endpoint}`;
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
    try {
        const response = await fetch(config.getApiUrl('/api/authenticate'), {
            ...config.getDefaultOptions(),
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
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
        throw error;
    }
}


// config.js

