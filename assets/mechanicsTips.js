import { fetchOptions, pythonURI } from "./config.js";

// Function to create a new mechanics tip
export async function createMechanicsTip(tipData) {
  const endpoint = `${pythonURI}/api/mechanicsTips`;
  const options = {
    ...fetchOptions,
    method: "POST",
    body: JSON.stringify(tipData),
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to create tip: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating mechanics tip:", error.message);
    return null;
  }
}

// Function to fetch a mechanics tip by ID
export async function getMechanicsTipById(tipId) {
  const endpoint = `${pythonURI}/api/mechanicsTips`;
  const options = {
    ...fetchOptions,
    method: "GET",
    body: JSON.stringify({ id: tipId }),
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch tip: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mechanics tip:", error.message);
    return null;
  }
}

// Function to update a mechanics tip
export async function updateMechanicsTip(tipId, updatedData) {
  const endpoint = `${pythonURI}/api/mechanicsTips`;
  const options = {
    ...fetchOptions,
    method: "PUT",
    body: JSON.stringify({ id: tipId, ...updatedData }),
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to update tip: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating mechanics tip:", error.message);
    return null;
  }
}

// Function to delete a mechanics tip
export async function deleteMechanicsTip(tipId) {
  const endpoint = `${pythonURI}/api/mechanicsTips`;
  const options = {
    ...fetchOptions,
    method: "DELETE",
    body: JSON.stringify({ id: tipId }),
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to delete tip: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting mechanics tip:", error.message);
    return null;
  }
}

