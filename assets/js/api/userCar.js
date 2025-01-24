import { fetchOptions, pythonURI } from "./config.js";

export async function createUserCar(make, model, year, engine_type, trim, color, vin) {
    const endpoint = pythonURI + '/api/userCar';
    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'X-Origin': 'client' // New custom header to identify source
        },
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
        const response = await fetch(endpoint, fetchOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}