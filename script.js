const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const figureParts = document.querySelectorAll(".figure-part");
const difficultyForm = document.getElementById("difficulty-form");
const gameContainer = document.getElementById("game-container");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const resetBtn = document.getElementById("reset-score");
const hintEl = document.getElementById("hint");
const hintContainer = document.querySelector(".hint-container");
const showHintBtn = document.getElementById("show-hint");

let selectedWord = "";
let selectedHint = "";
let correctLetters = [];
let wrongLetters = [];

// Fetch word & hint
async function getWord(level) {
  const res = await fetch(`words.php?level=${level}`);
  const data = await res.json();
  selectedWord = data.word;
  selectedHint = data.hint;
  correctLetters = [];
  wrongLetters = [];
  updateWord();
  updateWrongLetters();
  hintContainer.style.display = "none";
}

// Display word
function updateWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span>${correctLetters.includes(letter) ? letter : ""}</span>`
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    addScore("win");
    popup.style.display = "flex";
  }
}

// Update wrong letters
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? "block" : "none";
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    addScore("loss");
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 2000);
}

// Keydown
window.addEventListener("keydown", (e) => {
  if (gameContainer.style.display === "none") return;
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        updateWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

// Play again
playAgainBtn.addEventListener("click", () => {
  const level = document.getElementById("level").value;
  getWord(level);
  popup.style.display = "none";
  finalMessageRevealWord.innerText = "";
});

// Start game
difficultyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const level = document.getElementById("level").value;
  getWord(level);
  gameContainer.style.display = "block";
});

// Score
async function addScore(action) {
  const res = await fetch("score.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `action=${action}`,
  });
  const data = await res.json();
  winsEl.innerText = data.wins;
  lossesEl.innerText = data.losses;
}

resetBtn.addEventListener("click", async () => {
  await addScore("reset");
});

// Show hint
showHintBtn.addEventListener("click", () => {
  hintEl.innerText = selectedHint;
  hintContainer.style.display = "block";
});
