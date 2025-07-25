export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar) return;

  // Évite les doublons
  if (document.querySelector('#maps-button')) return;

  const videosBtn = Array.from(navBar.querySelectorAll('a')).find(a => a.innerText.toLowerCase().includes('vidéo'));

  if (videosBtn) {
    const mapsBtn = videosBtn.cloneNode(true);
    mapsBtn.id = "maps-button";

    // Clear the anchor text
    mapsBtn.innerText = "";

    // Create a div inside the anchor
    const innerDiv = document.createElement('div');
    innerDiv.className = "YmvwI";
    innerDiv.innerText = "Maps";
    mapsBtn.appendChild(innerDiv);

    // Met à jour le lien de redirection
    const query = new URLSearchParams(window.location.search).get('q') || '';
    mapsBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    // Clone the parent div (which has role="listitem")
    const parentDiv = videosBtn.parentNode;
    const newParentDiv = parentDiv.cloneNode(false); // shallow clone without children

    // Add the Maps button to the new div
    newParentDiv.appendChild(mapsBtn);

    // Insert the new div after the original div
    parentDiv.parentNode.insertBefore(newParentDiv, parentDiv.nextSibling);
  }
}
