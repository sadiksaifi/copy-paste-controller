let isPastingEnabled = false;

const toggleButton = document.getElementById("toggleButton");

// Load the initial state when popup opens
chrome.storage.sync.get(['isPastingEnabled'], async (result) => {
  isPastingEnabled = result.isPastingEnabled ?? true; // Default to true (pasting enabled)
  updateButtonState();
});

function updateButtonState() {
  toggleButton.textContent = isPastingEnabled ? "Disable Pasting" : "Enable Pasting";
  toggleButton.className = isPastingEnabled ? "disabled" : "enabled";
}

toggleButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id) return;

  if (!isPastingEnabled) {
    // Enable pasting by adding our override listener
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Add a listener that prevents the default paste blocking
        window.enablePastingListener = (event) => {
          event.stopImmediatePropagation();
          return true;
        };
        document.addEventListener('paste', window.enablePastingListener, true);
      }
    });
  } else {
    // Disable pasting by removing our override listener
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.removeEventListener('paste', window.enablePastingListener, true);
        delete window.enablePastingListener;
      }
    });
  }

  isPastingEnabled = !isPastingEnabled;
  // Save the state
  chrome.storage.sync.set({ isPastingEnabled });
  updateButtonState();
});
