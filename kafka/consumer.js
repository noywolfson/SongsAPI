const kafka = require('kafka-node');
const { Pool } = require('pg');

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(
    client,
    [{ topic: 'songs-topic', partition: 0 }],
    {
        autoCommit: true
    }
);

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.HOST || 'postgres',
    database: process.env.POSTGRES_DB || 'songs_db',
    password: process.env.POSTGRES_PASSWORD || 'Aa123456!',
    port: process.env.PORT || 5432,
});

consumer.on('message', async function (message) {
    const song = JSON.parse(message.value);
    const query = `INSERT INTO songs("name", "artist", "release_date", "length", "popularity", "danceability") 
                 VALUES($1, $2, $3, $4, $5, $6) RETURNING index`;
    const values = [song.name, song.artist, song.release_date, song.length, song.popularity, song.danceability];

    try {
        const res = await pool.query(query, values);
        console.log(`Inserted song with ID: ${res.rows[0].index}`);
    } catch (err) {
        console.error('Error inserting song:', err);
    }
});

consumer.on('error', function (err) {
    console.error('Kafka Consumer error:', err);
});

console.log('Kafka Consumer is running.');
