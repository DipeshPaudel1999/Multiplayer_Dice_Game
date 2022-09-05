'use strict';
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
// const score = document.querySelector('.current-score');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const playerEL0 = document.querySelector('.player--0');
const playerEL1 = document.querySelector('.player--1');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');

let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceImg.classList.add('hidden');
  playerEL0.classList.remove('player--winner');
  playerEL1.classList.remove('player--winner');
  playerEL0.classList.add('player--active');
  playerEL1.classList.remove('player--active');
  diceImg.classList.add('hidden');
  diceImg.classList.add('hidden');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEL0.classList.toggle('player--active');
  playerEL1.classList.toggle('player--active');
};

buttonRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 66) {
      document.getElementById(`name--${activePlayer}`).textContent = 'YOU WIN!';
      document.getElementById(`name--${activePlayer}`).style.color = 'yellow';
      playing = false;
      diceImg.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
