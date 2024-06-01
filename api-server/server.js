const express = require('express');
const {faker} = require("@faker-js/faker");
const app = express();


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Endpoint to concatenate a string with a random string
app.get('/lyrics/', (req, res) => {
    const songName = req.query.songName;

    if (!songName) {
        return res.status(500).send("Song name cannot be empty!");
    }
    const lyrics = faker.lorem.paragraphs(getRandomNumber(2, 10));
    const concatenatedString = `${songName}:\n\n${lyrics};`
    res.send(concatenatedString);
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});