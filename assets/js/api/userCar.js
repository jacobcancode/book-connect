import { fetchOptions, pythonURI } from "./config.js";

export async function createUserCar(make, model, year, engine_type, trim, color, vin) {
    const endpoint = `${pythonURI}/api/userCars`;
    const requestOptions = {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({
            make,
            model,
            year,
            engine_type,
            trim,
            color,
            vin
        })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
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
        const response = await fetch(endpoint, {
            ...fetchOptions,
            method: 'GET'
        });
        
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