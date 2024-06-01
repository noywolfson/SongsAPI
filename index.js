const express = require('express');
const bodyParser = require('body-parser');
const songsRouter = require('./routes/songs');
const createTopic = require('./kafka/kafkaAdmin');

const app = express();
const port = 8081;

const initKafka = async () => {
    await createTopic(); // Ensure the topic is created
};

initKafka().catch(console.error);

app.use(bodyParser.json());
app.use('/songs', songsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

