// server/routes/profiles.js

const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { scrapeProfile } = require('../linkedin_scraper'); // Assuming you have a module for scraping LinkedIn profiles

// Route to scrape LinkedIn profiles and insert data into the database
router.post('/profiles/scrape', async (req, res) => {
    const { profileLinks } = req.body;

    try {
        const scrapedProfiles = [];
        for (const link of profileLinks) {
            const profileData = await scrapeProfile(link); // Scrape profile data
            scrapedProfiles.push(profileData);
            await Profile.create(profileData); // Insert profile data into the database
        }

        res.status(200).json({ message: 'LinkedIn profiles scraped and inserted successfully.', profiles: scrapedProfiles });
    } catch (error) {
        console.error('Error scraping and inserting LinkedIn profiles:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;

