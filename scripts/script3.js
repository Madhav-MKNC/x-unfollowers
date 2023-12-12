function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadMoreFollowers() {
    let lastHeight = document.body.scrollHeight;
    let attempts = 0;
    while (attempts < 3) { // Allow a few attempts in case of slow loading
        window.scrollBy(0, 500); // Scroll down a bit
        await sleep(1000); // Increase sleep duration to allow more time for loading

        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
            attempts++; // Increment attempts if no new content is loaded
        } else {
            attempts = 0; // Reset attempts if new content is loaded
        }
        lastHeight = newHeight;
    }
}

async function extractFollowersHandles() {
    // Select all follower elements
    let followerElements = document.querySelectorAll('div[data-testid="UserCell"]'); // Example selector, replace with actual

    // Extract follower handles
    let followerHandles = [];
    followerElements.forEach(element => {
        let handleElement = element.querySelector('a[href^="/"]'); // This selector targets an 'a' tag with a 'href' attribute starting with '/'
        if (handleElement) {
            let followerHandle = handleElement.getAttribute('href').slice(1); // Remove the leading '/' to get the handle
            followerHandles.push(followerHandle);
        }
    });

    return followerHandles;
}

(async function main() {
    await loadMoreFollowers();
    let followersHandles = await extractFollowersHandles();
    console.log(followersHandles);
})();
