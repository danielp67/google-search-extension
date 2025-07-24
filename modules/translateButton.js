export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#translate-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('web'));
  if (!actualBtn) return;

  const translateBtn = actualBtn.cloneNode(true);
  translateBtn.id = 'translate-button';
  translateBtn.innerText = 'Translate';

  const query = new URLSearchParams(window.location.search).get('q') || '';

  // Get the default language from storage
  chrome.storage.sync.get("defaultLanguage", ({ defaultLanguage }) => {
    // If no default language is set, use English as the target language
    const targetLang = defaultLanguage || "en";

    // Set the source language to auto-detect and the target language to the user's preference
    translateBtn.href = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodeURIComponent(query)}&op=translate`;

    // Add the button to the DOM after setting the href
    actualBtn.parentNode.insertBefore(translateBtn, actualBtn.nextSibling);
  });
}
