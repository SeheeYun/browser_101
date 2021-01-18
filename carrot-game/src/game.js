import Record from './record.js';
import { Field, ItemType } from './filed.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
});

// Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.intervID;
    this.score;
    this.leftTime = document.querySelector('.timer');
    this.carrotNum = document.querySelector('.count_carrot');
    this.playBtn = document.querySelector('.play');
    this.playBtn.addEventListener('click', this.start);

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
    this.onGameFinish && this.onGameFinish(win ? Reason.win : Reason.lose);
  }

  onItemClick = item => {
    if (item === ItemType.carrot) {
      this.score++;
      this.carrotNum.innerHTML = `${this.carrotCount - this.score}`;
      if (this.score === this.carrotCount) {
        this.record.elapsedTime();
        this.finish(true);
      }
    } else if (item === ItemType.bug) {
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
