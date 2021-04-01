/* globals require */
//console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
//console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyj8qNsToxQPYuPk" }).base(
  "appWuRZd5zQLeIfDe"
);

//get our collection base select all of the records
base("playlist").select({}).eachPage(gotPageOfSongs, gotAllSongs);

// an empty array to hold our book data
const songs = [];

// callback function that receives our data
function gotPageOfSongs(records, fetchNextPage) {
  console.log("gotPageOfSongs()");
  // add the records from this page to our array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllSongs(err) {
  console.log("gotAllSongs()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading songs");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogSongs();
  showSongs();
}

// just loop through the books and console.log them
function consoleLogSongs() {
  console.log("consoleLogSongs()");
  songs.forEach((song) => {
    console.log("Song", song);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
function showSongs() {
  console.log("showSongs()");
  songs.forEach((book) => {
   
    var songTitle =  document.createElement("h1");
    songTitle.innerText = song.fields.name;
    document.body.append (songTitle);
  });
}

