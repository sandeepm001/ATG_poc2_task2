const express = require('express');
const profilesRouter = require('./routes/profiles');
const app = express();

app.use(express.json());

// Use routes
app.use('/profiles', profilesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
