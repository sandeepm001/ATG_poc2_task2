chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'scrapeProfiles') {
        const profileLinks = message.profileLinks;
        for (let i = 0; i < profileLinks.length; i++) {
            const profileLink = profileLinks[i];
            // Open profile link in a new tab
            const tab = await openProfileInNewTab(profileLink);
            // Scrape profile data
            const profileData = await scrapeProfileData(tab);
            // Close the tab after scraping
            await closeTab(tab);
            // Send the scraped data to the background script
            chrome.runtime.sendMessage({ action: 'profileScraped', profileData });
        }
    }
});

async function openProfileInNewTab(link) {
    return new Promise(resolve => {
        chrome.tabs.create({ url: link }, tab => {
            resolve(tab);
        });
    });
}

async function scrapeProfileData(tab) {
    const profileData = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            const nameElement = document.querySelector('.profile-name');
            const locationElement = document.querySelector('.profile-location');
            const aboutElement = document.querySelector('.profile-about');
            const bioElement = document.querySelector('.profile-bio');
            const followerCountElement = document.querySelector('.profile-follower-count');
            const connectionCountElement = document.querySelector('.profile-connection-count');

            return {
                name: nameElement ? nameElement.textContent.trim() : '',
                location: locationElement ? locationElement.textContent.trim() : '',
                about: aboutElement ? aboutElement.textContent.trim() : '',
                bio: bioElement ? bioElement.textContent.trim() : '',
                followerCount: followerCountElement ? parseInt(followerCountElement.textContent.trim()) : 0,
                connectionCount: connectionCountElement ? parseInt(connectionCountElement.textContent.trim()) : 0
            };
        }
    });
    return profileData[0].result;
}

async function closeTab(tab) {
    return new Promise(resolve => {
        chrome.tabs.remove(tab.id, () => {
            resolve();
        });
    });
}
