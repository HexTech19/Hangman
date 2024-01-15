const wordDisplay = document.querySelector('.word-display');
const hangmanImg = document.querySelector('.hangman-img img');
const keyboard = document.querySelector('.keyboard');
const modal = document.querySelector('.failure');
const playAgainBtn = document.querySelector('.play-again');

let currentWord, correctLetters, wrongGuessCount = 0;
const maxGuesses = 6;


const resetGame = () => {
  correctLetters = []
  wrongGuessCount = 0;
  hangmanImg.src = `./images/hangman-${wrongGuessCount}.svg`;
  keyboard.querySelectorAll('button').forEach(btn => btn.disabled = false);
  modal.classList.remove('show');
  wordDisplay.innerHTML = currentWord.split('').map( () => ` <li class="letter"></li>`).join('');
}

const getRandomWord = () => {
  const {word, hint} = words[Math.floor(Math.random() * words.length)];
  currentWord = word;
  document.querySelector('.hint-text').innerText = `Hint: ${hint}`;
  resetGame();
 }

const gameOver = (isVictory) => {
    setTimeout(() => {
      const modalText = isVictory ?  `You found the word:` : `The correct word was:`;
      modal.querySelector('img').src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
      modal.querySelector('h4').innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
      modal.querySelector('p').innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
      modal.classList.add('show');
    }, 300)
}

const inGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    wrongGuessCount++;
    if (wrongGuessCount < 7) {
      hangmanImg.src = `./images/hangman-${wrongGuessCount}.svg`
    }
  }
  button.disabled = true;
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

//Creating buttons and adding Event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i)
  keyboard.appendChild(button);
  button.addEventListener('click', e => inGame(e.target, String.fromCharCode(i)));
}


getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);