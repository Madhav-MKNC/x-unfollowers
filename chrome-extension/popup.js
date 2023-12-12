document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bustButton').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "bustEm" });
        });
    });
});


// Listener for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.response) {
        document.getElementById('responseContainer').innerText = message.response;
    }
});
