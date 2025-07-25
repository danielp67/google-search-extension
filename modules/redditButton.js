export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#reddit-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('actualité'));
  if (!actualBtn) return;

  const redditBtn = actualBtn.cloneNode(true);
  redditBtn.id = 'reddit-button';

  // Clear the anchor text
  redditBtn.innerText = '';

  // Create a div inside the anchor
  const innerDiv = document.createElement('div');
  innerDiv.className = "YmvwI";
  innerDiv.innerText = 'Reddit';
  redditBtn.appendChild(innerDiv);

  const query = new URLSearchParams(window.location.search).get('q') || '';
  redditBtn.href = `https://www.reddit.com/search/?q=${encodeURIComponent(query)}`;

  // Clone the parent div (which has role="listitem")
  const parentDiv = actualBtn.parentNode;
  const newParentDiv = parentDiv.cloneNode(false); // shallow clone without children

  // Add the Reddit button to the new div
  newParentDiv.appendChild(redditBtn);

  // Insert the new div after the original div
  parentDiv.parentNode.insertBefore(newParentDiv, parentDiv.nextSibling);
}
