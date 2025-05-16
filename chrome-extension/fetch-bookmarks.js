function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractBookmarkedTweets(tweetSet) {
    let tweetElements = document.querySelectorAll('[data-testid="tweet"]');

    tweetElements.forEach(tweet => {
        let tweetLink = tweet.querySelector('a[href*="/status/"]');

        if (tweetLink) {
            console.log(tweetSet.size)
            // console.log(tweetLink);
            // let href = tweetLink.getAttribute('href');
            // if (href) {
            //     let tweetIdMatch = href.match(/\/status\/(\d+)/);
            //     if (tweetIdMatch) {
            //         let tweetId = tweetIdMatch[1];
            //         tweetSet.add(tweetId);
            //     }
            // }
            tweetSet.add(tweetLink);
        }
        else {
            console.log(`\n❌\n${tweetElements}\n`);
        }
    });
}

async function loadAndExtractBookmarkedTweets() {
    let tweetIds = new Set();
    const timePeriod = 20000; // 20 seconds

    async function scrollAndExtract() {
        let startTime = Date.now();
        
        while (Date.now() - startTime < timePeriod) {
            window.scrollBy(0, window.innerHeight);
            await sleep(100);
            await extractBookmarkedTweets(tweetIds);
        }
    }

    await scrollAndExtract();

    while (true) {
        const userInput = prompt("Load more? (yes/y to continue, anything else to stop)").toLowerCase();
        
        if (userInput === 'yes' || userInput === 'y') {
            await scrollAndExtract();
        } else {
            break; 
        }
    }

    const tweets = Array.from(tweetIds);
    const set_tweets = new Set(tweets);
    return Array.from(set_tweets);
}

async function save_bookmarked_tweets(bookmarkedTweetIds) {
    console.log(`\n${bookmarkedTweetIds}\n`);
    const exportData = {
        bookmarkedTweets: bookmarkedTweetIds,
        dateExported: new Date().toISOString() // Timestamp for the export
    };
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bookmarked_tweets.json';
    link.click();

    console.log('✅ Bookmarked tweets exported to JSON.');
}

async function export_bookmarked_tweets() {
    if (window.location.href !== "https://x.com/i/bookmarks") {
        alert("Goto https://x.com/i/bookmarks");
        console.log("Not on the specified URL, script will not run.");
        return;
    }

    window.scrollTo(0, 0);
    await sleep(1000);

    let tweets = await loadAndExtractBookmarkedTweets();
    await save_bookmarked_tweets(tweets);
}

export_bookmarked_tweets()
