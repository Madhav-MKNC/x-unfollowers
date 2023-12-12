function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function navigateAndWait(url, waitTime) {
    window.location.href = url;
    await sleep(waitTime);
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

async function postFollowersAndGetResponse(followers) {
    try {
        const response = await fetch('https://x-unfollowers.gamhcrew.repl.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(followers),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        return data;
    } catch (error) {
        return 'Run python app.py';
    }
}

(async function main() {
    await navigateAndWait('https://twitter.com/5mknc5/followers', 5000);
    let allFollowers = await loadAndExtractFollowers();
    let response = await postFollowersAndGetResponse(allFollowers);
    console.log(response);
})();
