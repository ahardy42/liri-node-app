// this allows the program to use the .env file to get keys
require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
moment().format();

var imdbKey = keys.omdbKey.key;

/* 

###### arguments #######

concert-this
spotify-this-song
movie-this
do-what-it-says

####### I'm turning these into prompts using inquirer ##########

*/

// prompt arrays (any of the words and phrases will work in each API call)

var bandsTerms = ["concert-this", "concert", "bands in town", "concerts", "bands-in-town"];
var spotifyTerms = ["spotify-this-song", "spotify", "song search", "search songs", "songs", "tracks", "song-search", "search-songs", "song"];
var movieTerms = ["movie-this", "movies", "movie", "movie ratings", "movie-ratings", "OMDB", "OMDB search", "OMDB-search"];
var doWhatItSays = ["do-what-it-says", "do what it says", "do it", "do it!", "what's in random.txt?", "random", ""];

// ========================================= functions ===========================================

// bands in town logger to be used in a forEach call
function bandsLog(event, index) {
    var eventNum = index + 1;
    var eventString = eventNum.toString().toUpperCase();
    var eventDate = moment(event.datetime, moment.ISO_8601).format("MM/DD/YYYY");
    console.log(`\n\n*-*-*-*-*-*- EVENT NUMBER ${eventString}!!! *-*-*-*-*-*\n`);
    console.log(`Venue Name: ${event.venue.name}\nVenue Location ${event.venue.city}, ${event.venue.country}\nEvent Date: ${eventDate}`);
    console.log("\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n\n");
};

// code for spotify items
function spotifyLog(item) {
    // display artists
    var artists = [];
    item.artists.forEach(function (artist) {
        artists.push(artist.name);
    });
    var artistList = artists.join(", ");
    if (artists.length > 1) {
        console.log(`Artists: ${artistList}\n`);
    } else {
        console.log(`Artist: ${artistList}\n`);
    }
    console.log(`Song Name: ${item.name}\n`);
    console.log(`Preview URL: ${item.preview_url}\n`);
    console.log(`Album Name: ${item.album.name}\n`);
    console.log(`======================================\n\n`);
};

// code for OMDB items
/*
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

*/
function imdbLog(response) {
    var movie = response.data;
    var imdbRating = movie.Ratings.forEach(function(rating) {
        if (rating.Source === "Internet Movie Database") {
            return rating.Value;
        } else {
            return "Not Rated By IMDB";
        }
    });
    var rottenTomatoesRating = movie.Ratings.forEach(function(rating) {
        if (rating.Source === "Rotten Tomatoes") {
            return rating.Value;
        } else {
            return "Not Rated By Rotten Tomatoes";
        }
    });
    console.log("\n\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n");
    console.log(`Movie Title: ${movie.Title}\nRelease Year: ${movie.Year}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rottenTomatoesRating}\nProduction Country: ${movie.Country}\nLanguage: ${movie.Language}\nPlot Summary: ${movie.Plot}\nList of Actors: ${movie.Actors}`);
    console.log("\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n\n");
}

// ======================= code for inquirer and axios calls ==========================
var inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: "input",
            message: "Hi, My name is Liri. What would like to search for?",
            name: "search"
        },
        {
            type: "input",
            message: "Excellent, Please enter your search term",
            name: "term"
        }
    ]).then(function(answers) {
        var searchType = answers.search.trim().toLowerCase();
        var searchTerm = answers.term.trim().toLowerCase();
        // all the code for searching goes in here!
        if (bandsTerms.includes(searchType)) { // bands in town search
            console.log(`\n\nI will search Bands In Town for upcoming ${searchTerm} concerts....`);
            var bandsUrl = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;
            axios.get(bandsUrl)
                .then(function(response) {
                    // print required information to console for each event
                    response.data.forEach(bandsLog);
                })
                .catch(function (error) {
                    console.log(error);
                  });
        } else if (spotifyTerms.includes(searchType)) { // spotify search
            if (searchTerm === "") {
                searchTerm = "The Sign Ace of Base";
            }
            console.log(`\n\nI will search Spotify for the song: ${searchTerm}.`);
            spotify
                .search({ type: 'track', query: searchTerm })
                .then(function (response) {
                    console.log(`\n\n========== ${searchTerm} info =======\n`);
                    response.tracks.items.forEach(spotifyLog);
                })
                .catch(function (err) {
                    console.log(err);
                });

        } else if (movieTerms.includes(searchType)) { // OMDB search
            if (searchTerm === "") {
                searchTerm = "mr nobody";
            }
            var movieUrl = `https://www.omdbapi.com/?apikey=${imdbKey}&t=${searchTerm}&type=movie`
            console.log(`\n\nI will search OMDB for the movie ${searchTerm}.`);
            axios.get(movieUrl)
            .then(function(response) {
                // print required information to console for each event
                imdbLog(response);
            })
            .catch(function (error) {
                console.log(error);
              });

        } else if (doWhatItSays.includes(searchType)) { // do what it says search
            // random text function
            console.log("you searched random text!");

        } else {
            console.log("\nI'm sorry, I am a simple program, developed by a simple human...\nYou have typed a search term that I don't understand.\nHave a nice day!");
        }
    });
