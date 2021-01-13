'use strict';
const bgm = new Audio('sound/bg.mp3');
const carrotBgm = new Audio('sound/carrot_pull.mp3');
const wonBgm = new Audio('sound/game_win.mp3');
const lostBgm = new Audio('sound/alert.wav');

const ground = document.querySelector('.ground');
function creatCarrot() {
  let carrot = document.createElement('img');
  carrot.setAttribute('src', 'img/carrot.png');
  carrot.setAttribute('alt', 'carrot');
  carrot.setAttribute('class', 'carrot');
  carrot.setAttribute('draggable', 'false');
  ground.appendChild(carrot);
}
function creatBug() {
  let bug = document.createElement('img');
  bug.setAttribute('src', 'img/bug.png');
  bug.setAttribute('alt', 'bug');
  bug.setAttribute('class', 'bug');
  bug.setAttribute('draggable', 'false');
  ground.appendChild(bug);
}

function randomIntGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPositionItems(a) {
  let randomX = randomIntGenerator(0, 800);
  let randomY = randomIntGenerator(0, 180);
  a.style.transform = `translate(${randomX}px,${randomY}px)`;
}

// 플레이 버튼을 누르면,
let time;
let intervID;
let start;
const leftTime = document.querySelector('.timer');
const playBtn = document.querySelector('.play');
const replayBtn = document.querySelector('.replay');
playBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', startGame);

function startGame() {
  // 초기화
  bgm.play();
  bgm.currentTime = 0;
  start = Date.now();
  clearInterval(intervID);
  playBtn.style.visibility = 'visible';
  leftTime.innerHTML = `00:10`;
  leftTime.style.background = `honeydew`;
  ground.innerHTML = '';
  modal.classList.remove('visible');
  // 당근과 벌레를 생성
  for (let i = 0; i < 10; i++) {
    creatCarrot();
  }
  for (let i = 0; i < 7; i++) {
    creatBug();
  }
  // 각각의 아이템에 생성된 난수를 적용
  let carrots = document.querySelectorAll('.carrot');
  let bugs = document.querySelectorAll('.bug');
  carrots.forEach(e => randomPositionItems(e));
  bugs.forEach(e => randomPositionItems(e));
  carrotNum.innerHTML = `${carrots.length}`;

  time = 9;
  setupTimer();
}

// Timer
function setupTimer() {
  intervID = setInterval(() => {
    leftTime.innerHTML = `00:0${time}`;
    time--;
    if (time < 3) {
      leftTime.style.background = `red`;
    }
    if (time < 0) {
      bgm.pause();
      lostBgm.play();
      let msg = `💩 YOU LOST 💩`;
      showModal(msg);
    }
  }, 1000);
}

// 당근의 개수 표시 & 클릭 이벤트
const carrotNum = document.querySelector('.count_carrot');
const recordArr = [];
ground.addEventListener('click', e => {
  const carrots = document.querySelectorAll('.carrot');
  if (e.target.className === 'carrot') {
    carrotBgm.play();
    carrotBgm.currentTime = 0;
    e.target.remove();
    carrotNum.innerHTML = `${carrots.length - 1}`;
    if (carrots.length - 1 < 1) {
      let end = Date.now();
      let elapsedTime = end - start;
      const myRecord = document.querySelector('.my_record');
      myRecord.innerHTML = `${elapsedTime / 1000} 초`;

      recordArr.push(elapsedTime / 1000);
      const bestRecordTime = Math.min.apply(null, recordArr);
      const bestRecord = document.querySelector('.best_record');
      bestRecord.innerHTML = `${bestRecordTime} 초`;

      bgm.pause();
      wonBgm.play();
      let msg = `🏆 YOU WON 🏆`;
      showModal(msg);
    }
  } else if (e.target.className === 'bug') {
    bgm.pause();
    lostBgm.play();
    let msg = `💩 YOU LOST 💩`;
    showModal(msg);
  }
});

// modal
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal_text');
function showModal(msg) {
  clearInterval(intervID);
  playBtn.style.visibility = 'hidden';
  modal.classList.add('visible');
  modalText.innerHTML = msg;
}
