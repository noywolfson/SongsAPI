const express = require('express');
const bodyParser = require('body-parser');
const songsRouter = require('./routes/songs');

const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use('/songs', songsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

