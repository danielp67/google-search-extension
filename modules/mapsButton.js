export function run() {
/*   const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#maps-button')) return;

  const videoBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('vidéo'));
  if (!videoBtn) return;

  const mapsBtn = videoBtn.cloneNode(true);
  mapsBtn.id = 'maps-button';
  mapsBtn.innerText = 'Maps';

  const query = new URLSearchParams(window.location.search).get('q') || '';
  mapsBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  videoBtn.parentNode.insertBefore(mapsBtn, videoBtn.nextSibling);
}


function addMapsButton() { */
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