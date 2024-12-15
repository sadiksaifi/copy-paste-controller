// Safari background script for Copy & Paste Controller

// Apply the copy/paste state when a new tab is loaded
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    browser.storage.sync.get(['isCopyPasteEnabled'], async (result) => {
      const isCopyPasteEnabled = result.isCopyPasteEnabled ?? true; // Default to true if not set
      
      if (isCopyPasteEnabled) {
        // Enable copy/paste
        browser.tabs.executeScript(tabId, {
          code: `
            window.enableCopyPasteListener = (event) => {
              event.stopImmediatePropagation();
              return true;
            };
            document.addEventListener('paste', window.enableCopyPasteListener, true);
            document.addEventListener('copy', window.enableCopyPasteListener, true);
          `
        });
      } else {
        // Disable copy/paste
        browser.tabs.executeScript(tabId, {
          code: `
            window.blockCopyPasteListener = (event) => {
              event.preventDefault();
              event.stopPropagation();
              return false;
            };
            document.addEventListener('copy', window.blockCopyPasteListener, true);
            document.addEventListener('paste', window.blockCopyPasteListener, true);
          `
        });
      }
    });
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        return Promise.resolve({ farewell: "goodbye" });
});
