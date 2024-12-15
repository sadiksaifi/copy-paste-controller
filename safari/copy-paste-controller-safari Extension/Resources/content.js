// Safari content script for Copy & Paste Controller

// Initial communication with background script
browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

// Listen for messages from background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    
    // Handle copy/paste state changes if needed
    if (request.action === 'toggleCopyPaste') {
        if (request.enabled) {
            // Enable copy/paste
            document.removeEventListener('copy', window.blockCopyPasteListener, true);
            document.removeEventListener('paste', window.blockCopyPasteListener, true);
        } else {
            // Disable copy/paste
            document.removeEventListener('copy', window.enableCopyPasteListener, true);
            document.removeEventListener('paste', window.enableCopyPasteListener, true);
        }
    }
});
