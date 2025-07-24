function addMapsButton() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar) return;

  // Avoid duplicates
  if (document.querySelector('#maps-button')) return;

  // Try to find the Videos button in multiple languages
  const videoTexts = ['vidéo', 'video', 'videos', 'vídeo', 'видео', '動画', '비디오', '视频', 'فيديو', 'वीडियो'];
  let videosBtn = null;

  for (const text of videoTexts) {
    videosBtn = Array.from(navBar.querySelectorAll('a')).find(a => 
      a.innerText.toLowerCase().includes(text)
    );
    if (videosBtn) break;
  }

  if (videosBtn) {
    const mapsBtn = videosBtn.cloneNode(true);
    mapsBtn.id = "maps-button";
    mapsBtn.innerText = "Maps";

    // Update the redirect link
    const query = new URLSearchParams(window.location.search).get('q') || '';
    mapsBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    // Insert just after the Videos button
    videosBtn.parentNode.insertBefore(mapsBtn, videosBtn.nextSibling);
  }
}

const observer = new MutationObserver(() => {
  addMapsButton();
});

observer.observe(document.body, { childList: true, subtree: true });
