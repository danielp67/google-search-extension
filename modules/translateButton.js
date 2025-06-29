export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#translate-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('web'));
  if (!actualBtn) return;

  const translateBtn = actualBtn.cloneNode(true);
  translateBtn.id = 'translate-button';
  translateBtn.innerText = 'Translate';

  const query = new URLSearchParams(window.location.search).get('q') || '';
  translateBtn.href = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(query)}&op=translate`;

  actualBtn.parentNode.insertBefore(translateBtn, actualBtn.nextSibling);
}
