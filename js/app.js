// initialize a class for words
class Words {
	constructor(phrase) {
		this.phrase = phrase;
	}
}

// initialize factory for words
const wordFactory = {
	wordBank: [],
	generatePhrase(phrase) {
		const newPhrase = new Words(phrase);
		this.wordBank.push(newPhrase);
		return newPhrase;
	},
	findPhrase(index) {
		return this.wordBank[index]
	}
}

// initialize game object
const game = {
	score: 0,
	currentAnswer: "",
	playerPhrase: "",
	wrongLetters: [],
	playerLives: 6,
	genHangman () {
		$("#message").css("visibility", "hidden");
		this.playerLives--;
		$("#lives").text("Lives: " + this.playerLives);
		if (this.playerLives === 0) {
			this.gameOver();
		}
		// set conditions for each wrong guess, add body part for each guess
	},
	displaySpace (phrase) {
		let space = " ";
		// [james, tiberius, kirk]
		for (let i = 0; i < phrase.length; i++) {
			space += phrase.charAt(i) + " ";
		}	
		$("#phrase").text(space);
	},
	genBlanks (phrase) {
		phrase = [];
		for (let i = 0; i < this.currentAnswer.length; i++) {
			if (this.currentAnswer.charAt(i) != " ") {
				phrase.push("_");
			} else {
				phrase.push(" ");
			}
		}
		this.playerPhrase = phrase.join("");
		this.displaySpace(this.playerPhrase);
	},
	shufflePhrase () {
		// generate random index to pull from wordBank array
		const randIndex = String(Math.floor(Math.random() * wordFactory.wordBank.length));
		// use random index to return a random phrase to the game object;
		this.currentAnswer = wordFactory.wordBank[randIndex].phrase;
		this.genBlanks();
	},
	updateWordDisplay(letter) {
		// don't need to lowercase because that was already done in checkMatch
		const indexes = findAllIndex(this.currentAnswer, letter);
		const playerArr = this.playerPhrase.split("")
		for (let i = 0; i < indexes.length; i++) {
			playerArr[indexes[i]] = letter;
		}
		const newStr = playerArr.join("");
		this.playerPhrase = newStr;
		this.displaySpace(this.playerPhrase);
		// return amount of indexes as an argument to rightAnswer so score is correct
		this.rightAnswer(indexes.length);
	},
	checkMatch (guess) {
		// change guess to lowercase so includes method will work for all letters
		// need to store it in variable so it can be called again
		console.log("checkmatch");
		let wrongLetterString = "";
		const result = guess.toLowerCase();
		$("input").val("");
		// only pass guesses with one letter
		if (result.length === 1) {
			if (this.currentAnswer.includes(result)){
				this.updateWordDisplay(result);
			} else {
				this.wrongLetters.push(guess)
				// wrongLetters will still be an array after storing the string
				// as a variable using .join(); doesn't transform array
				wrongLetterString = this.wrongLetters.join(" ");
				$("#wrong-letters").text(wrongLetterString);
				this.wrongAnswer();
			}
		}
		// display guessed letters in word if correct, replace blanks
	},
	wrongAnswer () {
		// head, body, left arm, right arm, left leg, right leg -- 6 body parts
		$("#message").text("Letter not found.")
		$("#message").css("visibility", "visible");
		this.genHangman();
	},
	rightAnswer (num) {
		// 100 points for every letter revealed
		this.score += 100 * num;
		$("#score").text("Score: " + this.score);
		if (this.playerPhrase === this.currentAnswer) {
			game.win();
		}
		// set condition for game win
	},
	gameOver () {
		$("#message").text("Game over. Click anywhere to reset!")
		$("#message").css("visibility", "visible");
		this.score = 0;
		$("#score").text("Score: " + this.score);
		$(document).on("click", function (){
			game.reset();
		})
	},
	reset () {
		// hide hangman from display if necessary
		$(document).off("click");
		$("#message").css("visibility", "hidden");
		this.wrongLetters = [];
		$("#wrong-letters").text("");
		this.shufflePhrase();
	},
	win () {
		$("#message").css("visibility", "visible");
		$("#message").text("You win! Click anywhere to reset");
		$(document).on("click", function (){
			game.reset();
		})
	}
}
// button & input functionality
$("#guess").on("click", function(event) {
	$("#message").css("visibility", "hidden")
	if ($("input").val() != undefined) {
		if ($("#phrase").text().includes($("input").val().toLowerCase())) {
			$("#message").text("You've already used that letter.");
			$("#message").css("visibility", "visible")
		} else if ($("#wrong-letters").text().includes($("input").val().toLowerCase())) {
			$("#message").text("You've already used that letter.");
			$("#message").css("visibility", "visible")
		} else {
			game.checkMatch($("input").val());
		}
	}
})

// push return should work now too
$(document).on("keydown", function (event) {
	if (event.keyCode === 13) {
		$("#message").css("visibility", "hidden")
		if ($("input").val() != undefined) {
			if ($("#phrase").text().includes($("input").val().toLowerCase())) {
				$("#message").text("You've already used that letter.");
				$("#message").css("visibility", "visible")
			} else if ($("#wrong-letters").text().includes($("input").val().toLowerCase())) {
				$("#message").text("You've already used that letter.");
				$("#message").css("visibility", "visible")
			} else {
				game.checkMatch($("input").val());
			}	
		}
	}
})

$("#reset-game").on("click", function (event) {
	game.reset();
})

// generate all words in wordBank using factory

wordFactory.generatePhrase("corbomite");
wordFactory.generatePhrase("the trouble with tribbles");
wordFactory.generatePhrase("the city on the edge of forever");
wordFactory.generatePhrase("phaser");
wordFactory.generatePhrase("james tiberius kirk");
wordFactory.generatePhrase("mister spock");
wordFactory.generatePhrase("leonard mccoy");
wordFactory.generatePhrase("gene roddenberry");
wordFactory.generatePhrase("starfleet");
wordFactory.generatePhrase("mind meld");
wordFactory.generatePhrase("where no man has gone before");
wordFactory.generatePhrase("the final frontier");
wordFactory.generatePhrase("enterprise");
wordFactory.generatePhrase("lieutenant uhura");
wordFactory.generatePhrase("montgomery scott");
wordFactory.generatePhrase("harry mudd");
wordFactory.generatePhrase("ensign chekhov");
wordFactory.generatePhrase("helmsman sulu");
wordFactory.generatePhrase("prime directive");







const findAllIndex = (string, character) => {
	const arr = string.split("");
	const indexes = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === character) {
			indexes.push(i);
		}
	}
	return (indexes);
}




game.reset();
console.log(game.currentAnswer);
// TO DO: 

// create spaces between separate words using li elements
// generate hangman images
// make it all look pretty