CREATE SEQUENCE song_index START 5485;
CREATE TABLE songs (index INTEGER DEFAULT nextval('song_index') PRIMARY KEY, name TEXT, artist TEXT, release_date INT, length FLOAT, popularity INT, danceability FLOAT);

COPY songs FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;