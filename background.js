// Set default state when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ darkModeEnabled: false });
});

// Listen for tab updates to apply dark mode if enabled
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    chrome.storage.local.get(['darkModeEnabled'], (result) => {
      if (result.darkModeEnabled) {
        chrome.tabs.sendMessage(tabId, { action: 'toggleDarkMode', enabled: true });
      }
    });
  }
});
