// Apply the copy/paste state when a new tab is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['isCopyPasteEnabled'], async (result) => {
      const isCopyPasteEnabled = result.isCopyPasteEnabled ?? true; // Default to true if not set
      
      if (isCopyPasteEnabled) {
        // Enable copy/paste
        chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            window.enableCopyPasteListener = (event) => {
              event.stopImmediatePropagation();
              return true;
            };
            document.addEventListener('paste', window.enableCopyPasteListener, true);
            document.addEventListener('copy', window.enableCopyPasteListener, true);
          }
        });
      } else {
        // Disable copy/paste
        chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            window.blockCopyPasteListener = (event) => {
              event.preventDefault();
              event.stopPropagation();
              return false;
            };
            document.addEventListener('copy', window.blockCopyPasteListener, true);
            document.addEventListener('paste', window.blockCopyPasteListener, true);
          }
        });
      }
    });
  }
});
