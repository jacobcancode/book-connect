---
layout: base
search_exclude: true
menu: nav/home.html
---

<script type="module">
import { getListings } from '{{site.baseurl}}/assets/js/api/listings.js'

getListings().then((listings) => {
    console.log(listings)
})
</script>