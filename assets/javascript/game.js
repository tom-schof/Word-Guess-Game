var wordList = ["maverick", "goose", "iceman", "volleyball", "pilot", "navy", "cold war", "kenny loggins",
    "danger zone", "charlie", "viper", "jester", "cougar", "wolfman", "slider", "merlin", "sundown", "hollywood",
    "fightertown usa", "take my breath away", "playing with the boys", "wingman", "take me to bed or lose me forever",
    "i feel the need - the need for speed", "i was inverted", "top gun anthem", "below the hard deck"];

const maxGuesses = 8;
var guessedLetters = [];
var currentWord = "";
var wordBlanks = [];
var remainingGuesses = maxGuesses;
var wins = 0;
var remainingLetters = 0;

// create an array of blanks out of the current word
function getNewWord() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("currentWord: " + currentWord);
    for (var i = 0; i < currentWord.length; i++) {
        // console.log("currentWord[i]: "+ currentWord[i]);
        if (currentWord[i] == ` `) {
            wordBlanks[i] = '&nbsp';
            // console.log("wordBlanks[i] (if): "+ wordBlanks);
        }
        else if (currentWord[i] == "'" || currentWord[i] == "-") {
            wordBlanks[i] = currentWord[i];
            // console.log("wordBlanks[i] (else if): "+ wordBlanks[i]);
        }
        else {
            wordBlanks[i] = "_";
            // console.log("wordBlanks[i] (else): "+ wordBlanks[i]);  
        }
    }
    remainingLetters = currentWord.length;
}
// updates the display
function display() {
    document.getElementById("wordBlanks").innerHTML = wordBlanks.join("&nbsp");
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
}

// checks the player's guess
function guessCheck(userGuess) {
    if (!guessedLetters.includes(userGuess)) {
        console.log("guessedLetters:" + guessedLetters);
        console.log("userGuess:" + userGuess);
        guessedLetters.push(userGuess);

        if (currentWord.includes(userGuess)) {
            for (var i = 0; i < currentWord.length; i++) {
                if (currentWord[i] == userGuess) {
                    wordBlanks[i] = userGuess;
                    remainingLetters--;
                    display();
                    if (remainingLetters == 0) {
                        winner();
                        break;
                    }
                }
            }
        } else {
            remainingGuesses--;
            display();
            if (remainingGuesses == 0) {
                loser();
            }
        }
    }
    else {
        alert("Your ego is writing checks your alphabet can't cash! Enter a new letter!")
    }
}

function reset() {
    guessedLetters = [];
    currentWord = "";
    wordBlanks = [];
    remainingGuesses = maxGuesses;
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
    document.getElementById("wins").innerHTML = wins;
    getNewWord();
    display();
}

function winner() {
    wins++;
    display();
    alert("YOU...are still dangerous! You can be my wingman anytime!");
    document.getElementById("image").src = "https://media.giphy.com/media/sSzCDRnOMaq3K/giphy.gif";
    reset();


}

function loser() {
    alert("Goose is dead, Maverick. The correct word was " + currentWord);
    reset();
    // document.getElementById("tailspin").src = "../images/goose-dead.jpeg";

}

document.onkeyup = function (event) {
    var userGuess = event.key;
    display();
    guessCheck(userGuess);
}


window.onload = function () {
    // document.getElementById("audio").autoplay;
    reset();
}

