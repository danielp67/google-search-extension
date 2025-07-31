import {createGoogleTabDiv, createGoogleTabSpan} from './utils.js';

export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#translate-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('web'));
  if (!actualBtn) return;

  const translateBtn = actualBtn.cloneNode(true);
  translateBtn.id = 'translate-button';

  // Clear the anchor text
  translateBtn.innerText = '';

  // Create a div inside the anchor
  const innerSpan = createGoogleTabSpan('Translate');
  const innerDiv = createGoogleTabDiv();
  innerDiv.appendChild(innerSpan);
  translateBtn.appendChild(innerDiv);

  const query = new URLSearchParams(window.location.search).get('q') || '';

  // Get the default language from storage
  chrome.storage.sync.get("defaultLanguage", ({ defaultLanguage }) => {
    // If no default language is set, use English as the target language
    const targetLang = defaultLanguage || "en";

    // Set the source language to auto-detect and the target language to the user's preference
    translateBtn.href = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodeURIComponent(query)}&op=translate`;

    // Clone the parent div (which has role="listitem")
    const parentDiv = actualBtn.parentNode;
    const newParentDiv = parentDiv.cloneNode(false); // shallow clone without children

    // Add the Translate button to the new div
    newParentDiv.appendChild(translateBtn);

    // Insert the new div after the original div
    parentDiv.parentNode.insertBefore(newParentDiv, parentDiv.nextSibling);
  });
}
