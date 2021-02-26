'use strict';

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

diceImg.classList.add('hidden');

score1.innerHTML = 0;
score2.innerHTML = 0;

current1.innerHTML = 0;
current2.innerHTML = 0;

let totalPlayer1 = 0;
let totalPlayer2 = 0;
let currentScore1 = 0;
let currentScore2 = 0;

const scores = [0, 0];
let activePlayer = 0;

rollDiceBtn.addEventListener('click', function () {
  // 1. enerating a random dice roll
  const randomNum = Math.ceil(Math.random() * 6);
  console.log(randomNum);
  // 2. Display dice
  diceImg.classList.remove('hidden');
  diceImg.setAttribute('src', `dice-${randomNum}.png`);
  // 3. Check for rolled 1: if true, switch to next player
  if (randomNum !== 1) {
    currentScore1 += randomNum;
    document.getElementById(
      `current--${activePlayer}`
    ).innerHTML = currentScore1;
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    current1.innerHTML = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
  }
});

holdBtn.addEventListener('click', function () {
  if (totalPlayer1 >= 100 || totalPlayer2 >= 100) {
    diceImg.classList.add('hidden');
  } else {
    totalPlayer1 += currentScore1;
    score1.innerHTML = totalPlayer1;
    current1.innerHTML = 0;
  }
});
