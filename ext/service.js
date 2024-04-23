chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapeProfiles
    });
});

async function scrapeProfiles(links) {
    const linkedinLinks = links.split(",").map(link => link.trim());
    
    for (const link of linkedinLinks) {
        openProfileTab(link);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Add a delay of 2 seconds
        await fetch('http://localhost:3000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ linkedinLinks: [link] })
        });
    }
}

function openProfileTab(link) {
    chrome.tabs.create({ url: link });
}
