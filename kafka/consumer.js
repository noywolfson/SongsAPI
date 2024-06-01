const kafka = require('kafka-node');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');


const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const consumer = new kafka.Consumer(
    client,
    [{ topic: 'songs-topic', partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', async function (message) {
    const song = JSON.parse(message.value);
    console.log('Received message:', song);

   try {
       const _ = await pool.query(`INSERT INTO songs ("name", "artist", "release_date", "length", "popularity", "danceability")
       VALUES ($1, $2, $3, $4, $5, $6)`, [song.name, song.artist, song.release_date, song.length, song.popularity, song.danceability]);

   } catch (err) {
       console .error('Failed to insert song into DB:', err);
   }
});

consumer.on('error', function (err) {
    console.error('Kafka Consumer error:', err);
});

client.refreshMetadata(['songs-topic'], function (err) {
    if (err) {
        console.error('Error refreshing metadata:', err);
        return;
    }

    // Start consuming from the topic
    consumer.addTopics(['songs-topic'], function (err, added) {
        if (err) {
            console.error('Error adding topic:', err);
            return;
        }

        console.log('Added topics:', added);
    });
});

console.log('Kafka Consumer is running.');
