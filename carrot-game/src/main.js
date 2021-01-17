'use strict';
import Modal from './modal.js';
import * as sound from './sound.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

let intervID;
let start;
let score;
const leftTime = document.querySelector('.timer');
const field = document.querySelector('.field');
const playBtn = document.querySelector('.play');
const carrotNum = document.querySelector('.count_carrot');
const recordArr = [];
playBtn.addEventListener('click', startGame);
const gameFinishBanner = new Modal();
gameFinishBanner.setClickListener(() => {
  startGame();
});

function startGame() {
  // 초기화
  sound.playMain();
  clearInterval(intervID);
  start = Date.now();
  score = 0;
  field.innerHTML = '';
  leftTime.innerHTML = '00:10';
  leftTime.style.background = 'white';

  addItems('carrot', CARROT_COUNT, 'img/carrot.png');
  addItems('bug', BUG_COUNT, 'img/bug.png');
  carrotNum.innerHTML = CARROT_COUNT;
  setupTimer();
}

function setupTimer() {
  let remaingTime = GAME_DURATION_SEC;
  intervID = setInterval(() => {
    leftTime.innerHTML = `00:0${--remaingTime}`;
    if (remaingTime <= 0) {
      finishGame(false);
      return;
    }
    if (remaingTime < 3) {
      leftTime.style.background = `red`;
    }
  }, 1000);
}

field.addEventListener('click', e => {
  if (e.target.className === 'carrot') {
    sound.playCarrot();
    e.target.remove();
    score++;
    carrotNum.innerHTML = `${CARROT_COUNT - score}`;
    if (score === CARROT_COUNT) {
      elapsedTime();
      finishGame(true);
    }
  } else if (e.target.className === 'bug') {
    finishGame(false);
  }
});

function addItems(className, count, imgPath) {
  for (let i = 0; i < count; i++) {
    let randomX = randomIntGenerator(0, 800);
    let randomY = randomIntGenerator(0, 180);
    const item = document.createElement('img');
    item.setAttribute('src', imgPath);
    item.setAttribute('alt', className);
    item.setAttribute('class', className);
    item.setAttribute('draggable', 'false');
    item.style.transform = `translate(${randomX}px,${randomY}px)`;
    field.appendChild(item);
  }
}

function randomIntGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function finishGame(win) {
  clearInterval(intervID);
  sound.pauseMain();
  if (win) {
    sound.playWon();
  } else {
    sound.playLost();
  }
  gameFinishBanner.show(win ? '🏆 YOU WON 🏆' : '💩 YOU LOST 💩');
}

function elapsedTime() {
  const myRecord = document.querySelector('.my_record');
  const bestRecord = document.querySelector('.best_record');
  let end = Date.now();
  let elapsedTime = end - start;
  myRecord.innerHTML = `${elapsedTime / 1000} 초`;
  recordArr.push(elapsedTime / 1000);
  const bestRecordTime = Math.min.apply(null, recordArr);
  bestRecord.innerHTML = `${bestRecordTime} 초`;
}
