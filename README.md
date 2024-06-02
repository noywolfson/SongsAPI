# Songs API

Node api server, that manage postgresql songs table. 
The server has the following operations:
  1. Get song info based on name and artist
  2. Get the lyrics by a song name
  3. Inserts a new song into the database

## How to run the project
* Clone the project
* Navigate to the project directory
* Run:

```bash
 docker-compose up --build
```

* To get song info based on name and artist, navigate in yout browser to
  
      http://localhost:8081/songs/info?name=<song_name>&artist=<artist_name>
  * replace the placeholders

* To get the lyrics by a song name, navigate in yout browser to
  
      http://localhost:8081/songs/lyrics?songName=<song_name>
  * replace the placeholders

* To inserts a new song into the database, use tool like postman to send a POST request to

      localhost:8081/songs/add
  * Add the song data in the body request.
  
  Body example:

  ``` bash
  {
    "name":"some song",
    "artist":"shakira",
    "release_date":2024,
    "length":3.5,
    "popularity":80,
    "danceability":0.75
  }
  ```
