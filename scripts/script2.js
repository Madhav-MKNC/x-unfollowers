function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadMoreFollowers() {
    let lastHeight = document.body.scrollHeight;
    while (true) {
        window.scrollBy(0, 500); // Scroll down a smaller amount, e.g., 500px
        await sleep(1000); // Wait a bit for the page to load more followers

        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
            break; // No more content is loading, stop scrolling
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
