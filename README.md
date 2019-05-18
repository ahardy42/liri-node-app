# liri-node-app

## Objective

- LIRI is a language interpretation and recognition interface console app.  
- LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## How To Set Up on Your Computer

1. First, you need to fork this repo and clone it to a folder of your choosing!

2. In order to use the CLI app on your machine, you need three API keys:
    * Spotify [API key](https://developer.spotify.com/documentation/web-api/)
    * OMDB [API key](http://omdbapi.com/)
    * Bands In Town [API key](http://www.artists.bandsintown.com/bandsintown-api)

3. You will need to create a .env file which references these keys like so:

```
# Spotify API keys

SPOTIFY_ID=<your ID>
SPOTIFY_SECRET=<your Secret>
```
4. You are now ready to use Liri in your terminal or bash!

## How To Use

1. Type ``` node liri.js ``` into your console

2. Enter your search type / term into the console...

    * First, we will run a spotify search

    ![spotify search](https://media.giphy.com/media/toYIiutyeYgfPvYg76/giphy.gif)
    
3. Much like SIRI, the LIRI app will take a list of search terms for each API call. Here are accepted terms:

```javascript
var bandsTerms = ["concert-this", "concert", "bands in town", "concerts", "bands-in-town"];
var spotifyTerms = ["spotify-this-song", "spotify", "song search", "search songs", "songs", "tracks", "song-search", "search-songs", "song"];
var movieTerms = ["movie-this", "movies", "movie", "movie ratings", "movie-ratings", "OMDB", "OMDB search", "OMDB-search"];
var doWhatItSays = ["do-what-it-says", "do what it says", "do it", "do it!", "what's in random.txt?", "random", ""];
```

4. Each API call produces slightly different results.

   * Spotify Search Example: 
   
