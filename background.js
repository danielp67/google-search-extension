chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "updateBadge") {
    chrome.action.setBadgeText({ text: msg.count > 0 ? msg.count.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: '#4caf50' });
  } else if (msg.action === "reloadExtension") {
    // Reload all extension pages to apply the new language
    chrome.tabs.query({}, (tabs) => {
      const extensionUrl = chrome.runtime.getURL('');
      for (const tab of tabs) {
        // Only reload extension pages
        if (tab.url && tab.url.startsWith(extensionUrl)) {
          chrome.tabs.reload(tab.id);
        }
      }
    });
  }
});
