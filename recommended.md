---
layout: base
search_exclude: true
menu: nav/home.html
---

<div id="listings-container">

</div>

<!-- <script type="module">
import { getListings } from '{{site.baseurl}}/assets/js/api/listings.js'

getListings().then((listings) => {
    console.log(listings);

    const listingsContainer = document.getElementById("listings-container");

    listings.forEach(listing => {
        // Create a container for each listing
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        // Create the content for the listing
        const content = `
            <img src="${listing.picture}" alt="${listing.name}" class="listing-image" />
            <h2>${listing.name}</h2>
            <p><strong>Type:</strong> ${listing.type}</p>
            <p><strong>Mileage:</strong> ${listing.mileage}</p>
            <p><strong>Price:</strong> ${listing.price}</p>
        `;

        // Add the content to the listing container
        listingElement.innerHTML = content;

        // Append the listing to the listings container
        listingsContainer.appendChild(listingElement);
    });
});
</script> -->

<script type="module">
import { getListings } from '{{site.baseurl}}/assets/js/api/listings.js';
import { pythonURI } from '{{site.baseurl}}/assets/js/api/config.js'

getListings().then((listings) => {
    console.log(listings);

    const listingsContainer = document.getElementById("listings-container");

    listings.forEach(listing => {
        // Create a container for each listing
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        // Create the content for the listing
        const content = `
            <img src="${listing.picture}" alt="${listing.name}" class="listing-image" />
            <h2>${listing.name}</h2>
            <p><strong>Type:</strong> ${listing.type}</p>
            <p><strong>Mileage:</strong> ${listing.mileage}</p>
            <p><strong>Price:</strong> ${listing.price}</p>
            <button class="favorite-button" data-name="${listing.name}">Add to Favorites</button>
        `;

        // Add the content to the listing container
        listingElement.innerHTML = content;

        // Append the listing to the listings container
        listingsContainer.appendChild(listingElement);
    });

    // Attach event listeners to all favorite buttons
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const listingName = event.target.getAttribute("data-name");

            try {
                const response = await fetch(`${pythonURI}/api/itemStore`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'include', // include, same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Origin': 'client' // New custom header to identify source
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

