'use strict';

// Select elements
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

// Initial state
let scores, currentScore, activePlayer, playing;

const init = function () {
  score1.innerHTML = 0;
  score2.innerHTML = 0;
  current1.innerHTML = 0;
  current2.innerHTML = 0;

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  diceImg.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).innerHTML = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // 1. enerating a random dice roll
    const randomNum = Math.ceil(Math.random() * 6);

    // 2. Display dice
    diceImg.classList.remove('hidden');
    diceImg.setAttribute('src', `dice-${randomNum}.png`);

    // 3. Check for rolled 1: if true, switch to next player
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(
        `current--${activePlayer}`
      ).innerHTML = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to activ player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerHTML =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
