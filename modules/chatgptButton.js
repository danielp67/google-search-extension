export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#chatGpt-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('tous'));
  if (!actualBtn) return;

  const chatGptBtn = actualBtn.cloneNode(true);
  chatGptBtn.id = 'chatGpt-button';
  chatGptBtn.innerText = 'IA';

  const query = new URLSearchParams(window.location.search).get('q') || '';
  chatGptBtn.href =  `https://chat.openai.com/?q=${encodeURIComponent(query)}`;

  actualBtn.parentNode.insertBefore(chatGptBtn, actualBtn.nextSibling);
}
