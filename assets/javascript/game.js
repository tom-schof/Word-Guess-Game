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


document.onkeyup = function (event) {
    // each time a player guesses a letter, decrease remaining guesses by one
    var userGuess = event.key;
    remainingGuesses--;
    guessedLetters.push(userGuess);

    // create an array of blanks out of the current word
    function getNewWord() {
        currentWord = Math.random(Math.floor(wordList.length - 1));
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] != " " || currentWord[i] != "'") {
                wordBlanks[i] = "_";
            }
            else {
                wordBlanks[i] = currentWord[i];
            }
        }
        remainingLetters = currentWord.length;
    }
    // if the player's guess is in the word, replace the blank with the letter
    function guessCheck() {
        for (var i = 0; i < maxGuesses; i++) {
            for (var j = 0; j < currentWord.length; j++) {
                if (userGuess = currentWord[j]) {
                    wordBlanks[j] = userGuess;
                }
            }

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

    }

    function winner() {
        wins++;
        document.getElementById("high-five").src = "../images/high-five.webp";
        reset();


    }

    function loser() {
        reset();
        // document.getElementById("tailspin").src = "../images/tailspin.jpg";

    }

}





