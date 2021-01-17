import Record from './record.js';
import Field from './filed.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.intervID;
    this.score;
    this.leftTime = document.querySelector('.timer');
    this.playBtn = document.querySelector('.play');

    this.playBtn.addEventListener('click', this.start);

    this.carrotNum = document.querySelector('.count_carrot');

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.record = new Record();
  }

  start = () => {
    // 초기화
    sound.playMain();
    clearInterval(this.intervID);
    this.record.start = Date.now();
    this.score = 0;
    this.leftTime.innerHTML = '00:10';
    this.leftTime.style.background = 'white';
    this.carrotNum.innerHTML = this.carrotCount;
    this.gameField.init();
    this.setupTimer();
  };

  setGamefinishListener(onGameFinish) {
    this.onGameFinish = onGameFinish;
  }

  finish(win) {
    clearInterval(this.intervID);
    sound.pauseMain();
    if (win) {
      sound.playWon();
    } else {
      sound.playLost();
    }
    this.onGameFinish && this.onGameFinish(win ? 'win' : 'lose');
    // .show(win ? '🏆 YOU WON 🏆' : '💩 YOU LOST 💩');
  }

  onItemClick = item => {
    if (item === 'carrot') {
      this.score++;
      this.carrotNum.innerHTML = `${this.carrotCount - this.score}`;
      if (this.score === this.carrotCount) {
        this.record.elapsedTime();
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.finish(false);
    }
  };

  setupTimer() {
    let remaingTime = this.gameDuration;
    this.intervID = setInterval(() => {
      this.leftTime.innerHTML = `00:0${--remaingTime}`;
      if (remaingTime <= 0) {
        this.finish(false);
        return;
      }
      if (remaingTime <= 3) {
        this.leftTime.style.background = `red`;
      }
    }, 1000);
  }
}
