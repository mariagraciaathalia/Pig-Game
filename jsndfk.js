"use strict";

// Scoring
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

// Buttons
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

// Dice
const dice = document.querySelector(".dice");

let activePlayer, currentScore, playing;

const reset = function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};

let switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

rollDice.addEventListener("click", function () {
  if (playing) {
    // Generate Number and Dice
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    dice.src = `dice-${randomNumber}.png`;
    dice.classList.remove("hidden");

    if (randomNumber === 1) {
      // Display Current Score
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      // switch player
      switchPlayer();
    } else {
      // Display Current Score
      document.querySelector(`#current--${activePlayer}`).textContent =
        parseInt(
          document.querySelector(`#current--${activePlayer}`).textContent
        ) + randomNumber;
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    document.querySelector(`#score--${activePlayer}`).textContent =
      parseInt(document.querySelector(`#score--${activePlayer}`).textContent) +
      parseInt(document.querySelector(`#current--${activePlayer}`).textContent);

    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    currentScore = document.querySelector(
      `#score--${activePlayer}`
    ).textContent;

    if (currentScore >= 20) {
      // display winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      dice.classList.add("hidden");
      playing = false;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", function () {
  reset();
});

reset();
