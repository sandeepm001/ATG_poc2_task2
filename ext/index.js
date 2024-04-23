document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('scrapeButton');
    const profileLinksTextarea = document.getElementById('profileLinks');

    scrapeButton.addEventListener('click', function() {
        const profileLinksInput = profileLinksTextarea.value.trim();
        if (profileLinksInput) {
            const profileLinks = profileLinksInput.split(',').map(link => link.trim());
            console.log('Profile links:', profileLinks); // Log the profile links array
            profileLinks.forEach(link => {
                chrome.tabs.create({ url: link });
            });
        } else {
            console.log('No profile links provided.');
        }
    });
});
