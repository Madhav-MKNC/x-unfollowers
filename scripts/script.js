// Function to simulate scrolling to load more followers
function loadMoreFollowers() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Function to extract followers' handles
function extractFollowersHandles() {
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

// Load more followers (if necessary)
loadMoreFollowers();

// Wait for content to load and then extract followers' handles
setTimeout(() => {
    let followersHandles = extractFollowersHandles();
    console.log(followersHandles);
}, 3000); // Adjust timeout as needed
