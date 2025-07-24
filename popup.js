// Import custom i18n module
import { initI18n, getMessage } from './modules/i18n.js';

// Function to replace i18n message placeholders in the HTML
async function replaceI18nMessages() {
  // Initialize i18n module
  await initI18n();

  // First, handle elements with direct text content
  document.querySelectorAll('*').forEach(async element => {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = element.textContent.trim();
      if (text.match(/^__MSG_\w+__$/)) {
        const messageName = text.match(/__MSG_(\w+)__/)[1];
        const translatedMessage = await getMessage(messageName);
        if (translatedMessage) {
          element.textContent = translatedMessage;
        }
      }
    }
  });

  // Then, handle title tag specifically
  const title = document.querySelector('title');
  if (title && title.textContent.trim().match(/^__MSG_\w+__$/)) {
    const messageName = title.textContent.trim().match(/__MSG_(\w+)__/)[1];
    const translatedMessage = await getMessage(messageName);
    if (translatedMessage) {
      title.textContent = translatedMessage;
    }
  }

  // Finally, handle text nodes that are direct children of elements
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while (node = walker.nextNode()) {
    const text = node.nodeValue.trim();
    if (text.match(/^__MSG_\w+__$/)) {
      const messageName = text.match(/__MSG_(\w+)__/)[1];
      const translatedMessage = await getMessage(messageName);
      if (translatedMessage) {
        node.nodeValue = translatedMessage;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Replace i18n message placeholders
  await replaceI18nMessages();
});
