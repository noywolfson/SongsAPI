CREATE TABLE songs (index INT, name TEXT, artist TEXT, release_date INT, length FLOAT, popularity INT, danceability FLOAT);

COPY songs FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;