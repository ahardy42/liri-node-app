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

    * First, we will run a OMDB search

    ![OMDB search](https://media.giphy.com/media/toYIiutyeYgfPvYg76/giphy.gif)
    
3. Much like SIRI, the LIRI app will take a list of search terms for each API call. Here are accepted terms:

```javascript
var bandsTerms = ["concert-this", "concert", "bands in town", "concerts", "bands-in-town"];
var spotifyTerms = ["spotify-this-song", "spotify", "song search", "search songs", "songs", "tracks", "song-search", "search-songs", "song"];
var movieTerms = ["movie-this", "movies", "movie", "movie ratings", "movie-ratings", "OMDB", "OMDB search", "OMDB-search"];
var doWhatItSays = ["do-what-it-says", "do what it says", "do it", "do it!", "what's in random.txt?", "random", ""];
```

4. Each API call produces slightly different results.

   * Spotify Search Example: 
   ![Spotify Search](https://media.giphy.com/media/vgwdltDPFU0JL6EGqX/giphy.gif)
   
   * Bands in Town Search Example:
   ![Bands in Town Search](https://media.giphy.com/media/8qx5bVX40YRcNrqD9C/giphy.gif)
   
   
5. There is also a search that pulls from a text file called ```random.txt``` that dictates the search to be used using prompts from the ```javascript var doWhatItSays``` variable. 

![Do What It Says](https://media.giphy.com/media/1jbaPvNCSDgaZSNh3t/giphy.gif)

## Log File

- If you notice from the GIF above, each search will update a log file ```log.txt``` with the type, terms and time of each search


## Search Errors

- the GIF below shows the result of using a term not stored in the program ```"search song"``` instead of ```song search``` will return an error message.

![error](https://media.giphy.com/media/fQivMafHlm5VkqEaNz/giphy.gif)


### ENJOY!
