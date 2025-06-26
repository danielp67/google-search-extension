export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#reddit-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('actualité'));
  if (!actualBtn) return;

  const redditBtn = actualBtn.cloneNode(true);
  redditBtn.id = 'reddit-button';
  redditBtn.innerText = 'Reddit';

  const query = new URLSearchParams(window.location.search).get('q') || '';
  redditBtn.href = `https://www.reddit.com/search/?q=${encodeURIComponent(query)}`;

  actualBtn.parentNode.insertBefore(redditBtn, actualBtn.nextSibling);
}