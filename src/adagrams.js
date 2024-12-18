const LETTER_POOL = {
  'A': 9, 
  'B': 2, 
  'C': 2, 
  'D': 4, 
  'E': 12, 
  'F': 2, 
  'G': 3, 
  'H': 2, 
  'I': 9, 
  'J': 1, 
  'K': 1, 
  'L': 4, 
  'M': 2, 
  'N': 6, 
  'O': 8, 
  'P': 2, 
  'Q': 1, 
  'R': 6, 
  'S': 4, 
  'T': 6, 
  'U': 4, 
  'V': 2, 
  'W': 2, 
  'X': 1, 
  'Y': 2, 
  'Z': 1
};

const LETTER_SCORE = {
  'A': 1, 
  'B': 3, 
  'C': 3, 
  'D': 2, 
  'E': 1, 
  'F': 4, 
  'G': 2, 
  'H': 4, 
  'I': 1, 
  'J': 8, 
  'K': 5, 
  'L': 1, 
  'M': 3, 
  'N': 1, 
  'O': 1, 
  'P': 3, 
  'Q': 10, 
  'R': 1, 
  'S': 1, 
  'T': 1, 
  'U': 1, 
  'V': 4, 
  'W': 4, 
  'X': 8, 
  'Y': 4, 
  'Z': 10
};

const HAND_SIZE = 10
const MIN_BONUS_LENGTH = 7
const LENGTH_BONUS = 8

const createWeightedLetterPool = () =>{
  let weightedLetterPool = [];
  for (const [letter, freq] of Object.entries(LETTER_POOL)){
    for (let i=0; i<freq; i++){
      weightedLetterPool.push(letter);
    }
  }
  return weightedLetterPool;
}

export const drawLetters = () => {
  const hand = [];
  const weightedLetterPool = createWeightedLetterPool()

  while (hand.length < HAND_SIZE){
    let randomIdx = Math.floor(Math.random()*weightedLetterPool.length);
    let randomLetter = weightedLetterPool[randomIdx];
    hand.push(randomLetter);
    weightedLetterPool.splice(randomIdx,1);
  }
  return hand;
};
  
export const usesAvailableLetters = (input, lettersInHand) => {
  const inputLower = input.toUpperCase();
  const copy = [...lettersInHand]; // I not sure how lettersInHand is used in the program as a whole, so I made a copy

  for (let letter of inputLower){
    if (copy.includes(letter)){
      let idx = copy.indexOf(letter);
      copy.splice(idx,1);
    } else {
      return false;
    }
  }
  return true;
};

  



export const scoreWord = (word) => {
  if (!word.trim()) {
    return 0;
  }
  word = word.toUpperCase();
  let score = 0;
  for (let letter of word){
    score += LETTER_SCORE[letter];
  }
  if(word.length >= MIN_BONUS_LENGTH){
    score += LENGTH_BONUS;
  }
  return score;
};

const getMaxScore = (words) =>{
  let maxScore = 0;
  for (let word of words){
    maxScore = Math.max(maxScore, scoreWord(word));
  };
  return maxScore;
}

const getHighScoreWords = (words, maxScore) => {
  let highScoreWords = []
  for (let word of words){
    if(scoreWord(word) === maxScore){
      highScoreWords.push(word);
    };
  };
  return highScoreWords;
}

export const highestScoreFrom = (words) => {
  let maxScore = getMaxScore(words);
  let highScoreWords = getHighScoreWords(words, maxScore);
  
  let winningWord = highScoreWords[0];
  
  for (let word of highScoreWords){
    if (winningWord.length === 10){
      return {word: winningWord, score: maxScore};
    };
    if (winningWord.length > word.length || word.length === 10){
      winningWord = word;
    };
  };
  return {word: winningWord, score: maxScore};
};

