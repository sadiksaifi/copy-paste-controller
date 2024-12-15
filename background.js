// Apply the paste enabling state when a new tab is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['isPastingEnabled'], async (result) => {
      // Default to true if not set
      if (result.isPastingEnabled ?? true) {
        chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            // Add a listener that prevents the default paste blocking
            window.enablePastingListener = (event) => {
              event.stopImmediatePropagation();
              return true;
            };
            document.addEventListener('paste', window.enablePastingListener, true);
          }
        });
      }
    });
  }
});
