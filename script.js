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
 try {
  showSongs();
} catch (e) {
  console.log(e);
}
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
  songs.forEach((song) => {
   
   // var songTitle =  document.createElement("h1");
   // songTitle.innerText = song.fields.name;
   // document.body.append (songTitle);

   //create new div container
   var songContainer = document.createElement("div");
   songContainer.classList.add("song-container");
   document.querySelector(".container").append(songContainer);
 

  //add song title to our song container
  var songTitle = document.createElement("h1");
  songTitle.classList.add("song-title");
  songTitle.innerText = song.fields.name;
  songContainer.append(songTitle);

  //add artist
  var SongArtist = document.createElement("h1");
  SongArtist.classList.add("song-artist");
  SongArtist.innerText = song.fields.singer;
  songContainer.append(SongArtist);

  //add gif
  var songGif = document.createElement("img");
  songGif.classList.add("song-gif");
  songGif.src = song.fields.gif[0].url;
  songContainer.append(songGif);

  //get genre field from airtable

var songGenre = song.fields.genre;
songGenre.forEach(function(genre) {
  songContainer.classList.add(genre)
})

//add event lisnter to our filter
//to add an active class to our song

var filterChinese = document.querySelector('.chinese');
filterChinese.addEventListener("click", function(){

  if(songContainer.classList.contains("chinese")){
    songContainer.style.background = "pink";
  } else{
    songContainer.style.background = "white";
  }
})

//active
songContainer.addEventListener("click", function(){
  songGif.classList.toggle("active");
})


//----------------Japanese---------------------------
var filterJapanese = document.querySelector('.japanese');
filterJapanese.addEventListener("click", function(){

  if(songContainer.classList.contains("japanese")){
    songContainer.style.background = "yellow";
  } else{
    songContainer.style.background = "white";
  }
})

//----------------English---------------------------
var filterEnglish = document.querySelector('.english');
filterEnglish.addEventListener("click", function(){

  if(songContainer.classList.contains("english")){
    songContainer.style.background = "lightblue";
  } else{
    songContainer.style.background = "white";
  }
})

var filterReset = document.querySelector('.js-reset')
filterReset.addEventListener("click",function(){
songContainer.style.background = "white";
})

});

}
 
