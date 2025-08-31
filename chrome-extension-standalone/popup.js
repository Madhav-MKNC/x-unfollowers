document.addEventListener('DOMContentLoaded', function () {
    // Load and display data from Chrome's storage when the popup is opened
    chrome.storage.local.get('x-unfollowers', function (result) {
        if (result['x-unfollowers']) {
            document.getElementById('responseContainer').innerHTML = result['x-unfollowers'];
        } else {
            document.getElementById('responseContainer').innerHTML = 'No data found.';
        }
    });

    // Listener for messages from the content script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.response) {
            document.getElementById('responseContainer').innerHTML = message.response;

            // Optionally, update the stored data in Chrome's storage
            chrome.storage.local.set({ 'x-unfollowers': message.response });
        }
    });

    // Add event listener for the 'bustButton'
    document.getElementById('bustButton').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "bustEm" });
        });
    });
});

