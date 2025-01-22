---
layout: base
search_exclude: true
menu: nav/home.html
---

<div id="listings-container">

</div>

<script type="module">
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
</script>


