---
layout: base
search_exclude: true
menu: nav/home.html
---

<style>
    /* Style for the Display Favorites button */
    #display-favorites-button {
        background-color: red;
        color: white;
        font-size: 18px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
    }

    #display-favorites-button:hover {
        background-color: darkred;
    }

    /* Style for the Add to Favorites buttons */
    .favorite-button {
        background-color: red;
        color: white;
        font-size: 16px;
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .favorite-button:hover {
        background-color: darkred;
    }

    /* Container spacing */
    #favorites-container,
    #listings-container {
        margin-top: 20px;
    }
</style>

<div>
    <button id="display-favorites-button">Display Favorites</button>
</div>

<div id="favorites-container">

</div>

<div id="listings-container">

</div>

<script type="module">
import { getListings } from '{{site.baseurl}}/assets/js/api/listings.js';
import { pythonURI } from '{{site.baseurl}}/assets/js/api/config.js';

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
            `;
            favoritesContainer.appendChild(favoriteElement);
        });
    } catch (error) {
        console.error(error);
        favoritesContainer.innerHTML = '<p>Error loading favorites. Please try again.</p>';
    }
}

// Attach an event listener to the "Display Favorites" button
displayFavoritesButton.addEventListener('click', async () => {
    await get_favorites();
});

// Fetch and display listings
getListings().then((listings) => {
    const listingsContainer = document.getElementById("listings-container");

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
</script>
