let isCopyPasteEnabled = false;

const toggleButton = document.getElementById("toggleButton");

// Load the initial state when popup opens
browser.storage.sync.get(['isCopyPasteEnabled'], async (result) => {
  isCopyPasteEnabled = result.isCopyPasteEnabled ?? true; // Default to true
  updateButtonState();
});

function updateButtonState() {
  toggleButton.textContent = isCopyPasteEnabled ? "Disable Copy/Paste" : "Enable Copy/Paste";
  toggleButton.className = isCopyPasteEnabled ? "disabled" : "enabled";
}

toggleButton.addEventListener("click", async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id) return;

  if (!isCopyPasteEnabled) {
    // Enable copy/paste
    await browser.tabs.executeScript(tab.id, {
      code: `
        // First, remove any existing blocking listeners
        if (window.blockCopyPasteListener) {
          document.removeEventListener('copy', window.blockCopyPasteListener, true);
          document.removeEventListener('paste', window.blockCopyPasteListener, true);
        }
        
        // Add enabling listeners
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
    await browser.tabs.executeScript(tab.id, {
      code: `
        // Remove enabling listeners if they exist
        if (window.enableCopyPasteListener) {
          document.removeEventListener('copy', window.enableCopyPasteListener, true);
          document.removeEventListener('paste', window.enableCopyPasteListener, true);
        }

        // Add blocking listeners
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

  isCopyPasteEnabled = !isCopyPasteEnabled;
  browser.storage.sync.set({ isCopyPasteEnabled });
  updateButtonState();
});
