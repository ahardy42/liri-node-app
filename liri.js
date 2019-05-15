// this allows the program to use the .env file to get keys
require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();

/* 

###### arguments #######

concert-this
spotify-this-song
movie-this
do-what-it-says

*/

// functions

// bands in town logger to be used in a forEach call
function bandsLog(event, index) {
    var eventNum = index + 1;
    var eventString = eventNum.toString().toUpperCase();
    var eventDate = moment(event.datetime, moment.ISO_8601).format("MM/DD/YYYY");
    console.log(`\n\n*-*-*-*-*-*- EVENT NUMBER ${eventString}!!! *-*-*-*-*-*\n`);
    console.log(`Venue Name: ${event.venue.name}\nVenue Location ${event.venue.city}, ${event.venue.country}\nEvent Date: ${eventDate}`);
    console.log("\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n\n");
};

// spotify logger to be used in a forEach call

// code for inquirer to see what the user is trying to do
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
        if (searchType.includes("concert")) {
            // bands in town search code
            console.log(`\n\nI will search Bands In Town for upcoming ${searchTerm} concerts....`);
            var url = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;
            axios.get(url)
                .then(function(response) {
                    // print required information to console 
                    response.data.forEach(bandsLog);
                })
                .catch(function (error) {
                    console.log(error);
                  });
        } else if (searchType.includes("song") || searchType.includes("spotify")) {
            // spotify code here
            console.log("you searched spotify!");

        } else if (searchType.includes("movie")) {
            // OMDB code here
            console.log("you searched OMDB!");

        } else if (searchType.includes("do what it says")) {
            // random text function
            console.log("you searched random text!");

        } else {
            console.log("\nI'm sorry, I am a simple program, developed by a simple human...\nYou have typed a search term that I don't understand.\nHave a nice day!");
        }
    });
