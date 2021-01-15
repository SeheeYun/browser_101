'use strict';
const mainBgm = new Audio('sound/bg.mp3');
const carrotBgm = new Audio('sound/carrot_pull.mp3');
const wonBgm = new Audio('sound/game_win.mp3');
const lostBgm = new Audio('sound/alert.wav');

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

let intervID;
let start;
let score;
const leftTime = document.querySelector('.timer');
const ground = document.querySelector('.ground');
const playBtn = document.querySelector('.play');
const replayBtn = document.querySelector('.replay');
const carrotNum = document.querySelector('.count_carrot');
const recordArr = [];
playBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', startGame);

function startGame() {
  // 초기화
  playBgm(mainBgm);
  clearInterval(intervID);
  start = Date.now();
  score = 0;
  ground.innerHTML = '';
  leftTime.innerHTML = '00:10';
  leftTime.style.background = 'white';
  playBtn.style.visibility = 'visible';
  modal.classList.remove('visible');

  // 당근과 벌레를 생성
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

ground.addEventListener('click', e => {
  if (e.target.className === 'carrot') {
    playBgm(carrotBgm);
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

// modal
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal_text');
function showModal(msg) {
  playBtn.style.visibility = 'hidden';
  modal.classList.add('visible');
  modalText.innerHTML = msg;
}

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
    ground.appendChild(item);
  }
}

function randomIntGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playBgm(bgm) {
  bgm.play();
  bgm.currentTime = 0;
}

function finishGame(win) {
  clearInterval(intervID);
  mainBgm.pause();
  if (win) {
    playBgm(wonBgm);
  } else {
    playBgm(lostBgm);
  }
  showModal(win ? '🏆 YOU WON 🏆' : '💩 YOU LOST 💩');
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
