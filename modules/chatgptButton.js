import {createGoogleTabDiv, createGoogleTabSpan} from './utils.js';
export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#chatGpt-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('tous'));
  if (!actualBtn) return;

  const chatGptBtn = actualBtn.cloneNode(true);
  chatGptBtn.id = 'chatGpt-button';

  // Clear the anchor text
  chatGptBtn.innerText = '';

  // Create a div inside the anchor
  const innerSpan = createGoogleTabSpan('ChatGPT');
  const innerDiv = createGoogleTabDiv();
  innerDiv.appendChild(innerSpan);
  chatGptBtn.appendChild(innerDiv);

  const query = new URLSearchParams(window.location.search).get('q') || '';
  chatGptBtn.href =  `https://chat.openai.com/?q=${encodeURIComponent(query)}`;

  // Clone the parent div (which has role="listitem")
  const parentDiv = actualBtn.parentNode;
  const newParentDiv = parentDiv.cloneNode(false); // shallow clone without children

  // Add the ChatGPT button to the new div
  newParentDiv.appendChild(chatGptBtn);

  // Insert the new div after the original div
  parentDiv.parentNode.insertBefore(newParentDiv, parentDiv.nextSibling);
}
