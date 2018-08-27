var wordList = ["maverick", "goose", "iceman", "volleyball", "pilot", "navy", "she's lost that loving feeling", "kenny loggins",
    "danger zone", "charlie", "viper", "jester", "cougar", "wolfman", "slider", "merlin", "sundown", "hollywood",
    "fightertown usa", "take my breath away", "playing with the boys", "wingman", "take me to bed or lose me forever",
    "i feel the need - the need for speed", "i was inverted", "top gun anthem", "below the hard deck", "penny benjamin", "buzz the tower"];

const maxGuesses = 5;
var guessedLetters = [];
var currentWord = "";
var wordBlanks = [];
var remainingGuesses = maxGuesses;
var wins = 0;
var remainingLetters = 0;

// create an array of blanks out of the current word
function getNewWord() {
    var milliseconds = new Date().getMilliseconds();
     
    var otherCharacters = 0;
    currentWord = wordList[Math.floor(milliseconds * wordList.length / 1000)];
    console.log("currentWord: " + currentWord);
    for (var i = 0; i < currentWord.length; i++) {
        // console.log("currentWord[i]: "+ currentWord[i]);
        if (currentWord[i] == ` `) {
            otherCharacters++
            wordBlanks[i] = '&nbsp';
            // console.log("wordBlanks[i] (if): "+ wordBlanks);
        }
        else if (currentWord[i] == "'" || currentWord[i] == "-") {
            wordBlanks[i] = currentWord[i];
            otherCharacters++;
            // console.log("wordBlanks[i] (else if): "+ wordBlanks[i]);
        }
        else {
            wordBlanks[i] = "_";
            // console.log("wordBlanks[i] (else): "+ wordBlanks[i]);  
        }
    }
    remainingLetters = currentWord.length - otherCharacters;
}
// updates the display
function display() {
    document.getElementById("wordBlanks").innerHTML = wordBlanks.join("&nbsp");
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
}

// checks the player's guess
function guessCheck(userGuess) {
    resetWinLose();
    if (!guessedLetters.includes(userGuess)) {
        if (userGuess == " " || userGuess == "'" || userGuess == "-") {
            alert("Your ego is writing checks your alphabet can't cash! Enter a new letter!");

        } else if (!"abcdefghijklmnopqrstuvwxyz".includes(userGuess)) {
            alert("Your ego is writing checks your alphabet can't cash! Enter a new letter!");

        } else {
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
    }
    else {
        alert("Your ego is writing checks your alphabet can't cash! Enter a new letter!");
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
    // window.setTimeout(function(){document.getElementById("image").style.display = "none"}, 3000);
    getNewWord();
    display();
}

function resetWinLose() {
    document.getElementById("loser").innerHTML = "";
    document.getElementById("winner").innerHTML = "";
    document.getElementById("image-top").innerHTML = "";
    var img = document.getElementById("image");
    img.style.visibility = 'hidden';
}

function winner() {
    wins++;
    document.getElementById("winner").innerHTML = "YOU...are still dangerous! You can be my wingman anytime!";
    document.getElementById("image").src = "https://media.giphy.com/media/sSzCDRnOMaq3K/giphy.gif";
    var img = document.getElementById("image");
    img.style.visibility = 'visible';
    document.getElementById("image-top").innerHTML = "YOU WIN";
    reset();


}

function loser() {
    document.getElementById("loser").innerHTML = "Goose is dead, Maverick. The correct phrase was " + currentWord;
    document.getElementById("image").src = "https://tinyurl.com/yalgetmr";
    var img = document.getElementById("image");
    img.style.visibility = 'visible';
    document.getElementById("image-top").innerHTML = "YOU LOSE";
    reset();


}

document.onkeyup = function (event) {
    var userGuess = event.key;
    display();
    guessCheck(userGuess);

}

window.onload = function () {
    reset();
}

