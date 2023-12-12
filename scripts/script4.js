function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractFollowersHandles(followerHandles) {
    let followerElements = document.querySelectorAll('div[data-testid="UserCell"]'); // Example selector, replace with actual

    followerElements.forEach(element => {
        let handleElement = element.querySelector('a[href^="/"]'); // This selector targets an 'a' tag with a 'href' attribute starting with '/'
        if (handleElement) {
            let followerHandle = handleElement.getAttribute('href').slice(1); // Remove the leading '/' to get the handle
            if (!followerHandles.includes(followerHandle)) {
                followerHandles.push(followerHandle);
            }
        }
    });
}

async function loadAndExtractFollowers() {
    let lastHeight = document.body.scrollHeight;
    let followerHandles = [];
    let attempts = 0;

    while (attempts < 3) {
        window.scrollBy(0, 500);
        await sleep(1000); // less sleep less accuracy

        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
            attempts++;
        } else {
            attempts = 0;
        }

        await extractFollowersHandles(followerHandles);
        lastHeight = newHeight;
    }

    return followerHandles;
}

(async function main() {
    let allFollowers = await loadAndExtractFollowers();
    console.log(allFollowers);
})();
