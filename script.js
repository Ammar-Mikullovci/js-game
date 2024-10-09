const wordDisplay = document.querySelector(".word-display");
const hangMan = document.querySelector(".hangman-box img");
const guessestext = document.querySelector(".guesses-text b");
const shkronja = document.querySelector(".alfabeti");
const gameModal = document.querySelector(".game-modal");
const playAgainbtn = document.querySelector(".play-again");
let currentWord;
let correctLeters;
let wrongGuessCount;
const maxCount = 6;
const resetGame = () => {
  correctLeters = [];
  wrongGuessCount = 0;
  hangMan.src = `images/hangman-${wrongGuessCount}.svg`;
  guessestext.innerText = `${wrongGuessCount} / ${maxCount} `;
  shkronja.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => ` <li class="letter"></li>`)
    .join();
  gameModal.classList.remove("show");
};
const getRondomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word`
      : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}<b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLeter) => {
  if (currentWord.includes(clickedLeter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLeter) {
        correctLeters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add = ["guessed"];
      }
    });
  } else {
    wrongGuessCount++;
    hangMan.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessestext.innerText = `${wrongGuessCount} / ${maxCount} `;
  if (wrongGuessCount === maxCount) return gameOver(false);
  if (correctLeters.length === currentWord.length) return gameOver(true);
};

const createButton = (letter) => {
  const button = document.createElement("button");
  button.innerText = letter;
  shkronja.appendChild(button);
  button.addEventListener("click", () => initGame(button, letter));
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  shkronja.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRondomWord();
playAgainbtn.addEventListener("click", getRondomWord);
