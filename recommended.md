---
layout: base
search_exclude: true
menu: nav/home.html
---
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favorites and Listings</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .container {
            margin-bottom: 20px;
        }
        .favorite-item, .listing {
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
        .listing-image {
            max-width: 100%;
            height: auto;
        }
        button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Favorites</h1>
        <button id="display-favorites-button">Display Favorites</button>
        <div id="favorites-container"></div>
    </div>

<div class="container">
    <h1>Listings</h1>
    <div id="listings-container"></div>
</div>

<script type="module">
    import { getListings } from '{{site.baseurl}}/assets/js/api/listings.js';
    import { pythonURI } from '{{site.baseurl}}/assets/js/api/config.js';

    document.addEventListener("DOMContentLoaded", () => {
        const favoritesContainer = document.getElementById("favorites-container");
        const displayFavoritesButton = document.getElementById("display-favorites-button");

        // Function to fetch and display favorites
        async function get_favorites() {
            try {
                const response = await fetch(`${pythonURI}/api/itemStore`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Origin': 'client'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }

                const data = await response.json();
                console.log(data);

                // Clear old favorites
                favoritesContainer.innerHTML = '';

                // Populate favorites container with data
                data.forEach(item => {
                    const favoriteElement = document.createElement('div');
                    favoriteElement.classList.add('favorite-item');
                    favoriteElement.innerHTML = `
                        <h3>${item.name}</h3>
                        <button class="delete-button" data-name="${item.name}">Delete</button>
                    `;
                    favoritesContainer.appendChild(favoriteElement);
                });

                // Add event listeners to delete buttons
                const deleteButtons = document.querySelectorAll(".delete-button");
                deleteButtons.forEach(button => {
                    button.addEventListener("click", async (event) => {
                        const itemName = event.target.getAttribute("data-name");
                        await delete_favorite(itemName);
                    });
                });
            } catch (error) {
                console.error(error);
                favoritesContainer.innerHTML = '<p>Error loading favorites. Please try again.</p>';
            }
        }

        // Function to delete a favorite
        async function delete_favorite(itemName) {
            try {
                const response = await fetch(`${pythonURI}/api/itemStore`, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Origin': 'client'
                    },
                    body: JSON.stringify({ name: itemName })
                });

                if (!response.ok) {
                    throw new Error('Failed to delete favorite');
                }

                const data = await response.json();
                alert(data.message);
                await get_favorites(); // Refresh the favorites list
            } catch (error) {
                console.error('Error deleting favorite:', error);
                alert('An unexpected error occurred while deleting the item.');
            }
        }

        // Attach an event listener to the "Display Favorites" button
        if (displayFavoritesButton) {
            displayFavoritesButton.addEventListener('click', async () => {
                await get_favorites();
            });
        } else {
            console.error('Display Favorites button not found');
        }

        // Fetch and display listings
        getListings().then((listings) => {
            const listingsContainer = document.getElementById("listings-container");

            if (!listingsContainer) {
                console.error('Listings container not found');
                return;
            }

            listings.forEach(listing => {
                const listingElement = document.createElement("div");
                listingElement.classList.add("listing");

                const content = `
                    <img src="${listing.picture}" alt="${listing.name}" class="listing-image" />
                    <h2>${listing.name}</h2>
                    <p><strong>Type:</strong> ${listing.type}</p>
                    <p><strong>Mileage:</strong> ${listing.mileage}</p>
                    <p><strong>Price:</strong> ${listing.price}</p>
                    <button class="favorite-button" data-name="${listing.name}">Add to Favorites</button>
                `;
                listingElement.innerHTML = content;
                listingsContainer.appendChild(listingElement);
            });

            const favoriteButtons = document.querySelectorAll(".favorite-button");

            favoriteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const listingName = event.target.getAttribute("data-name");

                    try {
                        const response = await fetch(`${pythonURI}/api/itemStore`, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'default',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Origin': 'client'
                            },
                            body: JSON.stringify({ name: listingName })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            alert(`Listing '${data.name}' has been added to your favorites!`);
                        } else {
                            const error = await response.json();
                            alert(`Error: ${error.message}`);
                        }
                    } catch (error) {
                        console.error('Failed to add favorite:', error);
                        alert('An unexpected error occurred.');
                    }
                });
            });
        });
    });
</script>
</body>
