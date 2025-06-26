chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "updateBadge") {
    chrome.action.setBadgeText({ text: msg.count > 0 ? msg.count.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: '#4caf50' });
  }
});
