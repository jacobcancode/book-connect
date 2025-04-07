import { pythonURI } from "./config.js";

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

export async function createUserCar(make, model, year, engine_type, trim, color, vin) {
    const endpoint = `${pythonURI}/api/userCars`;
    try {
        const response = await fetch(endpoint, createRequestOptions('POST', {
            make,
            model,
            year,
            engine_type,
            trim,
            color,
            vin
        }));
        if (!response.ok) {
            throw new Error(`Failed to create car: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating car:", error.message);
        return null;
    }
}

export async function getUserCars() {
    const endpoint = `${pythonURI}/api/userCars`;
    try {
        const response = await fetch(endpoint, createRequestOptions('GET'));
        
        if (!response.ok) {
            throw new Error(`Failed to fetch cars: ${response.status}`);
        }
        
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error("Error fetching cars:", error.message);
        return null;
    }
}

export async function deleteCarById(id) {
    const endpoint = `${pythonURI}/api/userCars`;
    const requestOptions = {
        ...fetchOptions,
        method: 'DELETE',
        body: JSON.stringify({ id })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to delete car: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting car:", error.message);
        return false;
    }
}