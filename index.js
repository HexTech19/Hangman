const wordDisplay = document.querySelector('.word-display');
const keyboard = document.querySelector('.keyboard');

let currentWord;
const getRandomWord = () => {
  const {word, hint} = words[Math.floor(Math.random() * words.length)];
  console.log(word)
  currentWord = word;
  document.querySelector('.hint-text').innerText = hint;
  wordDisplay.innerHTML = word.split('').map( () => ` <li class="letter"></li>`).join('');
}

const inGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    console.log(clickedLetter, 'is in the word');
  } else {
    console.log(clickedLetter, 'is not in the word');
  }
}

//Creating buttons and adding Event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i)
  keyboard.appendChild(button);
  button.addEventListener('click', e => inGame(e.target, String.fromCharCode(i)));
}


getRandomWord();