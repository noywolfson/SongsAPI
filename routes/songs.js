const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

router.get('/info', async (req, res) => {
    const {name, artist} = req.query;
    if (!name || !artist) {
        return res.status(400).json({error: 'name and artist are required'});
    }

    try {
        const result = await pool.query('SELECT * FROM songs WHERE name = $1 AND artist = $2', [name, artist]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json({ ...result.rows[0], id: uuidv4() });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
})

router.get('/lyrics', async (req, res) => {
    const { songName } = req.query;
    if (!songName) {
        return res.status(404).json({ error: 'Song name is required' });
    }

    try {
        const response = await axios.get(`http://songs-api:3000/lyrics?songName=${songName}`);
        res.json({ lyrics: response.data, id: uuidv4() });
    } catch (err) {
        res.status(500).json({ error: 'Lyrics API error' });
    }
});

router.post('/add', async (req, res) => {
    const {index, name, artist, release_date, length, popularity, danceability} = req.body;
    if (!index || !name || !artist || !release_date || !length || !popularity || !danceability) {
        return res.status(404).json({ error: 'All song fields are required' });
    }
    try {
        const exist = await pool.query('SELECT * FROM songs WHERE name = $1 AND artist = $2', [name, artist]);
        if (exist.rows.length > 0) {
            return res.status(400).json({error: 'Song already exists'});
        }

        const result = await pool.query(`INSERT INTO songs ("index", "name", "artist", "release_date", "length", "popularity", "danceability")  
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [index, name, artist, release_date, length, popularity, danceability]);
        res.json({ insert: result.rowCount , id: uuidv4() });

    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
})

module.exports = router;