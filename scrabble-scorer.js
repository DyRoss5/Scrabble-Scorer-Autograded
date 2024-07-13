// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
   
	return letterPoints;

 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");

   let userWord = input.question("Please enter a word to score: ");
   console.log(`The score for ${userWord} is ${scorerPrompt(userWord)}`);
   
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   let score = 0;
   word = word.toUpperCase();

   for (let i = 0; i < word.length; i++) {
      score +=1;
   }
   return score;
}

let vowelBonusScorer = function (word) {
   let score = 0;
   let vow = "AEIOU";

   for ( let i = 0; i < word.length; i++) {
      if (vow.includes(word[i].toUpperCase())) {
         score +=3; 
      } else {
         score +=1;
      }
   }
   
   return score;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();

   let score = 0;
   //let letter = " ";

   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]]
   }
   
   return score;
}

const scoringAlgorithms = [
   simpleScore = {
      name: "Simple Score",
      description: "Each ltter is worth 1 point.",
      scorerFunction: simpleScorer
   },

   vowelBonus = {
      name: "Bonus Vowels",
      description: "Vowels are 3pts, consonants are 1pt.",
      scorerFunction: vowelBonusScorer
   },

   scrabble = {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }
]
      
function scorerPrompt(word) {
   console.log("Which scoring algorithm would you like to use?")

   for(let i = 0; i < scoringAlgorithms.length; i++){
   console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
}

let selectedArr = input.question('Enter 0, 1, or 2: ') 
  return scoringAlgorithms[selectedArr].scorerFunction(word);
   
}

function transform(oldPointStructure) {
   let newObj = {};
   for (key in oldPointStructure) {
      keyArr = oldPointStructure[key];
      for (let i = 0; i < keyArr.length; i++)
        newObj[(keyArr[i].toLowerCase())] = Number(key); 
   }
   return newObj;
      
};

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
