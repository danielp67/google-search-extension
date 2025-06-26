/* (function () {
    'use strict';

    function addMapsButton() {
        // Find the existing results tabs (Images, News, etc.)
        const tabsContainer = document.querySelector('.crJ18e');
console.log(tabsContainer);
        // If tabs exist, proceed
        if (tabsContainer) {
            // Create the Maps button
            const mapsButton = document.createElement('a');
            mapsButton.classList.add('LatpMc', 'nPDzT', 'T3FoJb');  // Style to match other tabs

            // Create the inner elements for the Maps button
            const mapDiv = document.createElement('div');
            mapDiv.jsname = 'bVqjv';
            mapDiv.classList.add('YmvwI');
            mapDiv.textContent = 'Maps';

            mapsButton.appendChild(mapDiv);

            // Get the search query from the URL
            const searchQuery = new URLSearchParams(window.location.search).get('q');

            // Construct the Maps link with the query
            const mapsLink = `http://maps.google.com/maps?q=${searchQuery}`;
            mapsButton.href = mapsLink;

           // Find the last tab
            const lastTab = tabsContainer.lastElementChild;

            // Insert the Maps button before the last tab
            tabsContainer.insertBefore(mapsButton, lastTab);
        }
    }

    // Call the function to add the button
    addMapsButton();

})(); */

function addMapsButton() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar) return;

  // Évite les doublons
  if (document.querySelector('#maps-button')) return;

  const videosBtn = Array.from(navBar.querySelectorAll('a')).find(a => a.innerText.toLowerCase().includes('vidéo'));

  if (videosBtn) {
    const mapsBtn = videosBtn.cloneNode(true);
    mapsBtn.id = "maps-button";
    mapsBtn.innerText = "Maps";

    // Met à jour le lien de redirection
    const query = new URLSearchParams(window.location.search).get('q') || '';
    mapsBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    // Insère juste après "Vidéos"
    videosBtn.parentNode.insertBefore(mapsBtn, videosBtn.nextSibling);
  }
}

const observer = new MutationObserver(() => {
  addMapsButton();
});

observer.observe(document.body, { childList: true, subtree: true });
