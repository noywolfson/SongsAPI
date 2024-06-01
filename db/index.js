const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.HOST || 'postgres',
    database: process.env.POSTGRES_DB || 'songs_db',
    password: process.env.POSTGRES_PASSWORD || 'Aa123456!',
    port: process.env.PORT || 5432,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;